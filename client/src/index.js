import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

// //SERVER SETUP
// var express = require("express");
// var app = express();
// var port = process.env.PORT || 5000;
// var server = app.listen(port);
// app.use(express.static("public"));
// console.log("Server is running on port: " + port);

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
