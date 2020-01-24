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
import apis from "../api/api";

const ERROR = {
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

  handleSignup = async () => {
    const { email, password, confirmedPassword } = this.state;

    // Check confirmed password

    // Send sign up request
    await apis.signup({ email, password }).then(res => {
      console.log(res);
    });
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
                  placeholder="Email address"
                  onSubmit={this.handleSignup}
                  onChange={this.onEmailChange}
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                  onSubmit={this.handleSignup}
                  onChange={this.onPasswordChange}
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Confirm your password"
                  type="password"
                  onSubmit={this.handleSignup}
                  onChange={this.onConfirmChange}
                />

                <Button
                  color="teal"
                  fluid
                  size="large"
                  onClick={this.handleSignup}
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
