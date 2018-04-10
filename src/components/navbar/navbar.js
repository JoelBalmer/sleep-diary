import "./navbar.css";
import React from "react";

class Navbar extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="nav-bar menu">
				<h1>{this.props.title}</h1>
			</div>
		);
	}
}

export default Navbar;
