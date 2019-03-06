import React, { PureComponent } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Fab from "@material-ui/core/Fab";
import EmailIcon from "@material-ui/icons/Email";
import ScrollToTop from "./components/ScrollToTop";
import NoData from "./components/NoData";
import HomeRoute from "./routes/Home";
import PostRoute from "./routes/Post";
import EventRoute from "./routes/Event";
import EventsRoute from "./routes/Events";
import PageRoute from "./routes/Page";
import PhotoAlbumsRoute from "./routes/PhotoAlbums";
import PhotosRoute from "./routes/Photos";
import SearchRoute from "./routes/Search";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Drawer from "./components/Drawer";
import ErrorBoundary from "./components/ErrorBoundary";
import Supporters from "./components/Supporters";
import Container from "./components/Container";
import config from "./config";
import s from "./App.module.scss";

const {
  mail: { email, subject, body }
} = config;

class App extends PureComponent {
  state = { drawerOpen: false };

  toggle = open => {
    this.setState({ drawerOpen: open });
  };

  render() {
    const { drawerOpen } = this.state;
    return (
      <div className={s.container}>
        <Router>
          <ScrollToTop>
            <Drawer toggle={this.toggle} open={drawerOpen} />
            <Header menuClick={this.toggle} menuOpenState={drawerOpen} />
            <ErrorBoundary>
              <div className={s.routeContainer}>
                <Switch>
                  <Route exact path="/" component={HomeRoute} />
                  <Route
                    exact
                    path="/frettir"
                    render={props => <HomeRoute {...props} newsOnly />}
                  />
                  <Route exact path="/frett/:slug/:id" component={PostRoute} />
                  <Route
                    exact
                    path="/myndir/:slug/:id"
                    component={PhotosRoute}
                  />
                  <Route exact path="/myndir" component={PhotoAlbumsRoute} />
                  <Route exact path="/vidburdir" component={EventsRoute} />
                  <Route exact path="/vidburdir/:id" component={EventRoute} />
                  <Route exact path="/page/:slug/:id" component={PageRoute} />
                  <Route exact path="/leit/:search" component={SearchRoute} />
                  <Route component={NoData} />
                </Switch>
              </div>
            </ErrorBoundary>
            <div className={s.supporters}>
              <Container className={s.supportersContainer}>
                <Supporters />
              </Container>
            </div>
            <Footer />
          </ScrollToTop>
        </Router>
        <div className={s.emailButton}>
          <Fab
            color="secondary"
            aria-label="Email"
            href={`mailto:${email}?subject=${subject}&body=${body}`}
          >
            <EmailIcon />
          </Fab>
        </div>
      </div>
    );
  }
}

export default App;
