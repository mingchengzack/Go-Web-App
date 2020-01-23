import React, { Component } from "react";
import {
  Button,
  Container,
  Form,
  Grid,
  Header,
  Message,
  Segment
} from "semantic-ui-react";

const error = {
  PASSWORD_NO_MATCHED: "hey"
};

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      confirmedPassword: ""
    };
  }

  onEmailChange = event => {
    this.setState({
      email: event.target.value
    });
  };

  onPasswordChange = event => {
    this.setState({
      password: event.target.value
    });
  };

  onConfirmChange = event => {
    this.setState({
      confirmedPassword: event.target.value
    });
  };

  handleLogin = () => {
    const { email, password } = this.state;
  };

  render() {
    return (
      <Container>
        <Grid
          textAlign="center"
          style={{ height: "600px" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="teal" textAlign="center">
              Create an account
            </Header>
            <Form size="large">
              <Segment stacked>
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="E-mail address"
                  onSubmit={this.handleLogin}
                  onChange={this.onEmailChange}
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                  onSubmit={this.handleLogin}
                  onChange={this.onPasswordChange}
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Confirm your password"
                  type="password"
                  onSubmit={this.handleLogin}
                  onChange={this.onConfirmChange}
                />

                <Button
                  color="teal"
                  fluid
                  size="large"
                  onClick={this.handleLogin}
                >
                  Create
                </Button>
              </Segment>
            </Form>
            <Message>Preferably use your school email to sign up</Message>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

export default Signup;
