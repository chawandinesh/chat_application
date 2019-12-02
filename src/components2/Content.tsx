import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Input,  Button, Layout } from "antd";
// @ts-ignore
import { createPost } from "mattermost-redux/actions/posts";
import "antd/dist/antd.css";
import "../index.css";

const { Content } = Layout;

interface Iprops {
  createPost: (object: chid) => data;
  usersId: string;
  Data: data[];
  users: object;
  getPostData: (id: string) => any;
}

interface chid {
  message: string;
  channel_id: string;
  user_id: string;
  // @ts-ignore
  props: { username: string };
}

interface data {
  channelId: string;
  message: string;
  userName: string;
  userId: string;
  time: string;
}

class Contentbar extends Component<Iprops, {}> {
  state = {
    data: this.props.Data,
    text: "",
    errorMessage: "ghfgfh"
  };

  handleChange = (e:any) => {
    this.setState({
      text: e.target.value //action from text input field
    });
  };

  handleCreatePost = async () => {
    this.setState({
      text: "" //after clicking submit it should clear the input text field
    });
    await this.props.createPost({
      //createPost action from redux store
      message: this.state.text, //sending input text data
      channel_id: this.props.Data[0].channelId, //current channelid
      user_id: this.props.usersId, //current user id
      props: {
        username: _.get(
          this.props.users,
          ["profiles", this.props.usersId, "username"],
          []
        ) //current username
      }
    });
    this.props.getPostData(this.props.Data[0].channelId); //it will rerenders the particular channel to appear messages
  };

  render() {
    //console.log("my Is", this.props.getPostData);
    // @ts-ignore
    // if (!_.isEmpty(this.state.errorMessage)) {
    //   return <div> Error </div>
    // }
    // if (_.isEmpty(this.props.Data)) {
    //   return <div> sorry </div>
    // }
    const data = _.get(this.props, ["Data"], []);
    //console.log(this.props.usersId);
    return (
      <Content
        style={{
          margin: "24px 16px",
          padding: 24,
          background: ("241,241,241"),
          minHeight: 280,
          height: "86vh",
          overflow: "auto",
          paddingBottom: 90,
          display: "flex",
          flexDirection: "column-reverse"
        }}
      >
        {data ? ( //if data is present then only go to display message,username
          _.map(data, data => {
            return (
              <div>
                {_.get(
                  this.props,
                  ["users", "profiles", "data", "userId"],
                  "sorry"
                ) ? ( // checking userId is present or not
                  <h2>
                    {_.get(
                      this.props.users,
                      ["profiles", data.userId, "username"],
                      "sorry"
                    )}
                  </h2>
                ) : (
                  <h1>sorry</h1>
                )}
                <div>
                  <div>
                    <span>
                      <p
                        style={{
                          fontSize: 15,
                          fontStyle: "italic",
                          color: "gray",
                          fontWeight: "bold"
                        }}
                      >
                        {data.message}
                      </p>
                      <div style={{ textAlign: "right" }}>
                        <span style={{ color: "blue", fontWeight: "bold" }}>
                          {data.time}
                        </span>
                      </div>
                      <hr />
                    </span>
                  </div>
                </div>

                <div style={{ position: "fixed", bottom: 50 }}>
                  <Input
                    placeholder="Enter text..."
                    style={{ width: 1000 }}
                    onChange={e => this.handleChange(e)}
                    value={this.state.text}
                  />
                  <Button
                    type="primary"
                    onClick={() => this.handleCreatePost()}
                  >
                    Send
                  </Button>
                  {/* <Icon type="right" onClick={() => this.handleCreatePost()}/> */}
                </div>
              </div>
            );
          })
        ) : (
          <h1>Sorry</h1>
        )}
      </Content>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    usersId: state.entities.users.currentUserId,
    users: state.entities.users
  };
};

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      createPost
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Contentbar);
