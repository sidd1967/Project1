import React, { Component } from "react";
import FormErrors from "../FormErrors";

export default class Register extends Component {
  state = {
    fullName: "",
    emailId: "",
    password: "",
    confirm: "",
    formErrors: { emailId: "", password: "" },
    emailValid: false,
    passwordValid: false,
    formValid: false,
  };

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.myChangeHandler = this.myChangeHandler.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    let formdata = {
      fullName: this.state.fullName,
      emailId: this.state.emailId,
      password: this.state.password,
    };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formdata),
    };
    var baseUrl = process.env.REACT_APP_API_URL;
    fetch(baseUrl + "/users/createuser", requestOptions).then(function (
      response,
      error
    ) {
      if (error) alert(error);
      if (response.statusText === "Created") {
        window.location.pathname = "/sign-in";
      } else {
        alert(response.statusText);
      }
    });
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;

    switch (fieldName) {
      case "emailId":
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? "" : " is invalid";
        break;
      case "password":
        passwordValid = value.length >= 6;
        fieldValidationErrors.password = passwordValid ? "" : " is too short";
        break;
      case "confirm":
        passwordValid = value.match(this.state.password);
        fieldValidationErrors.password = passwordValid
          ? ""
          : " should match with password";
        break;
      default:
        break;
    }
    this.setState(
      {
        formErrors: fieldValidationErrors,
        emailValid: emailValid,
        passwordValid: passwordValid,
      },
      this.validateForm
    );
  }

  validateForm() {
    this.setState({
      formValid: this.state.emailValid && this.state.passwordValid,
    });
  }

  myChangeHandler = (event) => {
    let { name, value } = event.target;
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  };

  render() {
    return (
      <div className="auth-wrapper">
        <div className="auth-inner">
          <form onSubmit={this.handleSubmit}>
            <h3>Register</h3>
            <div className="panel panel-default">
              <FormErrors formErrors={this.state.formErrors} />
            </div>

            <div className="form-group">
              <label>Full name</label>
              <input
                type="text"
                className="form-control"
                name="fullName"
                placeholder="First name"
                value={this.state.fullName}
                onChange={this.myChangeHandler}
              />
            </div>

            <div className="form-group">
              <label>Email address</label>
              <input
                type="email"
                className="form-control"
                name="emailId"
                placeholder="Enter email address"
                value={this.state.emailId}
                onChange={this.myChangeHandler}
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                placeholder="Enter password"
                value={this.state.password}
                onChange={this.myChangeHandler}
              />
            </div>

            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                className="form-control"
                name="confirm"
                placeholder="Enter confirm password"
                value={this.state.confirm}
                onChange={this.myChangeHandler}
              />
            </div>

            <button
              disabled={!this.state.formValid}
              type="submit"
              className="btn btn-primary btn-block"
            >
              Register
            </button>

            <p className="forgot-password text-right">
              Already registered? <a href="/sign-in">sign in</a>
            </p>
          </form>
        </div>
      </div>
    );
  }
}
