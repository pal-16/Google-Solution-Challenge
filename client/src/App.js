import CropIdentifier from './components/CropIdentifier';
import LandingPage from './components/LandingPage';
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Footer from './components/Footer';
import "./components/LandingPage.css"
import Header from './components/Header';
import Chatbot from './components/Chatbot';

function App() {

  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/predict" component={CropIdentifier} />
        <Route path="/locate" component={Chatbot} />
        <Route path="/" component={LandingPage} />
      </Switch>
      <Footer />
    </Router >
  );
}

export default App;
