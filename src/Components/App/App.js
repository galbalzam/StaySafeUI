import React, { useState } from "react";
import HostingSuggestion from "../HostingSuggestion/HostingSuggestion";
import AllOffers from "../AllOffers/AllOffers";
import Navbar from "../Navbar/Navbar";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "../Auth/Login/Login";
import Register from "../Auth/Register/Register";
import About from "../../pages/About/About";
import Footer from "../Footer/Footer";
import "./App.css";
import config from "../../Services/firebaseConfig";
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

// Initialize Firebase
firebase.initializeApp(config);

function App() {
  const store = createStore(allReducers);

  const [role, setRole] = useState("searching");

  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          <Navbar />

          <div className="main-app-section">
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/about" component={About} />

              <Route
                path="/"
                component={role === "searching" ? AllOffers : HostingSuggestion}
              />
            </Switch>
          </div>
        </BrowserRouter>

        <Footer />
      </div>
    </Provider>
  );
}

export default App;