import React, { Component,PureComponent } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

class MyClock extends Component {
  constructor() {
    super();
    this.state = {
      date: new Date()
    };
    this.dateUpdater = this.dateUpdater.bind(this);
  }

  static childContextTypes = {
    date: PropTypes.object
  };

  getChildContext() {
    return { date: this.state.date };
  }

  dateUpdater() {
    this.setState({ date: new Date() });
  }

  componentDidMount() {
    setInterval(() => this.dateUpdater(), 1000);
  }

  render() {
    const { date } = this.state;
    return (
      <div className="center">
        <DateTimeDisplay date={date} />
      </div>
    );
  }
}

class DateTimeDisplay extends PureComponent {
  static contextTypes = {
    date: PropTypes.object
  };

  render() {
    const { date } = this.context;
    return (
      <div>
        <p>Today: {date.toDateString()}</p>
        <span>{date.toLocaleTimeString()}</span>
      </div>
    );
  }
}

export default class App extends Component {
  render() {
    return (
      <div id="app">
        <MyClock />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
