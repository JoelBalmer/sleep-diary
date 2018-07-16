import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

const keys = require("./config/keys");
let passport = require("passport"),
  FacebookStrategy = require("passport-facebook").Strategy;

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
