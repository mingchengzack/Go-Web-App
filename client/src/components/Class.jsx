import React, { Component } from "react";

class Class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      location: props.location,
      instructor: props.instructor,
      startTime: props.startTime,
      endTime: props.startTime
    };
  }

  render() {
    return;
  }
}

export default Class;
