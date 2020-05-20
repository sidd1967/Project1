import React, { Component } from "react";
import Cookies from "js-cookie";

import NavHeader from "./navbar.component";
import {
  FaAddressCard,
  FaFacebook,
  FaInstagram,
  FaGooglePlus,
} from "react-icons/fa";

class About extends Component {


  componentDidMount() {
    if(!document.cookie){
      window.alert("PLEASE LOG-IN TO CONTINUE");
      window.location.pathname = "/sign-in";

    }

  }
  render() {
    const iconPath = process.env.PUBLIC_URL + "/images/";
    return (
      <div className="imagebackground">
        <NavHeader />
        {/* <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <img
                src={`${iconPath}teamwork-header.jpg`}
                className="my-header"
                alt="Avatar"
              ></img>
            </div>
          </div>
        </div> */}
        <br />
        <div className="container container-fluid">
          <div className="row">
            <h1>Meet our Geeks</h1>
            <p>
              We are always honoured to introduce ourselves to the world.
              Because we have dont a lot of work to get these things to your
              desk. And we are here to support whenever you need us. Please meet
              our team members here to know about themselves in detail.
            </p>
            <blockquote className="quote-card">
              <h3>
                Great thing in business are never done by one person. They're
                done by team of people
              </h3>

              <cite>Steve Jobs</cite>
            </blockquote>
          </div>
          <br />
          <div className="row h-100">
            <div className="col-lg-4 v-align-auto">
              <div className="flip-card">
                <div className="flip-card-inner">
                  <div className="flip-card-front">
                    <img
                      src={`${iconPath}karthi.jpg`}
                      alt="Karthi"
                      style={{ width: 300 + "px", height: 300 + "px" }}
                    />
                  </div>
                  <div className="flip-card-back">
                    <div className="row h-100">
                      <div className="col-sm-12 v-align-auto">
                        <h3>Karthikeyan Somasundaram</h3>
                        <p>
                          19252166
                          <br />
                          M.Sc., Software Engineering
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flip-card-bottom">
                  <div className="flip-card-bottom-front">
                    <div className="row h-100">
                      <div className="col-sm-12 v-align-auto">
                        <h2>Karthikeyan Somasundaram</h2>
                      </div>
                    </div>
                  </div>
                  <div className="flip-card-bottom-back">
                    <div className="row h-100">
                      <div className="col-sm-2"></div>
                      <div className="col-sm-2 v-align-auto">
                        <FaGooglePlus />
                      </div>
                      <div className="col-sm-2 v-align-auto">
                        <FaFacebook />
                      </div>
                      <div className="col-sm-2 v-align-auto">
                        <FaInstagram />
                      </div>
                      <div className="col-sm-2 v-align-auto">
                        <FaAddressCard />
                      </div>
                      <div className="col-sm-2"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 v-align-auto">
              <div className="flip-card">
                <div className="flip-card-inner">
                  <div className="flip-card-front">
                    <img
                      src={`${iconPath}bindu.jpg`}
                      alt="Bindu"
                      style={{ width: 300 + "px", height: 300 + "px" }}
                    />
                  </div>
                  <div className="flip-card-back">
                    <div className="row h-100">
                      <div className="col-sm-12 v-align-auto">
                        <h3>Bindu Nag</h3>
                        <p>
                          19251016
                          <br />
                          M.Sc., Data Analytics
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flip-card-bottom">
                  <div className="flip-card-bottom-front">
                    <div className="row h-100">
                      <div className="col-sm-12 v-align-auto">
                        <h2>Bindu Nag</h2>
                      </div>
                    </div>
                  </div>
                  <div className="flip-card-bottom-back">
                    <div className="row h-100">
                      <div className="col-sm-2"></div>
                      <div className="col-sm-2 v-align-auto">
                        <FaGooglePlus />
                      </div>
                      <div className="col-sm-2 v-align-auto">
                        <FaFacebook />
                      </div>
                      <div className="col-sm-2 v-align-auto">
                        <FaInstagram />
                      </div>
                      <div className="col-sm-2 v-align-auto">
                        <FaAddressCard />
                      </div>
                      <div className="col-sm-2"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 v-align-auto">
              <div className="flip-card">
                <div className="flip-card-inner">
                  <div className="flip-card-front">
                    <img
                      src={`${iconPath}siddhu.jpg`}
                      alt="Siddhu"
                      style={{ width: 300 + "px", height: 300 + "px" }}
                    />
                  </div>
                  <div className="flip-card-back">
                    <div className="row h-100">
                      <div className="col-sm-12 v-align-auto">
                        <h3>Siddhartha Ranganathan</h3>
                        <p>
                          19251465
                          <br />
                          M.Sc., Data Analytics
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flip-card-bottom">
                  <div className="flip-card-bottom-front">
                    <div className="row h-100">
                      <div className="col-sm-12 v-align-auto">
                        <h2>Siddhartha Ranganathan</h2>
                      </div>
                    </div>
                  </div>
                  <div className="flip-card-bottom-back">
                    <div className="row h-100">
                      <div className="col-sm-2"></div>
                      <div className="col-sm-2 v-align-auto">
                        <FaGooglePlus />
                      </div>
                      <div className="col-sm-2 v-align-auto">
                        <FaFacebook />
                      </div>
                      <div className="col-sm-2 v-align-auto">
                        <FaInstagram />
                      </div>
                      <div className="col-sm-2 v-align-auto">
                        <FaAddressCard />
                      </div>
                      <div className="col-sm-2"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
      </div>
    );
  }
}

export default About;
