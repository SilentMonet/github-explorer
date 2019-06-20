import React from "react";
import RepositoryItem from "./RepositoryItem";

class RepositoriesList extends React.Component {
  render() {
    return (
      <ul className="reposList">
        {this.props.repos.map(item => (
          <RepositoryItem repoInfo={item} key={item.node_id} />
        ))}
      </ul>
    );
  }
}
export default RepositoriesList;
