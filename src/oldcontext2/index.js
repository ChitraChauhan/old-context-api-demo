import React, { Component } from "react";
import { render } from "react-dom";
import PropTypes from "prop-types";

class Button extends Component {
  render() {
    return (
      <button style={{ background: this.context.color }}>
        {this.props.children}
      </button>
    );
  }
}

Button.contextTypes = {
  color: PropTypes.string
};

class Message extends Component {
  render() {
    console.log("this.props", this.props);
    return (
      <li onClick={this.props.onDelete}>
        {this.props.message.text} <Button>Delete</Button>
      </li>
    );
  }
}

export default class MessageList extends Component {
  static childContextTypes = {
    color: PropTypes.object,
    messages: PropTypes.object
  };
  state = {
    color: "purple",
    messages: [{ id: 1, text: "hello!!" }, { id: 2, text: "hiee!!" }]
  };
  getChildContext() {
    return { color: this.state.color, messages: this.state.messages };
  }
  onDelete(id) {
    const { messages } = this.state;
    console.log("id", id);
    let index = messages.findIndex(messages => messages.id === id);
    messages.splice(index, 1);
    this.setState({ messages });
  }
  render() {
    const children = this.state.messages.map((message, index) => (
      <Message
        key={index}
        message={message}
        onDelete={() => this.onDelete(index)}
      />
    ));
    return <div>{children}</div>;
  }
}

MessageList.childContextTypes = {
  color: PropTypes.string,
  messages: PropTypes.array
};
render(<MessageList />, document.getElementById("root"));
