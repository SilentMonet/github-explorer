import React from "react";
import "./repositoryItem.scss";

class RepositoryItem extends React.Component {
    render() {
        return <div className="repositoryItem">
            <p className="repoName">{this.props.repoInfo.full_name}</p>
            <p className="repoDescription">{this.props.repoInfo.description}</p>
            <p className="repoMeta">
                {
                    this.props.repoInfo.language && <span className="language tag">{this.props.repoInfo.language}</span>
                }
                {
                    this.props.repoInfo.license && <span className="license tag">{this.props.repoInfo.license.name}</span>
                }
                    <br/>
                    <span className="stars tag">stars:{this.props.repoInfo.stargazers_count}</span>
                    <span className="forks tag">forks:{this.props.repoInfo.forks}</span>
            </p>
        </div>
    }
}
export default RepositoryItem