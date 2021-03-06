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
    const entriesUrl = "/entries/" + this.props.uid;
    fetch(entriesUrl)
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
    return (
      <div className="overview">
        <h1 className="overview-title">Overview</h1>
        <h4>How well you feel you slept over time</h4>
        <div className="graph">
          <Chart data={this.state.results} />
        </div>
      </div>
    );
  }
}

export default Overview;
