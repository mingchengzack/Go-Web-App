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

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
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
              Log-in to your account
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

                <Button
                  color="teal"
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
              <Button color="teal" onClick={this.props.toSignup}>
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
