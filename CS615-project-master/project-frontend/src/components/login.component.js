import React, { Component } from "react";
import { FaUserPlus } from "react-icons/fa";
import Button from "react-bootstrap/Button";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export default class Login extends Component {
  state = {
    emailId: "",
    password: "",
  };

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.myChangeHandler = this.myChangeHandler.bind(this);
  }

 /*  componentDidMount() {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.get("token")}`,
      },
    };
    fetch(`${process.env.REACT_APP_API_URL}/users/verifytoken`, requestOptions)
      .then((response) => response.json())
      .then(function (data) {
        if (data.success) {
          window.location.href = "/dashboard";
        }
      });
  } */
  handleSubmit(event) {
    event.preventDefault();
    let formdata = {
      emailId: this.state.emailId,
      password: this.state.password,
    };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formdata),
    };
    fetch(`${process.env.REACT_APP_API_URL}/users/loginuser`, requestOptions)
      .then((response) => response.json())
      .then(function (data) {
        if (data.success) {
          const promise1 = new Promise(function (resolve, reject) {
            cookies.set("token", data.token);
            setTimeout(function () {
              resolve();
            }, 1000);
          });
          promise1.then(function (value) {
            window.location.pathname = "/dashboard";
          });
        }
      });
  }

  myChangeHandler = (event) => {
    let { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="auth-wrapper">
        <div className="auth-inner">
          <form onSubmit={this.handleSubmit}>
            <h3>Sign In</h3>

            <div className="form-group">
              <label>Email address</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                name="emailId"
                value={this.state.emailId}
                onChange={this.myChangeHandler}
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                name="password"
                value={this.state.password}
                onChange={this.myChangeHandler}
              />
            </div>

            <button type="submit" className="btn btn-primary btn-block">
              Sign In
            </button>
            <p className="forgot-password text-right">
              Forgot <a href="#">password?</a>
            </p>
            <hr />
            <Button href="/register" className="btn btn-warning btn-block">
              <FaUserPlus /> Register
            </Button>
          </form>
        </div>
      </div>
    );
  }
}
