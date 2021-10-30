import React from "react";
import CreateHostingSuggestion from "../../pages/CreateHostingSuggestion/CreateHostingSuggestion";
import AllOffers from "../../pages/AllOffers/AllOffers";
import Navbar from "../Navbar/Navbar";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import About from "../../pages/About/About";
import Footer from "../Footer/Footer";
import "./App.css";
import "firebase/auth";
import NotFound from "../../pages/NotFound/NotFound";
import { QueryClient, QueryClientProvider } from "react-query";
import MyOffer from "../../pages/MyOffers/MyOffer";
import Phones from "../../pages/Phones/phones";
const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Navbar />

          <div className="main-app-section">
            <Switch>
              <Route path="/about" exact component={About} />
              <Route path="/" exact component={AllOffers} />
              <Route path="/AddOffer" exact component={CreateHostingSuggestion} />
              <Route path="/MyOffer" exact component={MyOffer} />
              <Route path="/contacts" exact component={Phones} />
              <Route path="*" component={NotFound} />
            </Switch>
          </div>
        </BrowserRouter>
      </QueryClientProvider>
      <Footer />
    </div>
  );
}

export default App;
