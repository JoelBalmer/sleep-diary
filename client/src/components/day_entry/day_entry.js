import React from "react";
import "./day_entry.css";
import DateUtils from "../../utils/time.js";

class DayEntry extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      //times: [66, 78, 168, 186],
      times: [10, 20, 70, 80],
      wakeTime: 0,
      rating: 5,
      notes: ""
    };

    this.onSubmit = this.onSubmit.bind(this);

    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleWakeChange = this.handleWakeChange.bind(this);
    this.handleRatingChange = this.handleRatingChange.bind(this);
    this.handleNotesChange = this.handleNotesChange.bind(this);
  }

  onSubmit(event) {
    //create payload
    var details = {
      uid: 10155988094031140,
      date: document.getElementsByName("date")[0].innerHTML,
      start_bed: document.getElementsByName("got into bed")[0].value,
      start_sleep: document.getElementsByName("fell asleep")[0].value,
      end_sleep: document.getElementsByName("woke up")[0].value,
      end_bed: document.getElementsByName("got out of bed")[0].value,
      awake: document.getElementsByName("awake")[0].value,
      description: document.getElementsByName("notes")[0].value,
      rating: document.getElementsByName("rating")[0].value
    };
    const formBody = Object.keys(details)
      .map(
        key => encodeURIComponent(key) + "=" + encodeURIComponent(details[key])
      )
      .join("&");
    fetch("/entries/test", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
      },
      body: formBody
    });
    this.props.onDiarySubmit(event);
  }

  handleOnChange(event) {
    //converts slider value to minutes
    const value = event.target.value;
    const newTimeIndex = event.currentTarget.getAttribute("event-order");

    //copy the state, edit, and reset state
    let newTimes = this.state.times.map(item => item);
    newTimes[newTimeIndex] = value;
    this.setState({
      times: newTimes
    });
  }

  handleWakeChange(event) {
    //convert slider value to minutes
    this.setState({
      wakeTime: event.target.value
    });
  }

  handleNotesChange(event) {
    this.setState({
      notes: event.target.value
    });
  }

  handleRatingChange(event) {
    this.setState({
      rating: event.target.value
    });
  }

  render() {
    //create array for less repeated code
    const sliderTexts = [
      "got into bed",
      "fell asleep",
      "woke up",
      "got out of bed",
      "were awake for in the night"
    ];

    return (
      <div className="row">
        <span hidden name="date">
          {this.props.date.toString()}
        </span>
        <div className="diary-entry col-lg-7 col-md-7 col-sm-7 col-xs-7">
          <h1>Sleep times</h1>

          {this.state.times.map((item, index) => {
            return (
              <div>
                <h3>{"Enter the time you " + sliderTexts[index]}</h3>
                <p className={"timeLabel timeLabel-" + index}>
                  {DateUtils.getNewHours(
                    this.props.date,
                    this.state.times[index]
                  )}
                </p>
                <input
                  className={"slider slider-" + index}
                  name={sliderTexts[index]}
                  type="range"
                  min="0"
                  max="288"
                  defaultValue={this.state.times[index]}
                  onChange={this.handleOnChange}
                  event-order={index}
                />
              </div>
            );
          })}

          <h3>{"Enter the time you " + sliderTexts[4]}</h3>
          <p className="wake-time-label">
            {DateUtils.formatWakeTime(this.state.wakeTime * 5)}
          </p>
          <input
            className="wake-time-slider"
            name="awake"
            type="range"
            min="0"
            max="288"
            defaultValue="0"
            onChange={this.handleWakeChange}
          />
          <h3>Enter any notes you have about your sleep</h3>
          <textarea
            className="notes"
            name="notes"
            cols="40"
            rows="5"
            onChange={this.handleNotesChange}
          />
        </div>

        <div className="overview col-lg-5 col-md-5 col-sm-5 col-xs-5">
          <hr />
          <h1>Overview</h1>
          <h3>How would you rate your sleep?</h3>
          <p>{this.state.rating + "/10"}</p>
          <input
            className="rating"
            name="rating"
            type="range"
            min="0"
            max="10"
            defaultValue="5"
            onChange={this.handleRatingChange}
          />
          <h3>Total time in bed</h3>
          <p>
            {DateUtils.subtractDates(
              this.props.date,
              this.state.times[0],
              this.state.times[3]
            )}
          </p>
          <h3>Total time asleep</h3>
          <p>
            {DateUtils.subtractDates(
              this.props.date,
              this.state.times[1],
              this.state.times[2] - this.state.wakeTime
            )}
          </p>
          <h3>Sleep efficiency</h3>
          <p>
            {Math.round(
              ((this.state.times[2] -
                this.state.times[1] -
                this.state.wakeTime) /
                (this.state.times[3] - this.state.times[0])) *
                100
            ) + "%"}
          </p>

          <div className="action-items">
            <button
              className="btn btn-dark"
              onClick={this.onSubmit}
              disabled={this.props.disableSubmit}
            >
              Submit
            </button>
            <button className="btn btn-dark" onClick={this.props.onDiaryCancel}>
              Cancel
            </button>
            <button className="btn btn-dark" onClick={this.props.onDiaryDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default DayEntry;
