import React, { useState, useEffect } from "react";
import HostingSuggestion from "../HostingSuggestion/HostingSuggestion";
import AllOffers from "../AllOffers/AllOffers";
import Navbar from "../Navbar/Navbar";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "../../pages/Login/Login";
import Register from "../../pages/Register/Register";
import About from "../../pages/About/About";
import Footer from "../Footer/Footer";
import "./App.css";
import firebase from "firebase/app";
import "firebase/auth";
import {
  FirebaseAuthProvider,
  FirebaseAuthConsumer,
  IfFirebaseAuthed,
  IfFirebaseAuthedAnd,
} from "@react-firebase/auth";
import { createStore } from "redux";
import allReducers from "../../redux/auth.reducer";
import { Provider } from "react-redux";

function App() {
  const store = createStore(allReducers);

  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          <Navbar />

          <div className="main-app-section">
            <Switch>
              <Route exact path="/about" component={About} />
              <Route exact path="/" component={AllOffers} />
              <Route exact path="/hosting" component={HostingSuggestion} />
            </Switch>
          </div>
        </BrowserRouter>

        <Footer />
      </div>
    </Provider>
  );
}

export default App;
