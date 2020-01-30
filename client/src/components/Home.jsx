import PropTypes from "prop-types";
import React, { Component } from "react";
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  List,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility
} from "semantic-ui-react";
import Login from "./Login";
import Signup from "./Signup";

import "./Home.css";

// Get width for window user or mobile user
const getWidth = () => {
  const isSSR = typeof window === "undefined";

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};

/* Active section
 */
const ActiveSection = props => {
  const { section, toLogin, toSignup, auth } = props;
  return section === "home" ? (
    <HomepageInfo toLogin={toLogin} />
  ) : section === "login" ? (
    <Login toSignup={toSignup} auth={auth} />
  ) : section === "signup" ? (
    <Signup toLogin={toLogin} auth={auth} />
  ) : (
    <HomepageInfo toLogin={toLogin} />
  );
};

ActiveSection.propTypes = {
  section: PropTypes.string,
  toLogin: PropTypes.func,
  toSignup: PropTypes.func
};

/* Homepage heading
 */
const HomepageInfo = props => {
  const { mobile, toLogin } = props;
  return (
    <Container text>
      <Header
        as="h1"
        content="Welcome to TritonLife!"
        inverted
        style={{
          fontSize: mobile ? "2em" : "4em",
          fontWeight: "normal",
          marginBottom: 0,
          marginTop: mobile ? "1.5em" : "3em"
        }}
      />
      <Header
        as="h2"
        content="Do whatever you want when you want to."
        inverted
        style={{
          fontSize: mobile ? "1.5em" : "1.7em",
          fontWeight: "normal",
          marginTop: mobile ? "0.5em" : "1.5em"
        }}
      />
      <Button primary size="huge" onClick={toLogin} id="blue-white">
        Get Started
        <Icon name="right arrow" />
      </Button>
    </Container>
  );
};

HomepageInfo.propTypes = {
  mobile: PropTypes.bool,
  toLogin: PropTypes.func
};

/* Nav menu for desktop
 */
class DesktopNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSection: "home"
    };
  }

  handleMenuItemClick = (e, { name }) => this.setState({ activeSection: name });

  render() {
    const { children, auth } = this.props;
    const { activeSection } = this.state;

    return (
      <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
        <Visibility once={false}>
          <Segment
            inverted
            textAlign="center"
            style={{ minHeight: 550, padding: "1em 0em" }}
            vertical
            id="nav"
          >
            <Menu
              id="menu"
              fixed={"top"}
              inverted
              pointing
              secondary
              size="huge"
            >
              <Menu.Item as="h2" header>
                TritonLife
              </Menu.Item>
              <Container>
                <Menu.Item
                  as="a"
                  name="home"
                  active={activeSection === "home"}
                  onClick={this.handleMenuItemClick}
                >
                  Home
                </Menu.Item>
                <Menu.Item
                  as="a"
                  name="features"
                  active={activeSection === "features"}
                  onClick={this.handleMenuItemClick}
                >
                  Features
                </Menu.Item>
                <Menu.Item position="right">
                  <Button
                    as="a"
                    name="login"
                    inverted
                    id="btn"
                    onClick={this.handleMenuItemClick}
                  >
                    Log in
                  </Button>
                  <Button
                    as="a"
                    name="signup"
                    inverted
                    id="btn"
                    onClick={this.handleMenuItemClick}
                  >
                    Sign Up
                  </Button>
                </Menu.Item>
              </Container>
            </Menu>
            <ActiveSection
              section={activeSection}
              toLogin={e => this.handleMenuItemClick(e, { name: "login" })}
              toSignup={e => this.handleMenuItemClick(e, { name: "signup" })}
              auth={auth}
            />
          </Segment>
        </Visibility>
        {children}
      </Responsive>
    );
  }
}

DesktopNav.propTypes = {
  children: PropTypes.node
};

/* Nav menu for mobile
 */
class MobileNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarOpened: false
    };
  }

  handleSidebarHide = () => this.setState({ sidebarOpened: false });

  handleToggle = () => this.setState({ sidebarOpened: true });

  render() {
    const { children } = this.props;
    const { sidebarOpened } = this.state;

    return (
      <Responsive
        as={Sidebar.Pushable}
        getWidth={getWidth}
        maxWidth={Responsive.onlyMobile.maxWidth}
      >
        <Sidebar
          as={Menu}
          animation="push"
          inverted
          onHide={this.handleSidebarHide}
          vertical
          visible={sidebarOpened}
        >
          <Menu.Item as="a" active>
            Home
          </Menu.Item>
          <Menu.Item as="a">Features</Menu.Item>
        </Sidebar>

        <Sidebar.Pusher dimmed={sidebarOpened}>
          <Segment
            inverted
            textAlign="center"
            style={{ minHeight: 350, padding: "1em 0em" }}
            vertical
          >
            <Container>
              <Menu inverted pointing secondary size="large">
                <Menu.Item onClick={this.handleToggle}>
                  <Icon name="sidebar" />
                </Menu.Item>
                <Menu.Item position="right">
                  <Button as="a" inverted>
                    Log in
                  </Button>
                  <Button as="a" inverted style={{ marginLeft: "0.5em" }}>
                    Sign Up
                  </Button>
                </Menu.Item>
              </Menu>
            </Container>
            <HomepageInfo mobile />
          </Segment>

          {children}
        </Sidebar.Pusher>
      </Responsive>
    );
  }
}

MobileNav.propTypes = {
  children: PropTypes.node
};

const ResponsiveContainer = props => {
  const { children, auth } = props;
  return (
    <div>
      <DesktopNav auth={auth}>{children}</DesktopNav>
      <MobileNav auth={auth}>{children}</MobileNav>
    </div>
  );
};

ResponsiveContainer.propTypes = {
  children: PropTypes.node
};

const Home = props => {
  const { auth } = props;
  return (
    <ResponsiveContainer auth={auth}>
      <Segment style={{ padding: "8em 0em" }} vertical>
        <Grid container stackable verticalAlign="middle">
          <Grid.Row>
            <Grid.Column width={8}>
              <Header as="h3" style={{ fontSize: "2em" }}>
                We Help Companies and Companions
              </Header>
              <p style={{ fontSize: "1.33em" }}>
                We can give your company superpowers to do things that they
                never thought possible. Let us delight your customers and
                empower your needs... through pure data analytics.
              </p>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column textAlign="center">
              <Button size="huge">Check Them Out</Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>

      <Segment style={{ padding: "0em" }} vertical>
        <Grid celled="internally" columns="equal" stackable>
          <Grid.Row textAlign="center">
            <Grid.Column style={{ paddingBottom: "5em", paddingTop: "5em" }}>
              <Header as="h3" style={{ fontSize: "2em" }}>
                "What a Company"
              </Header>
              <p style={{ fontSize: "1.33em" }}>
                That is what they all say about us
              </p>
            </Grid.Column>
            <Grid.Column style={{ paddingBottom: "5em", paddingTop: "5em" }}>
              <Header as="h3" style={{ fontSize: "2em" }}>
                "I shouldn't have gone with their competitor."
              </Header>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>

      <Segment style={{ padding: "8em 0em" }} vertical>
        <Container text>
          <Header as="h3" style={{ fontSize: "2em" }}>
            Breaking The Grid, Grabs Your Attention
          </Header>
          <p style={{ fontSize: "1.33em" }}>
            Instead of focusing on content creation and hard work, we have
            learned how to master the art of doing nothing by providing massive
            amounts of whitespace and generic content that can seem massive,
            monolithic and worth your attention.
          </p>
          <Button as="a" size="large">
            Read More
          </Button>

          <Divider
            as="h4"
            className="header"
            horizontal
            style={{ margin: "3em 0em", textTransform: "uppercase" }}
          >
            <a href="#">Case Studies</a>
          </Divider>

          <Header as="h3" style={{ fontSize: "2em" }}>
            Did We Tell You About Our Bananas?
          </Header>
          <p style={{ fontSize: "1.33em" }}>
            Yes I know you probably disregarded the earlier boasts as
            non-sequitur filler content, but it's really true. It took years of
            gene splicing and combinatory DNA research, but our bananas can
            really dance.
          </p>
          <Button as="a" size="large">
            I'm Still Quite Interested
          </Button>
        </Container>
      </Segment>

      <Segment inverted vertical style={{ padding: "5em 0em" }}>
        <Container>
          <Grid divided inverted stackable>
            <Grid.Row>
              <Grid.Column width={3}>
                <Header inverted as="h4" content="About" />
                <List link inverted>
                  <List.Item as="a">Sitemap</List.Item>
                </List>
              </Grid.Column>
              <Grid.Column width={3}>
                <Header inverted as="h4" content="Services" />
                <List link inverted>
                  <List.Item as="a">Banana Pre-Order</List.Item>
                </List>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </Segment>
    </ResponsiveContainer>
  );
};

export default Home;
