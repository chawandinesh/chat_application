import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Input } from "antd";
// @ts-ignore
import { login } from "mattermost-redux/actions/users";
//import { userInfo } from "os";

interface LoginProps {
  login: (username: string, password: string) => any;
  users: any;
  handleLogin: () => void;
}

class Login extends Component<LoginProps, {}> {
  state = {
    username: "chawan_dinesh",
    password: "chavan13210"
  };

  handleOnUsername = (e: any) => {
    this.setState({
      username: e.target.value
    });
  };

  handleOnPassword = (e: any) => {
    this.setState({
      password: e.target.value
    });
  };

  login = async () => {
    const user = await this.props.login(
      this.state.username,
      this.state.password
    );
    user.data ? this.props.handleLogin() : alert("failed");
    //console.log("after login ", user);
  };

  render() {
    console.log("loginPage")
    return (
      <div style={{ width: 400, marginTop: 100, marginLeft: 500  }}>
        <Input placeholder="username" onChange={this.handleOnUsername} />
        <Input.Password
          placeholder="input password"
          onChange={this.handleOnPassword}
        />

        <button
          onClick={this.login}
          style={{ backgroundColor: "blue", color: "white" }}
        >
         
          Login
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  console.log("State: ", state);
  return {
    users: state.entities.users
  };
};

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      login
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
