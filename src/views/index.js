import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

class Index extends Component {
	constructor(props){
		super(props)
	}
	componentDidMount(){
		console.log(this.props)
	}
	render() {
		return (
			<div className="Index">Index</div>
		);
	}
}

const mapStateToProps = (state,ownProps) => {
	return {
		appendText: state.text
	}
}

export default connect(mapStateToProps)(Index);
