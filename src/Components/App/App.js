import React from "react";
import CreateHostingSuggestion from "../../pages/CreateHostingSuggestion/CreateHostingSuggestion";
import AllOffers from "../AllOffers/AllOffers";
import Navbar from "../Navbar/Navbar";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import About from "../../pages/About/About";
import Footer from "../Footer/Footer";
import "./App.css"
import "firebase/auth";
import NotFound from '../../pages/NotFound/NotFound'

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />

        <div className="main-app-section">
          <Switch>
            <Route path="/about" component={About} />
            <Route
              path="/" exact
              component={AllOffers}
            />
            <Route
              path="/AddOffer"
              component={CreateHostingSuggestion}
            />
            <Route
              path="*"
              component={NotFound}
            />
          </Switch>
        </div>
      </BrowserRouter>

      <Footer />
    </div>
  );
}

export default App;
