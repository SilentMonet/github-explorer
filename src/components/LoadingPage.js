import React from "react";
import "./loadingPage.scss";
class LoadingPage extends React.Component {
  render() {
    return (
      <div className="loadingPage">
        <p className="text">
          <span className="loadingIcon" />
          loading...
        </p>
      </div>
    );
  }
}

export default LoadingPage;
