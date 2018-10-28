import "./overview.css";
import React from "react";

class Overview extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    fetch("http://localhost:3001/entries")
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("something went wrong");
        }
      })
      .then(entries => {
        console.log(entries);
      });
  }

  render() {
    return (
      <div className="overview">
        <h1 className="overview-title">This is your overview!</h1>
        <div className="graph" />
        />
      </div>
    );
  }
}

export default Overview;
