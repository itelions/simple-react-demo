import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

class Detail extends Component {
	render() {
		return (
			<div className="no-found">404</div>
		);
	}
}

const mapStateToProps = (state,ownProps) => {
	return {
		appendText: state.text
	}
}

export default connect(mapStateToProps)(Detail);
