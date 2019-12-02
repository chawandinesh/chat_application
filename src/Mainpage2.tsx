import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import _ from "lodash";
import "antd/dist/antd.css";
import "./index.css";
import { Layout, Icon } from "antd";
import Siderbar from "./components2/Sider";
import Headerbar from "./components2/Header";
import Contentbar from "./components2/Content";
// @ts-ignore
import { getChannels } from "mattermost-redux/actions/channels";
//@ts-ignore
import { getPosts } from "mattermost-redux/actions/posts";

interface Iprops {
  users: {};
  handleLogout: () => void;
  getChannels: (teamId: string) => void;
  getPosts: (chId: string) => data;
  currentTeamId: object;
  currentChannelId: object;
}
interface data {
  next_post_id: string;
  order: [];
  posts: {};
  prev_post_id: string;
}

class SiderDemo extends React.Component<Iprops, {}> {
  state = {
    collapsed: false,
    messages: [],
    myData: []
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  componentDidMount() {
    this.channel();
    const firstChannel = _.head(_.keys(_.get(this.props, "currentChannelId")));
    if (firstChannel) {
      this.handlePosts(firstChannel); //to make the default appear of specific channel when user logged in
    } else {
      console.error("You dont have channel id");
    }
  }

  channel = async () => {
    try {
      //@ts-ignore
      await this.props.getChannels(Object.keys(this.props.currentTeamId)[0]); //passing teamId as argument to getChannels so that we can get all channels in state.entities
    } catch (e) {
      console.log(e);
    }
  };

  handlePosts = async (channelId: string) => {
    const getPostData: data = await this.props.getPosts(channelId); //getPosts from redux store

    let messages: any[] = [];

    const order = _.get(getPostData, ["data", "order"], []);
    _.map(order, (
      e //mannually creating object and storing required data from redux store
    ) =>
      messages.push({
        channelId: _.get(getPostData, ["data", "posts", e, "channel_id"], ""),
        message: _.get(getPostData, ["data", "posts", e, "message"], ""),
        userName: _.get(
          getPostData,
          ["data", "posts", e, "props", "username"],
          ""
        ),
        userId: _.get(getPostData, ["data", "posts", e, "user_id"], ""),
        time: new Date(
          _.get(getPostData, ["data", "posts", e, "create_at"])
        ).toLocaleString()
      })
    );

    this.setState({
      myData: messages
    });
  };

  render() {
    //console.log(Object.keys(this.props.channelId)[2]);
    //console.log("users:");
    //console.log(this.props.teamId);
    return (
      <Layout>
        <Siderbar
          collapsed={this.state.collapsed}
          allChannelIds={Object.keys(this.props.users)} //channelkeys from redux store
          allChannelData={this.props.users} //all channel data from redux store
          getPostData={this.handlePosts} //calling a function to get a particular clicked channelkey
        />
        <Layout>
          <Headerbar
            collapsed={this.state.collapsed} //collapsed icon on header
            toggle={this.toggle}
            handleLogout={this.props.handleLogout} //taking action from header and processing in login.tsx file
          />
          {this.state.myData.length > 0 ? (
            <Contentbar
              Data={this.state.myData}
              getPostData={this.handlePosts} //sending manually created data to content page
            />
          ) : (
            <div>
              <Icon
                type="loading"
                style={{
                  fontSize: "200px",
                  color: "blue",
                  marginLeft: "400px",
                  marginTop: "100px"
                }}
              />
              <h1
                style={{
                  color: "blue",
                  fontWeight: "bold",
                  fontSize: "30px",
                  paddingLeft: "250px"
                }}
              >
                you are not a member of this channel
              </h1>
            </div>
          )}
        </Layout>
      </Layout>
    );
  }
}
const mapStateToProps = (state: any) => {
  //console.log(state.entities)
  return {
    users: _.get(state, ["entities", "channels", "channels"], []),
    currentTeamId: _.get(state, ["entities", "teams", "teams"]),
    currentChannelId: _.get(state, ["entities", "channels", "channels"]) //storing channels data from redux store
  };
};

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      getChannels, //actions from redux store
      getPosts
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SiderDemo);
