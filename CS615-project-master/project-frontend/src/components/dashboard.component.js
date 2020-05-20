import React, { Component } from "react";
import NavHeader from "./navbar.component";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import ReactHtmlParser from "react-html-parser";
import ReactPaginate from "react-paginate";
import Cookies from "universal-cookie";
const cookies = new Cookies();

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      error: null,
      isLoaded: false,
      offset: 0,
      data: [],
      perPage: 5,
      currentPage: 0,
      articles: [],
      articlesFiltered: [],
      myArticles: [],
      myArticlesFiltered: [],
    };
    this.handleArticleFilter = this.handleArticleFilter.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  async componentDidMount() {
    if (!document.cookie) {
      window.alert("PLEASE LOG-IN TO CONTINUE");
      window.location.pathname = "/sign-in";
    } else {
      const requestOptions = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.get("token")}`,
        },
      };
      fetch(`${process.env.REACT_APP_API_URL}/articles/all`, requestOptions)
        .then((res) => res.json())
        .then(
          (result) => {
            this.setState({
              isLoaded: true,
              articles: result,
            });
            this.paginationFilter(result);
          },
          (error) => {
            this.setState({
              isLoaded: true,
              error,
            });
          }
        );
      fetch(`${process.env.REACT_APP_API_URL}/articles/mine`, requestOptions)
        .then((res) => res.json())
        .then(
          (result) => {
            this.setState({
              isLoaded: true,
              myArticles: result,
            });
            this.myArticlesFilter(result);
          },
          (error) => {
            this.setState({
              isLoaded: true,
              error,
            });
          }
        );
    }
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

  handleArticleFilter = function (event) {
    let searchVal = event.target.value;
    let filteredValues = this.state.articles.filter((article) => {
      if (searchVal === null) {
        return article;
      } else if (
        article.title.toLowerCase().includes(searchVal.toLowerCase()) ||
        article.tags
          .map((p) => p.value)
          .join(",")
          .toLowerCase()
          .includes(searchVal.toLowerCase()) ||
        article.authorname.toLowerCase().includes(searchVal.toLowerCase())
      ) {
        return article;
      }
    });
    this.paginationFilter(filteredValues);
  };

  myArticlesFilter = function (toBeFiltered) {
    const slice = toBeFiltered.slice(0, 5);

    const postData = slice.map((article) => (
      <React.Fragment key={article._id}>
        <div className="row">
          <div className="col-lg-12 col-md-12 inline text-break">
            <Link
              to={{
                pathname: `/view/${article._id}`,
              }}
            >
              <h2>{article.title}</h2>
            </Link>
            <span className="badge badge-secondary p-2">
              {article.authorname}
            </span>
            <p>
              <br />
              Tags:
              {article.tags.map((val, key) => (
                <span key={key} className="badge badge-secondary p-2">
                  {val.value}
                </span>
              ))}
            </p>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-lg-12 col-md-12">
            <div className="article-pre">
              {ReactHtmlParser(article.article)}
            </div>
          </div>
          <div className="col-lg-12 col-md-12">
            <Link
              className="read-more-bt"
              to={{
                pathname: `/view/${article._id}`,
              }}
            >
              Full Article >
            </Link>
          </div>
        </div>
        <hr />
      </React.Fragment>
    ));

    this.setState({
      myArticlesFiltered: postData,
    });
  };

  paginationFilter = function (toBePaginatedArticles) {
    const data = toBePaginatedArticles;
    const slice = data.slice(
      this.state.offset,
      this.state.offset + this.state.perPage
    );
    const postData = slice.map((article) => (
      <React.Fragment key={article._id}>
        <div className="row">
          <div className="col-lg-8 col-md-8 inline text-break">
            <Link
              to={{
                pathname: `/view/${article._id}`,
              }}
            >
              <h2>{article.title}</h2>
            </Link>
            <span className="badge badge-secondary p-2">
              {article.authorname}
            </span>
            <p>
              <br />
              Tags:
              {article.tags.map((val, key) => (
                <span key={key} className="badge badge-secondary p-2">
                  {val.value}
                </span>
              ))}
            </p>
          </div>
          <div className="col-lg-4 col-md-4 inline">
            <span>
              <Link
                to={`/article/${article._id}`}
                className="btn btn-outline-success"
              >
                Edit Article
              </Link>
            </span>
            <span className="col-lg col-md">
              <button
                onClick={() => this.deleteAlert(article._id)}
                className="btn btn-outline-danger"
              >
                Delete Article
              </button>
            </span>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-lg-12 col-md-12">
            <div className="article-pre">
              {ReactHtmlParser(article.article)}
            </div>
          </div>
          <div className="col-lg-12 col-md-12">
            <Link
              className="read-more-bt"
              to={{
                pathname: `/view/${article._id}`,
              }}
            >
              Full Article >
            </Link>
          </div>
        </div>
        <hr />
      </React.Fragment>
    ));

    this.setState({
      pageCount: Math.ceil(data.length / this.state.perPage),
      articlesFiltered: postData,
    });
  };

  handlePageChange = function (event) {
    const selectedPage = event.selected;
    const offset = selectedPage * this.state.perPage;

    this.setState(
      {
        currentPage: selectedPage,
        offset: offset,
      },
      () => {
        this.paginationFilter(this.state.articles);
      }
    );
  };

  deleteArticle(articleId) {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.get("token")}`,
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

  render() {
    return (
      <div>
        <NavHeader />
        <br />
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-8 col-md-8">
              <div className="jumbotron">
                <h1>All Stories</h1>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    onChange={this.handleArticleFilter}
                    placeholder="Type to search for articles..."
                  />
                </div>
                <hr />
                {this.state.articlesFiltered}
                <ReactPaginate
                  previousLabel={"prev"}
                  nextLabel={"next"}
                  breakLabel={"..."}
                  breakClassName={"break-me"}
                  pageCount={this.state.pageCount}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  onPageChange={this.handlePageChange}
                  containerClassName={"pagination"}
                  subContainerClassName={"pages pagination"}
                  activeClassName={"active"}
                />
              </div>
            </div>
            <div className="col-lg-4 col-lg-4">
              <div className="jumbotron">
                <h1>Your Interests</h1>
                <p>(This articles are related to your interests)</p>
                <hr />
                {this.state.myArticlesFiltered}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
