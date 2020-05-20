import React, { Component } from "react";
import NavHeader from "./navbar.component";
import ReactHtmlParser from "react-html-parser";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import Cookies from "js-cookie";
import HistoryModalWindow from "./bootmodal.component";

class DisplayArticle extends Component {
  articleId = "";
  state = {
    error: null,
    isLoaded: false,
    modalShow: false,
    article: {
      _id: "",
      authorname: "",
      title: "",
      article: "",
      tags: [],
      history: [],
    },
  };

  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (!document.cookie) {
      window.alert("PLEASE LOG-IN TO CONTINUE");
      window.location.pathname = "/sign-in";
    }
    const { params } = this.props.match;
    this.articleId = params.id;
    const requestOptions = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    };
    fetch(
      `${process.env.REACT_APP_API_URL}/articles/search/${this.articleId}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        let articleObj = {};
        Object.keys(data).forEach(function (item) {
          articleObj[item] = data[item];
        });
        //console.log(articleObj);
        this.setState({ article: articleObj });
      });
  }

  setModalShow(changeToggle) {
    this.setState({ modalShow: changeToggle });
  }

  deleteAlert(articleId) {
    confirmAlert({
      title: "Delete Confirmation",
      message: "Are you sure to delete this Article?",
      buttons: [
        {
          label: "Yes",
          onClick: () => this.deleteArticle(articleId),
        },
        {
          label: "No",
          onClick: () => console.log("Click No"),
        },
      ],
    });
  }

  deleteArticle(articleId) {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    };
    fetch(
      `${process.env.REACT_APP_API_URL}/articles/${articleId}`,
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
  handleSubmit(event) {
    event.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      body: JSON.stringify(this.state.article),
    };
    fetch(
      `${process.env.REACT_APP_API_URL}/articles/update/${this.articleId}`,
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
        <HistoryModalWindow
          show={this.state.modalShow}
          dynamicdata={this.state.article.history}
          onHide={() => this.setModalShow(false)}
        />
        <br />
        <div className="container container-fluid">
          <div className="row">
            <div className="col-lg-8 col-md-8 text-break">
              <h2>{this.state.article.title}</h2>
              <h6>
                Author Name: {this.state.article.authorname}
                <br />
              </h6>
              {this.state.article.history.length > 0 ? (
                <div>
                  <p>
                    Edited By:{" "}
                    {Array.from(
                      new Set(
                        this.state.article.history.map((val) => val.fullName)
                      )
                    )
                      .slice(0, 3)
                      .join(",")}
                  </p>
                  <a href="#" onClick={() => this.setModalShow(true)}>
                    Full Edit History >
                  </a>
                </div>
              ) : (
                <span></span>
              )}
              {this.state.article.tags.length > 0 ? (
                <p>
                  Tags:{" "}
                  {this.state.article.tags.map((val) => val.value).join(",")}
                </p>
              ) : (
                <span></span>
              )}
            </div>
            <div className="col-lg-4 col-md-4">
              <span className="col-lg-2 col-md-2">
                <Link
                  to={`/article/${this.state.article._id}`}
                  className="btn btn-outline-success"
                >
                  Edit Article
                </Link>
              </span>
              <span className="col-lg-2 col-md-2 inline">
                <button
                  onClick={() => this.deleteAlert(this.state.article._id)}
                  className="btn btn-outline-danger"
                >
                  Delete Article
                </button>
              </span>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-lg-12 col-md-12 align-self-center text-break">
              {ReactHtmlParser(this.state.article.article)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DisplayArticle;
