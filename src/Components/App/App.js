import React from "react";
import AddHostingOffer from "../../pages/HostingSuggestion/HostingSuggestion";
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
              component={AddHostingOffer}
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
