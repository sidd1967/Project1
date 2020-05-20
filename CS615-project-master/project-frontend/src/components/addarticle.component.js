import React, { Component } from "react";
import NavHeader from "./navbar.component";
import Cookies from "js-cookie";
import RichTextEditor from "./richtexteditor.component";
import CreatableMulti from "./multiselect.component";
import jwt_decode from "jwt-decode";

const createOption = (label) => ({
  label,
  value: label,
});

class AddArticle extends Component {
  state = {
    error: null,
    isLoaded: false,
    article: {
      _id: "",
      authorname: "",
      title: "",
      article: "",
      tags: [],
      inputValue: "",
    },
  };

  constructor() {
    super();
    this.myChangeHandler = this.myChangeHandler.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (!document.cookie) {
      window.alert("PLEASE LOG-IN TO CONTINUE");
      window.location.pathname = "/sign-in";
    } else {
      setTimeout(async () => {
        var decode = await jwt_decode(Cookies.get("token"));
        var userChanges = { ...this.state.article };
        userChanges.authorname = decode.name;
        this.setState({ article: userChanges, isLoaded: true });
      }, 500);
    }
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
    fetch(`${process.env.REACT_APP_API_URL}/articles/add`, requestOptions)
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

  handleCreate = (options) => {
    var article = { ...this.state.article };
    article["tags"] = options || [];
    this.setState({ article });
  };

  handleEditorChange = (text) => {
    var article = { ...this.state.article };
    article["article"] = text;
    this.setState({ article });
  };

  handleInputChange = (inputValue) => {
    var article = { ...this.state.article };
    article["inputValue"] = inputValue;
    this.setState({ article });
  };

  handleKeyDown = (event) => {
    var article = { ...this.state.article };
    if (!article.inputValue) return;
    switch (event.key) {
      case "Enter":
      case "Tab":
        var newArt = {
          inputValue: "",
          tags: [...article.tags, createOption(article.inputValue)],
        };
        article["inputValue"] = newArt.inputValue;
        article["tags"] = newArt.tags;
        this.setState({ article });
        event.preventDefault();
    }
  };

  myChangeHandler = (event) => {
    var article = { ...this.state.article };
    let { name, value } = event.target;
    article[name] = value;
    this.setState({ article });
  };

  render() {
    return (
      <div>
        <NavHeader />
        <br />
        <div className="container container-fluid">
          <h1> Add Article </h1>
          <hr />
          <form onSubmit={this.handleSubmit} encType="multipart/form-data">
            <div className="form-group">
              <label htmlFor="authorname">Author Name</label>
              <input
                type="text"
                name="authorname"
                value={this.state.article.authorname}
                className="form-control"
                placeholder="Author Name"
                disabled
              />
            </div>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                name="title"
                value={this.state.article.title}
                onChange={this.myChangeHandler}
                className="form-control"
                placeholder="Title"
              />
            </div>
            <div className="form-group">
              <label htmlFor="article">Article</label>
              <RichTextEditor
                name="article"
                value={this.state.article.article}
                onChange={this.handleEditorChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="articleTags">Tags</label>
              <CreatableMulti
                name="articleTags"
                value={this.state.article.tags}
                inputValue={this.state.article.inputValue}
                onChange={this.handleCreate}
                onInputChange={this.handleInputChange}
                onKeyDown={this.handleKeyDown}
                className="form-control"
                placeholder="Select/Create some tags..."
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Post Article
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default AddArticle;
