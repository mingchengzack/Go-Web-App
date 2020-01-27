import React, { Component } from "react";
import PropTypes from "prop-types";
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
import "./Homepage.css";

const ERROR = {
  INCORRECT_PASSWORD: "Incorrect assword",
  EMAIL_NOT_EXISTED: "Email does not exist"
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: ""
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

  handleLogin = async () => {
    const { email, password } = this.state;

    // Check valid address and password

    // Empty email or empty password
    if (email === "" || password === "") {
      return;
    }

    // Send login up request
    await apis.login(email, password).then(res => {
      const error = res.data;
      this.setState({ error });
    });
  };

  render() {
    const errorMessage =
      this.state.error === "email" ? (
        <Message error content={ERROR.EMAIL_NOT_EXISTED} />
      ) : this.state.error === "password" ? (
        <Message error content={ERROR.INCORRECT_PASSWORD} />
      ) : (
        <Message hidden></Message>
      );
    return (
      <Container>
        <Grid
          textAlign="center"
          style={{ height: "600px" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" id="blue-text" textAlign="center">
              Log in to your account
            </Header>
            <Form size="large" error>
              <Segment stacked>
                {errorMessage}
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="Email address"
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

                <Button
                  id="blue-white"
                  fluid
                  size="large"
                  onClick={this.handleLogin}
                >
                  Login
                </Button>
              </Segment>
            </Form>
            <Message>
              New user?{" "}
              <Button id="blue-white" onClick={this.props.toSignup}>
                Sign Up
              </Button>
            </Message>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

Login.propTypes = {
  toSignup: PropTypes.func
};

export default Login;
