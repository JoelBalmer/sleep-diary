import "./overview.css";
import React from "react";

class Overview extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="overview">
        <h1 className="overview-title">This is your overview!</h1>
        <div className="graph" />
      </div>
    );
  }
}

export default Overview;
