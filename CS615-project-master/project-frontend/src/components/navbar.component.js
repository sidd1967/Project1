import React, { Component } from "react";
import { FaBars } from "react-icons/fa";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

/* import {
  NavDropdown,
  Nav,
  Button,
  Form,
  FormControl,
  Navbar,
  NavItem,
} from "react-bootstrap"; */

class NavHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      user: {
        name: "",
      },
    };
  }

  componentDidMount() {
    setTimeout(async () => {
      var decode = await jwt_decode(Cookies.get("token"));
      var userChanges = { ...this.state.user };
      userChanges.name = decode.name;
      this.setState({ user: userChanges, isLoaded: true });
    }, 500);
  }

  render() {
    const iconPath = process.env.PUBLIC_URL + "/images/";
    const { user } = this.state;
    return (
      <div>
        <nav className="mb-1 navbar navbar-expand-lg navbar-light bg-light navcolor-light">
          <a className="navbar-brand nav-title" href="/dashboard">
            Structured Stories
          </a>
          <span
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent-555"
            aria-controls="navbarSupportedContent-555"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <FaBars />
          </span>
          <div
            className="collapse navbar-collapse"
            id="navbarSupportedContent-555"
          >
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <a className="nav-link nav-title" href="/dashboard">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link nav-title" href="/add-article">
                  Add Article
                </a>
              </li>
            </ul>
            <ul className="navbar-nav ml-auto nav-flex-icons">
              <li className="nav-item dropdown">
                <a
                  className="nav-link nav-title dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {user.name}
                </a>
                <div
                  className="dropdown-menu dropdown-menu-right"
                  aria-labelledby="navbarDropdown"
                >
                  <span className="dropdown-header dropdown-header-center">
                    <img src={`${iconPath}user-profile.png`} alt="Avatar" />
                    <br />
                    {user.name}
                  </span>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" href="/profile">
                    Profile
                  </a>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" href="/about">
                    About
                  </a>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" href="/logout-user">
                    Logout
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default () => (
  <div>
    <NavHeader />
  </div>
);
