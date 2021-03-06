import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button,Icon,Input } from 'antd';
class Test extends Component {

	constructor(props) {
    	super(props);
    	this.state={
    		borderStyle:'1px solid #aaa',
    		inputValue:'defaultValue'
    	}
	}
	// componentWillUpdate({tester},nextState){
	// 	this.setState({'inputValue':tester});
	// }

	render() {
		return (
			<div>
				<Input type='text' id="addtext" style={{
					marginRight:'10px',
					height:'28px',
					borderRadius:'4px',
					width:'150px',
					// border:this.state.borderStyle
				}}/>
				<Button type="primary" onClick={e => this.handleClick(e)}>
					StateChange
					<Icon type="edit" />
       			</Button>
       			{this.props.children}
			</div>
		)
	}
	handleClick(e) {
		const node = document.getElementById('addtext');
		const text = node.value;
		this.props.onIncreaseClick(text);
		node.value = '';
	}
}

function mapStateToProps(state){
	return {
		text:state.setter.text
	}
}

function mapDispatchToProps(dispatch){
	return {
		onIncreaseClick: (text) => dispatch({type:'ADD',text:text})
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Test)