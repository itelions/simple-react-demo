import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import {Editor, EditorState, RichUtils} from 'draft-js';
import './list.css'
import 'draft-js/dist/Draft.css'
import {Icon,Button} from 'antd'

class Index extends Component {
	constructor(props) {
		super(props);
		this.state = {editorState: EditorState.createEmpty()};
		this.onChange = (editorState) => this.setState({editorState});
	}
	handleKeyCommand(command) {
		const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
			if (newState) {
				this.onChange(newState);
			return 'handled';
		}
		return 'not-handled';
	}
	_onBoldClick() {
		this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
		setTimeout(_=>{this.refs.DraftEditor.focus()})
	}
	render() {
		return (
			<div className="DraftContainer" id="RouterIndex">
				<div className="EditorTitle">draft.js</div>
				<div>
					<Button	onClick={this._onBoldClick.bind(this)}>
						<Icon type="plus" />
					</Button>
				</div>
				<Editor
					ref="DraftEditor"
					editorState={this.state.editorState} 
					onChange={this.onChange}
					handleKeyCommand={this.handleKeyCommand.bind(this)}
					placeholder={'input some text'}
				/>
			</div>
		);
	}
}

const mapStateToProps = (state,ownProps) => {
	return {
		appendText: state.text
	}
}

export default connect(mapStateToProps)(Index);
