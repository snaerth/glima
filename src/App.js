import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import HomeRoute from "./routes/Home";
import PostRoute from "./routes/Post";
import Header from "./components/Header";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Router>
          <ScrollToTop>
            <Route exact path="/" component={HomeRoute} />
            <Route path="/post/:id" component={PostRoute} />
          </ScrollToTop>
        </Router>
      </div>
    );
  }
}

export default App;
