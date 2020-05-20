import React, { Component } from "react";
import NavHeader from "./navbar.component";
import RichTextEditor from "./richtexteditor.component";
import CreatableMulti from "./multiselect.component";
import Cookies from "js-cookie";

const createOption = (label) => ({
  label,
  value: label,
});

class EditArticle extends Component {
  articleId = "";
  state = {
    error: null,
    isLoaded: false,
    shouldBlock: true,
    article: {
      _id: "",
      authorname: "",
      title: "",
      article: "",
      tags: [],
      inputValue: "",
    },
    count: 0,
    time: 600,
    final: 0,
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
  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.onUnload);
  }
  componentDidMount() {
    if (!document.cookie) {
      window.alert("PLEASE LOG-IN TO CONTINUE");
      window.location.pathname = "/sign-in";
    }
    window.addEventListener("beforeunload", this.onUnload);

    var exe = setInterval(() => {
      this.setState({
        count: this.state.count++,
        time: this.state.time - this.state.count,
        final: convertSeconds(this.state),
      });
    }, 1000);

    function convertSeconds(s) {
      var min = Math.floor(s.time / 60);
      var sec = s.time % 60;
      if (s.time == s.count) {
        window.alert("Time Up!!!!!");

        return end();
      }

      return min + ":" + sec;
    }

    function end() {
      clearInterval(exe);

      window.location.pathname = "/dashboard";
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
      `${process.env.REACT_APP_API_URL}/articles/${this.articleId}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        let articleObj = {};
        Object.keys(data).forEach(function (item) {
          if (data[item] === null && item === "tags") {
            articleObj[item] = [];
          } else {
            articleObj[item] = data[item];
          }
        });
        this.setState({ article: articleObj });
      })
      .catch(function (err) {
        alert("The Requested Article is in use");
        window.location.pathname = "/dashboard";
      });
  }
  onUnload = async (event) => {
    if (this.state.shouldBlock) {
      event.preventDefault();
    } else {
      const requestOptions = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      };
      await fetch(
        `${process.env.REACT_APP_API_URL}/articles/unlock/${this.articleId}`,
        requestOptions
      )
        .then((response) => response.json())
        .then(function (data) {
          console.log("article lock released");
        });
    }
    return event;
  };

  handleSubmit(event) {
    this.state.shouldBlock = false;
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
          //    clearInterval(exe);
          window.location.pathname = "/dashboard";
        });
      });
  }

  render() {
    const { count } = this.state;
    const { final } = this.state;
    const { time } = this.state;
    return (
      <div>
        <NavHeader />
        <br />
        <div className="container container-fluid">
          <h1> Edit Article </h1>
          <h3> Current Count: {final}</h3>
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

export default EditArticle;
