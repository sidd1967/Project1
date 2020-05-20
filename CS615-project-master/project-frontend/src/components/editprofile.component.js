import React, { Component } from "react";
import NavHeader from "./navbar.component";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import CreatableMulti from "./multiselect.component";

const createOption = (label) => ({
  label,
  value: label,
});

class EditProfile extends Component {
  constructor() {
    super();
    this.state = {
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
          interests: [],
          inputValue: "",
        },
        //interest: "",
      },
    };
    this.myChangeHandler = this.myChangeHandler.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    //this.handleEditorChange = this.handleEditorChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    //this.handleImageChange=this.handleImageChange(this);
  }
  /*  handleImageChange= (event) =>{
    console.log(events.target.Files[0])
    console.log(events.target.Files[0].fileName)
  } */
  handleCreate = (options) => {
    var changedProfile = { ...this.state.profile.profile };
    changedProfile["interests"] = options || [];
    this.setState({
      profile: {
        profile: changedProfile,
      },
    });
  };

  handleInputChange = (inputValue) => {
    var changedProfile = { ...this.state.profile.profile };
    changedProfile["inputValue"] = inputValue;
    this.setState({
      profile: {
        profile: changedProfile,
      },
    });
  };

  handleKeyDown = (event) => {
    var changedProfile = { ...this.state.profile.profile };
    if (!changedProfile.inputValue) return;
    switch (event.key) {
      case "Enter":
      case "Tab":
        var newArt = {
          inputValue: "",
          interests: [
            ...changedProfile.interests,
            createOption(changedProfile.inputValue),
          ],
        };
        changedProfile["inputValue"] = newArt.inputValue;
        changedProfile["interests"] = newArt.interests;
        this.setState({
          profile: {
            profile: changedProfile,
          },
        });
        event.preventDefault();
    }
  };

  myChangeHandler = (event) => {
    var changedProfile = { ...this.state.profile.profile };
    let { name, value } = event.target;
    changedProfile[name] = value;
    this.setState({
      profile: {
        profile: changedProfile,
      },
    });
  };

  componentDidMount() {
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
        if (data.noprofile === undefined) {
          let profileObj = {};
          Object.keys(data).forEach(function (item) {
            profileObj[item] = data[item];
          });
          console.log(profileObj);
          this.setState({ profile: profileObj });
        }
      });
  }

  handleSubmit(event) {
    const { params } = this.props.match;
    this.profileId = params.id;
    event.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
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
          window.location.pathname = "/profile/displayprofile";
        });
      });
  }

  render() {
    return (
      <div>
        <NavHeader />
        <div className="container container-fluid">
          <h1> Edit Profile </h1>
          <form onSubmit={this.handleSubmit} encType="multipart/form-data">
            <div className="form-group">
              <label htmlFor="email"> Email</label>
              <input
                type="text"
                name="email"
                value={this.state.profile.emailId}
                className="form-control"
                placeholder="Email"
                onChange={this.myChangeHandler}
                disabled
              />
            </div>
            <div className="form-group">
              <label htmlFor="birthday">Birthday</label>
              <input
                type="text"
                name="birthday"
                value={this.state.profile.profile.birthday}
                onChange={this.myChangeHandler}
                className="form-control"
                placeholder="Birthday"
              />
            </div>
            <div className="form-group">
              <label htmlFor="city">City</label>
              <input
                type="text"
                name="city"
                value={this.state.profile.profile.city}
                onChange={this.myChangeHandler}
                className="form-control"
                placeholder="City"
              />
            </div>
            <div className="form-group">
              <label htmlFor="occupation">Occupation</label>
              <input
                type="text"
                name="occupation"
                value={this.state.profile.profile.occupation}
                onChange={this.myChangeHandler}
                className="form-control"
                placeholder="Occupation"
              />
            </div>
            {/*  <div className="form-group">
              <label htmlFor="interest">Interest</label>
              <input
                type="text"
                name="interest"
                value={this.state.profile.interest}
                onChange={this.myChangeHandler}
                className="form-control"
                placeholder="Your interest"
              />
            </div> */}
            <div className="form-group">
              <label htmlFor="bio">Bio</label>
              <input
                type="text"
                name="bio"
                value={this.state.profile.profile.bio}
                onChange={this.myChangeHandler}
                className="form-control"
                placeholder="Say something about yourself"
              />
            </div>
            {/* <div className="form-group">
              <label htmlFor="image">Image</label>
              <input
                type="file"
                name="image"
                //value={this.state.profile.image}
                onChange={
                  ( e ) => {
                    e.preventDefault();
                    const { fields } = this.props;
                    // convert files to an array
                    const files = [ ...e.target.files ];
                    fields.image.handleChange(files);
                  }}
                  onChange={this.handleImageChange}
                className="form-control"
              /> */}
            {/* </div> */}
            <div className="form-group">
              <label htmlFor="profileTags">Interest</label>
              <CreatableMulti
                name="profileTags"
                value={this.state.profile.profile.interests}
                inputValue={this.state.profile.profile.inputValue}
                onChange={this.handleCreate}
                onInputChange={this.handleInputChange}
                onKeyDown={this.handleKeyDown}
                className="form-control"
                placeholder="Select/Create some tags you are interested in"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default EditProfile;
