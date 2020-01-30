import React, { Component } from "react";
import { Redirect } from "react-router-dom";
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
import "./Home.css";

const ERROR = {
  PASSWORD_NO_MATCHED: "",
  EMAIL_EXISTED: "An account with this email address already exists"
};

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      isLogin: false,
      email: "",
      password: "",
      confirmedPassword: "",
      error: false
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

    // Check valid address and password

    // Empty email or empty password
    if (email === "" || password === "") {
      return;
    }

    // Check confirmed password
    if (password !== confirmedPassword) {
      return;
    }

    // Send sign up request
    await apis.signup({ email, password }).then(res => {
      const ok = res.data;

      if (ok) {
        // Sign up success
        this.setState({ error: false });
        this.props.auth();
        this.setState({ isLogin: true });
      } else {
        // Sign up failed
        this.setState({ error: true });
      }
    });
  };

  renderLogin = () => {
    if (this.state.isLogin) {
      return <Redirect to="/user" />;
    }
  };

  render() {
    const errorMessage = this.state.error ? (
      <Message error content={ERROR.EMAIL_EXISTED} />
    ) : (
      <Message hidden></Message>
    );
    return (
      <Container>
        {this.renderLogin()}
        <Grid
          textAlign="center"
          style={{ height: "600px" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" id="blue-text" textAlign="center">
              Create an account
            </Header>
            <Form size="large" error>
              <Segment stacked>
                {errorMessage}
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
                  placeholder="Confirm Password"
                  type="password"
                  onSubmit={this.handleSignup}
                  onChange={this.onConfirmChange}
                />

                <Button
                  id="blue-white"
                  fluid
                  size="large"
                  onClick={this.handleSignup}
                >
                  Create
                </Button>
              </Segment>
            </Form>
            <Message>
              Already has an account?{" "}
              <Button id="blue-white" onClick={this.props.toLogin}>
                Log in
              </Button>
            </Message>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

export default Signup;
