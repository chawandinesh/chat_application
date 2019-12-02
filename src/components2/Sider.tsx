import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import _ from "lodash";
import "antd/dist/antd.css";
import "../index.css";
//@ts-ignore
import { getPosts } from "mattermost-redux/actions/posts";
import { Layout, Menu, Icon } from "antd";

const { Sider } = Layout;

interface Iprops {
  collapsed: boolean;
  allChannelData: { [s: string]: string };
  allChannelIds: string[];
  handlePosts?: (item: string) => void;
  getPosts: (id: string) => string;
  getPostData: (id: string) => any;
}

class Siderbar extends Component<Iprops, {}> {
  state = {
    myData: []
  };

  getPost = (chId: string) => {
    this.props.getPostData(chId); //sending channel id to the mainPage
  };

  render() {
    return (
      <Sider trigger={null} collapsible collapsed={this.props.collapsed} style={{minHeight: 200,height: "99.5vh",overflow:'auto',scrollBehavior:"auto"}}>
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["0"]}>
          <Menu.Item style={{ backgroundColor: "black", marginTop: 15 }}>
            <Icon type="code" style={{ fontSize: 20, color: "skyblue" }} />
            <span
              style={{
                color: "skyblue",
                fontFamily: "cursive",
                fontWeight: "bold",
                fontSize: 25
              }}
            >
              Chat_App
            </span>
          </Menu.Item>

          {_.map(this.props.allChannelIds, (
            channelId,
            ind //array of all channelId's are iterating
          ) => (
            <Menu.Item
              key={ind}
              onClick={() => this.getPost(channelId)}
              style={{ marginTop: 8 }}
            >
              <Icon type="user" style={{ fontSize: 20, color: "white" }} />
              <span style={{ color: "white", fontWeight: "bold" }}>
                {_.get(
                  this.props.allChannelData,
                  [channelId, "display_name"],
                  []
                )}
              </span>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    users: state.entities
  };
};

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      getPosts
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Siderbar);
