import React from "react";
import "./day_entry.css";
import DateUtils from "../../utils/time.js";

class DayEntry extends React.Component {
  constructor(props) {
    super(props);

    this.sliderTexts = [
      "got into bed",
      "fell asleep",
      "woke up",
      "got out of bed"
    ];

    this.state = {
      times: [66, 78, 168, 186],
      wakeTime: 0,
      rating: 5,
      notes: ""
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onDelete = this.onDelete.bind(this);

    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleWakeChange = this.handleWakeChange.bind(this);
    this.handleRatingChange = this.handleRatingChange.bind(this);
    this.handleNotesChange = this.handleNotesChange.bind(this);
  }

  onDelete(event) {
    var payload = {
      date: new Date(document.getElementsByName("date")[0].innerHTML)
    };

    const formBody = Object.keys(payload)
      .map(
        key => encodeURIComponent(key) + "=" + encodeURIComponent(payload[key])
      )
      .join("&");

    fetch("/entries/entry", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
      },
      body: formBody
    });

    this.props.onDiaryDelete(event);
  }

  onSubmit(event) {
    //create payload
    var payload = {
      uid: Number(document.getElementsByName("uid")[0].innerHTML),
      date: new Date(document.getElementsByName("date")[0].innerHTML),
      start_bed: document.getElementsByName("got into bed")[0].value,
      start_sleep: document.getElementsByName("fell asleep")[0].value,
      end_sleep: document.getElementsByName("woke up")[0].value,
      end_bed: document.getElementsByName("got out of bed")[0].value,
      awake: document.getElementsByName("awake")[0].value,
      description: document.getElementsByName("notes")[0].value,
      rating: document.getElementsByName("rating")[0].value
    };

    const formBody = Object.keys(payload)
      .map(
        key => encodeURIComponent(key) + "=" + encodeURIComponent(payload[key])
      )
      .join("&");

    fetch("/entries/entry", {
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

  componentDidMount() {
    const url =
      "/entries/entry/" + encodeURIComponent(this.props.date.toString());

    fetch(url)
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then(err => {
            throw Error(err);
          });
        }
      })
      .then(entry => {
        if (!entry) return;

        // Set entry values
        let newState = this.state;

        newState.times[0] = entry.start_bed;
        newState.times[1] = entry.start_sleep;
        newState.times[2] = entry.end_sleep;
        newState.times[3] = entry.end_bed;
        newState.wakeTime = entry.awake;
        newState.notes = entry.description;
        newState.rating = entry.rating;

        this.setState(newState);
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentDidUpdate() {
    this.sliderTexts.forEach((sliderText, index) => {
      document.getElementsByName(sliderText)[0].value = this.state.times[index];
    });
    document.getElementsByName("awake")[0].value = this.state.wakeTime;
    document.getElementsByName("rating")[0].value = this.state.rating;
    document.getElementsByName("notes")[0].value = this.state.notes;
  }

  render() {
    return (
      <div className="row">
        <span hidden name="date">
          {this.props.date.toString()}
        </span>
        <span hidden name="uid">
          {"10155988094031140"}
        </span>
        <div className="diary-entry col-lg-7 col-md-7 col-sm-7 col-xs-7">
          <h1>Sleep times</h1>

          {this.state.times.map((item, index) => {
            return (
              <div>
                <h3>{"Enter the time you " + this.sliderTexts[index]}</h3>
                <p className={"timeLabel timeLabel-" + index}>
                  {DateUtils.getNewHours(
                    this.props.date,
                    this.state.times[index]
                  )}
                </p>
                <input
                  className={"slider slider-" + index}
                  name={this.sliderTexts[index]}
                  type="range"
                  min="0"
                  max="288"
                  value={this.state.times[index]}
                  onChange={this.handleOnChange}
                  event-order={index}
                />
              </div>
            );
          })}

          <h3>Enter the time you were awake for in the night</h3>
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
            <button className="btn btn-dark" onClick={this.onDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default DayEntry;
