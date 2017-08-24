import React, { Component } from 'react';
import { connect } from 'react-redux';

class List extends Component {
	render() {
		// console.log(this.props.history)
		return (
			<div className="List">
				List
				<p>{JSON.stringify(this.props.location)}</p>
			</div>
		);
	}
}

const mapStateToProps = (state,ownProps) => {
	return {
		appendText: state.text
	}
}

export default connect(mapStateToProps)(List);
