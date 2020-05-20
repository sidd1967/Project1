import React, { useState, useEffect } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
//import "../node_modules/mdbootstrap/css/bootstrap.min.css";
//import "../node_modules/mdbootstrap/css/mdb.min.css";
//import axios from "axios";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/login.component";
import Register from "./components/register.component";
import Dashboard from "./components/dashboard.component";
import AddArticle from "./components/addarticle.component";
import EditArticle from "./components/editarticle.component";
import DisplayArticle from "./components/displayarticle.component";
import About from "./components/about.component";
import Logout from "./components/logout.component";
import EditProfile from "./components/editprofile.component";
import DisplayProfile from "./components/displayprofile.component";

/* import Articles from "./components/Articles";
import AddArticle from "./components/AddArticle";
import Article from "./components/Article";
import EditArticle from "./components/EditArticle"; */

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/sign-in" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/add-article" component={AddArticle} />
          <Route path="/article/:id" component={EditArticle} />
          <Route path="/view/:id" component={DisplayArticle} />
          <Route path="/editprofile/:id" component={EditProfile} />
          <Route path="/profile" component={DisplayProfile} />
          <Route path="/about" component={About} />
          <Route path="/logout-user" component={Logout} />

        </Switch>
      </div>
    </Router>
  );
}

export default App;
