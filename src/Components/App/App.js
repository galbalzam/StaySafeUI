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
import Logout from "../../pages/Logout/Logout";
import OfferHelp from "../../pages/OfferHelp/OfferHelp";
import EditAllOffers from "../../pages/EditAllOffers/EditAllOffers";
import { EditUsers } from "../../pages/EditUsers/EditUsers";
const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Navbar />

          <div className="main-app-section">
            <Switch>
              <Route path="/about" component={About} />
              <Route path="/logout" component={Logout} />
              <Route path="/" exact component={AllOffers} />
              <Route path="/offerHelp/:userEmail" component={OfferHelp} />
              <Route path="/AddOffer" component={CreateHostingSuggestion} />
              <Route path="/MyOffer" component={MyOffer} />
              <Route path="/editOffers" component={EditAllOffers} />
              <Route path="/editUsers" component={EditUsers} />
              <Route path="/contacts" component={Phones} />
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
