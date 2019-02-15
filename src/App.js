import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Fab from "@material-ui/core/Fab";
import EmailIcon from "@material-ui/icons/Email";
import ScrollToTop from "./components/ScrollToTop";
import HomeRoute from "./routes/Home";
import PostRoute from "./routes/Post";
import PhotoAlbumsRoute from "./routes/PhotoAlbums";
import PhotosRoute from "./routes/Photos";
import Header from "./components/Header";
import config from "./config";
import s from "./App.module.scss";

const {
  mail: { email, subject, body }
} = config;

const App = () => (
  <div className="App">
    <Router>
      <ScrollToTop>
        <Header />
        <Route exact path="/" component={HomeRoute} />
        <Route
          exact
          path="/frettir"
          render={props => <HomeRoute {...props} newsOnly />}
        />
        <Route exact path="/frett/:id" component={PostRoute} />
        <Route exact path="/myndir/:slug/:id" component={PhotosRoute} />
        <Route exact path="/myndir" component={PhotoAlbumsRoute} />
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

export default App;
