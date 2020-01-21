import React, { Component } from "react";
import apis from "../api/api";
import { Card, Header, Form, Input, Icon, Button } from "semantic-ui-react";

class ToDoList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      task: "",
      items: []
    };
  }

  componentDidMount() {
    this.getAllTasks();
  }

  onChange = event => {
    this.setState({
      task: event.target.value
    });
  };

  onSubmit = async () => {
    let { task } = this.state;
    if (task) {
      await apis.createTask({ task }).then(res => {
        this.getAllTasks();
        this.setState({
          task: ""
        });
      });
    }
  };

  getAllTasks = async () => {
    await apis.getAllTasks().then(res => {
      if (res.data) {
        this.setState({
          items: res.data
        });
      } else {
        this.setState({
          items: []
        });
      }
    });
  };

  updateTask = async (id, status) => {
    await apis.updateTask(id, status).then(_ => {
      this.getAllTasks();
    });
  };

  deleteTask = async id => {
    await apis.deleteTask(id).then(_ => {
      this.getAllTasks();
    });
  };

  renderItems() {
    let { items } = this.state;
    return items.map(item => {
      const color = item.status ? "green" : "yellow";
      return (
        <Card key={item._id} color={color} fluid>
          <Card.Content>
            <Card.Header textAlign="left">
              <div style={{ wordWrap: "break-word" }}>{item.task}</div>
            </Card.Header>

            <Card.Meta textAlign="right">
              <Icon
                color="green"
                name="check circle"
                onClick={() => this.updateTask(item._id, { status: true })}
              />
              <span style={{ paddingRight: 10 }}>Done</span>
              <Icon
                name="undo"
                color="yellow"
                onClick={() => this.updateTask(item._id, { status: false })}
              />
              <span style={{ paddingRight: 10 }}>Undo</span>
              <Icon
                color="red"
                name="delete"
                onClick={() => this.deleteTask(item._id)}
              />
              <span style={{ paddingRight: 10 }}>Delete</span>
            </Card.Meta>
          </Card.Content>
        </Card>
      );
    });
  }

  render() {
    return (
      <div>
        <div className="row">
          <Header className="header" as="h2">
            TO DO LIST
          </Header>
        </div>
        <div className="row">
          <Form onSubmit={this.onSubmit}>
            <Input
              type="text"
              name="task"
              onChange={this.onChange}
              value={this.state.task}
              fluid
              placeholder="Create Task"
            />
            <Button>Create Task</Button>
          </Form>
        </div>
        <div className="row">
          <Card.Group>{this.renderItems()}</Card.Group>
        </div>
      </div>
    );
  }
}

export default ToDoList;
