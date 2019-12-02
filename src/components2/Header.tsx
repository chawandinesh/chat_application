import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "antd";
import _ from "lodash";
// @ts-ignore
import { logout } from "mattermost-redux/actions/users";
import "antd/dist/antd.css";
import "../index.css";
import { Layout, Icon } from "antd";

const { Header } = Layout;

interface Iprops {
  users: {};
  collapsed: boolean;
  toggle: () => void;
  logout: () => any;
  handleLogout: () => void;
  currentName:  string;
  currentId: string;
}
class Headerbar extends Component<Iprops, {}> {
  logout = async () => {
    if (typeof this.props.logout === "function") {
      const logoutData = await this.props.logout();
      logoutData.data ? this.props.handleLogout() : alert("error in logout...");
    }
  };

  render() {
    // console.log("my users",this.props.users);
    return (
      <Header style={{ background: "black", padding: 0 }}>
        <Icon
          style={{ color: "white", fontSize: 20 }}
          className="trigger"
          type={this.props.collapsed ? "menu-unfold" : "menu-fold"}
          onClick={this.props.toggle}
        />
        <span
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: "skyblue",
            paddingLeft: 20
          }}
        >
          314e@ WELCOME__{" "}
          {_.get(this.props, ["currentName", this.props.currentId,"username"],[])}
          {/* {this.props.currentName[this.props.currentId].username} */}
          <Button
            type="primary"
            onClick={this.logout}
            style={{ marginLeft: 670 ,backgroundColor:"orange",color:"black"}}
          >
            Logout
          </Button>
        </span>
      </Header>
    );
  }
}
const mapStateToProps = (state: any) => {
  return {
    users: state.entities,
    currentId: state.entities.users.currentUserId,
    currentName: state.entities.users.profiles
  };
};

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      logout
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Headerbar);
