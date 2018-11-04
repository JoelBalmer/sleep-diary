import React from "react";
import Chart from "./chart.js";
import "./overview.css";

class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: []
    };
  }

  componentDidMount() {
    fetch("http://localhost:3001/entries/10156135339231140")
      .then(response => {
        if (response.ok) {
          let data = response.json();
          return data;
        } else {
          throw new Error("Something went wrong");
        }
      })
      .then(response => {
        let resultsArray = [];
        for (let i = 0; i < response.length; i++) {
          let currentEntry = response[i];
          let newEntry = {
            date: currentEntry.date,
            rating: currentEntry.rating
          };
          resultsArray.push(newEntry);
        }

        this.setState({
          results: resultsArray
        });
      });
  }

  render() {
    const { results } = this.state;

    return (
      <div className="overview">
        <h1 className="overview-title">This is your overview!</h1>
        <div className="graph">
          <Chart data={this.state.results} />
        </div>
      </div>
    );
  }
}

export default Overview;
