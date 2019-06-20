import React from "react";
import RepositoriesList from "../components/RepositoriesList";
import LoadingPage from "../components/LoadingPage";
import ErrorPage from "../components/ErrorPage";
import { search } from "../services/search";
import cloneJson from "../utils/cloneJson";
import "./app.scss";

let initialState = {
  currentInput: "",
  currentPage: 0,
  totalPage: 0,
  per_page: 10,
  response: null,
  nextPageResponse: null,//Deposit next page's response
  responseFromKeyword: "",
  
  //searchingStatus:
  //  wait : wait for user to input
  //  fetching : fetching search result from server
  //  successfully : fetched result successfully
  //  failed : fetched result failed
  searchingStatus: "wait"
};

class App extends React.Component {
  state = cloneJson(initialState);

  preloadNextPage() {
    if (this.state.currentPage < this.state.totalPage) {
      search(this.state.responseFromKeyword, this.state.currentPage + 1).then(
        response => this.setState({ nextPageResponse: response })
      );
    } else {
      this.setState({ nextPageResponse: null });
    }
  }
  
  handleInput = e => {
    this.setState({ currentInput: e.target.value });
  };

  handleSubmit = e => {
    switch (this.state.currentInput) {
      case "":
        this.setState(cloneJson(initialState));
        break;
      case this.state.responseFromKeyword:
        if (this.state.searchingStatus === "successfully") {
          break;
        }
      default:
        this.setState({
          searchingStatus: "fetching",
          responseFromKeyword: this.state.currentInput,
          response: null,
          nextPageResponse: null
        });
        search(this.state.currentInput).then(response =>
          this.setState(
            {
              response,
              searchingStatus: "successfully",
              currentPage: 1,
              totalPage: Math.ceil(response.total_count / this.state.per_page)
            },
            this.preloadNextPage
          ),
          ()=>this.setState({searchingStatus:"failed"})
        );
    }
    e.preventDefault();
  };

  toPage = index => {
    if (index <= this.state.totalPage && index >= 1) {
      if (
        index - this.state.currentPage === 1 &&
        this.state.nextPageResponse !== null
      ) {
        this.setState(
          {
            currentPage: index,
            response: this.state.nextPageResponse,
            nextPageResponse: null
          },
          this.preloadNextPage
        );
      } else {
        this.setState({
          searchingStatus: "fetching",
          currentPage: index,
          response: null
        });
        search(this.state.currentInput, index).then(response =>
          this.setState(
            { response, searchingStatus: "successfully" },
            this.preloadNextPage
          ),
          ()=>this.setState({searchingStatus:"failed"})
        );
      }
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  toNextPage = () => {
    this.toPage(this.state.currentPage + 1);
  };
  toPrevPage = () => {
    this.toPage(this.state.currentPage - 1);
  };

  render() {
    return (
      <div className="app">
        <form onSubmit={this.handleSubmit} className="searchContainer">
          <input
            type="text"
            className="searchInput"
            value={this.state.currentInput}
            placeholder="search"
            onChange={this.handleInput}
          />
          <input type="submit" className="searchBtn" value="search" />
        </form>
        <div>
          {this.state.searchingStatus === "wait" ? null : this.state
              .searchingStatus === "fetching" ? (
            <LoadingPage/>
          ) : this.state.searchingStatus === "failed" ? (
            <ErrorPage/>
          ) : this.state.searchingStatus === "successfully" ? (
            <RepositoriesList repos={this.state.response["items"]} />
          ) : null}
        </div>
        {this.state.currentPage <= 0 ? null : (
          <div className="pagination">
            <button className="prevPage" onClick={this.toPrevPage}>
              prev
            </button>
            <button className="current">{this.state.currentPage}</button>
            <button className="nextPage" onClick={this.toNextPage}>
              next
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default App;
