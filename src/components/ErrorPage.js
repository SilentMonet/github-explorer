import React from "react";
import "./errorPage.scss";

class ErrorPage extends React.Component {
  render() {
    return (
      <div className="errorPage">
        <p>Load failed.Please try again later.</p>
      </div>
    );
  }
}

export default ErrorPage;
