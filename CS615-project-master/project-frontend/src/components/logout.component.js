import { Component } from "react";
import Cookies from "universal-cookie";
const cookies = new Cookies();
export default class Logout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      articles: [],
    };
  }
  async componentDidMount() {
    const requestOptions = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    };
    fetch(`${process.env.REACT_APP_API_URL}/users/logoutuser`, requestOptions)
      .then(() => console.log("Logged Out successfully"))
      .catch(() => console.log("Logout Failed in logout component"));

    cookies.remove("token");
  }

  render() {
    return (window.location.pathname = "/sign-in");
  }
}
