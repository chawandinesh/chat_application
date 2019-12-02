import React, { Component } from "react";
import MainPage2 from "./Mainpage2";
import Login from "./login";
import { Provider } from "react-redux";
// @ts-ignore
import configureServiceStore from "mattermost-redux/store";
// @ts-ignore
import { Client4 } from "mattermost-redux/client";
Client4.setUrl("https://communication.hotelsoft.tech");

const offlineOptions = {
  persistOptions: {
    autoRehydrate: {
      log: false
    }
  }
};

const store = configureServiceStore({}, {}, offlineOptions);

class App extends Component {
  state = {
    isLoggedin: false,
    isLoggedout: false
  };
  handleLogin = () => {
    this.setState({
      isLoggedin: true
    });
  };

  handleLogout = () => {
    this.setState({
      isLoggedout: true
    });
  };

  render() {
    return (
      <Provider store={store}>
        {this.state.isLoggedin && !this.state.isLoggedout ? ( //checking the condition of user Action
          <MainPage2 handleLogout={this.handleLogout} /> //go to mainPage if user is loggedIn
        ) : (
          <Login handleLogin={this.handleLogin} /> //go to loginPage if user is logged out
        )}
      </Provider>
    );
  }
}
export default App;
