import React, { Component } from "react";
import { Jumbotron, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import NavHeader from "./navbar.component";
import jwt_decode from "jwt-decode";

/* const Style = {
  backgroundColor: "#eff0f2",
  paddingTop: "0px",
};
const Style2 = {
  width: "100%",
  height: "50%",
}; */
const iconPath = process.env.PUBLIC_URL + "/images/";
class DisplayProfile extends Component {
  state = {
    error: null,
    isLoaded: false,
    profile: {
      _id: "",
      emailId: "",
      profile: {
        fullName: "",
        birthday: "",
        city: "",
        occupation: "",
        bio: "",
        tags: [],
      },
      //interest: "",
    },
  };

  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    //const { params } = this.props.match;
    //this.profileId = params.id;

    if (!document.cookie) {
      window.alert("PLEASE LOG-IN TO CONTINUE");
      window.location.pathname = "/sign-in";
    }
    setTimeout(async () => {
      var decode = await jwt_decode(Cookies.get("token"));
      var userChanges = { ...this.state.profile };
      userChanges.emailId = decode.email;
      this.setState({ profile: userChanges, isLoaded: true });
    }, 500);
    const requestOptions = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    };
    fetch(
      `${process.env.REACT_APP_API_URL}/profile/displayprofile`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        let profileObj = {};
        Object.keys(data).forEach(function (item) {
          profileObj[item] = data[item];
        });
        console.log(profileObj);
        this.setState({ profile: profileObj });
      });
  }
  handleSubmit(event) {
    event.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.state.profile),
    };
    fetch(
      `${process.env.REACT_APP_API_URL}/profile/editprofile/${this.profileId}`,
      requestOptions
    )
      .then((response) => response.json())
      .then(function (data) {
        const promise1 = new Promise(function (resolve, reject) {
          resolve();
        });
        promise1.then(function (value) {
          window.location.pathname = "/dashboard";
        });
      });
  }

  render() {
    return (
      <div>
        <NavHeader />

        <Jumbotron>
          <h2 /* style={{ textAlign: "center" }} */>
            Welcome {this.state.profile.profile.fullName}
          </h2>
          <hr />
          <div /* style={Style} */ className="container col-md-3" id="profile">
            <div id="profileavatar">
              <img src={`${iconPath}user-profile.png`} alt="Avatar" />
            </div>
            <h2 className="profileinfo">Information</h2>
            <p>
              <b>Email: </b>
              {this.state.profile.emailId}
            </p>
            <p>
              <b>Birthday:</b>
              {this.state.profile.profile.birthday}
            </p>
            <p>
              <b>City: </b>
              {this.state.profile.profile.city}
            </p>
            <p>
              <b>Occupation: </b>
              {this.state.profile.profile.occupation}
            </p>
            {this.state.profile.profile.interests ? (
              this.state.profile.profile.interests.length > 0 ? (
                <p>
                  <b>Interests:</b>
                  {""}
                  {this.state.profile.profile.interests
                    .map((val) => val.value)
                    .join(", ")}
                </p>
              ) : (
                <span></span>
              )
            ) : (
              <span></span>
            )}
            <p>
              <b>Bio: </b>
              {this.state.profile.profile.bio}
            </p>
            <Button>
              <Link
                className="profilebutton"
                to={{ pathname: `/editprofile/${this.state.profile._id}` }}
              >
                Edit Profile
              </Link>
            </Button>
          </div>
          <hr />
        </Jumbotron>
      </div>
    );
  }
}

export default DisplayProfile;
