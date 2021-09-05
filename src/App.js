import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./components/home";
import Doctors from "./components/doctors";
import Patients from "./components/patients";
import NotFound from "./common/notFound";
import AppointmentDetails from "./components/appointmentDetails";
import NavBar from "./common/navbar";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import "./App.css";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <main className="container">
          <Switch>
            <Route path="/appointments/:id" component={AppointmentDetails} />
            <Route path="/login" component={LoginForm} />
            <Route path="/register" component={RegisterForm} />
            <Route path="/doctors" component={Doctors} />
            <Route path="/patients" component={Patients} />
            <Route path="/not-found" component={NotFound} />
            <Route path="/appointments" component={Home} />
            <Route path="/" exact component={Home} />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
