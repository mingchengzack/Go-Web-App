import React, { Component } from "react";
import axios from "axios";
import apis from "../api/api";
import { Card, Header, Form, Input, Icon, Button } from "semantic-ui-react";

const endpoint = "http://localhost:8080";

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

  onSubmit = () => {
    let { task } = this.state;
    if (task) {
      apis.createTask({ task }).then(res => {
        this.getAllTasks();
        this.setState({
          task: ""
        });
      });
    }
  };

  getAllTasks = () => {
    apis.getAllTasks().then(res => {
      if (res.data) {
        this.setState({
          items: res.data.map(item => {
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
                      onClick={() =>
                        this.updateTask(item._id, { status: true })
                      }
                    />
                    <span style={{ paddingRight: 10 }}>Done</span>
                    <Icon
                      name="undo"
                      color="yellow"
                      onClick={() =>
                        this.updateTask(item._id, { status: false })
                      }
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
          })
        });
      } else {
        this.setState({
          items: []
        });
      }
    });
  };

  updateTask = (id, status) => {
    apis.updateTask(id, status).then(res => {
      this.getAllTasks();
    });
  };

  deleteTask = id => {
    apis.deleteTask(id).then(res => {
      this.getAllTasks();
    });
  };

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
          <Card.Group>{this.state.items}</Card.Group>
        </div>
      </div>
    );
  }
}

export default ToDoList;
