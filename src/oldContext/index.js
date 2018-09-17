import React from "react";
import { render } from "react-dom";
import PropTypes from "prop-types";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

const Dashboard = () => (
  <div>
    <h3>Yo! This is the dashboard</h3>
    <Nav />
  </div>
);

const Nav = ({ }, { authUser }) => (
  <div>
    <p>
      Your username is <strong>{authUser.username}</strong>
    </p>
  </div>
);

Nav.contextTypes = {
  authUser: PropTypes.object
};

class App extends React.Component {
  static childContextTypes = {
    authUser: PropTypes.object
  };
  state = {
    authUser: {
      username: "codebeast"
    }
  };
  getChildContext() {
    return { authUser: this.state.authUser };
  }
  render() {
    return (
      <div style={styles}>
        <Dashboard />
      </div>
    );
  }
}
App.childContextTypes = {
    authUser: PropTypes.object
}
render(<App />, document.getElementById("root"));
