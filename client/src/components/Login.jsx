import React from "react";
import {
  Button,
  Container,
  Form,
  Grid,
  Header,
  Message,
  Segment
} from "semantic-ui-react";

const LoginForm = () => (
  <Container>
    <Grid textAlign="center" style={{ height: "600px" }} verticalAlign="middle">
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
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
            />

            <Button color="teal" fluid size="large">
              Login
            </Button>
          </Segment>
        </Form>
        <Message>
          New to us? <Button color="teal">Sign Up</Button>
        </Message>
      </Grid.Column>
    </Grid>
  </Container>
);

export default LoginForm;
