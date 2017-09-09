import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import {Editor, EditorState, RichUtils ,Modifier} from 'draft-js';
import './index.css'
import 'draft-js/dist/Draft.css'
// import {Icon,Button} from 'antd'
const HexColorItemList=['0','8','f'];
const DefaultColors=[];
for(var i=0;i<HexColorItemList.length;i++){
	for(var j=0;j<HexColorItemList.length;j++){
		for(var k=0;k<HexColorItemList.length;k++){
			var theColor='#'+HexColorItemList[i]+HexColorItemList[j]+HexColorItemList[k];
			DefaultColors.push(theColor)
		}
	}
}

class Index extends Component {
	constructor(props) {
		super(props);
		this.state = {
			editorState: EditorState.createEmpty(),
			colorGruopVisible:false
		};
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
	inlineStyleChange(style,e) {
		e.preventDefault()
		this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, style));
	}
	blockStyleChange(style,e){
		e.preventDefault()
		this.onChange(RichUtils.toggleBlockType(this.state.editorState, style));
	}
	colorChange(targetColor){
		const selection = this.state.editorState.getSelection();
		const nextContentState = DefaultColors.reduce((contentState, color) => {
		  return Modifier.removeInlineStyle(contentState, selection, color)
		}, this.state.editorState.getCurrentContent());
		
		let nextEditorState = EditorState.push(
			this.state.editorState,
			nextContentState,
			'change-inline-style'
		);

		const currentStyle = this.state.editorState.getCurrentInlineStyle();

		if (selection.isCollapsed()) {
	        nextEditorState = currentStyle.reduce((state, color) => {
	          return RichUtils.toggleInlineStyle(state, color);
	        }, nextEditorState);
	    }

	    if (!currentStyle.has(targetColor)) {
			nextEditorState = RichUtils.toggleInlineStyle(
				nextEditorState,
				targetColor
			);
		}

		this.onChange(nextEditorState)
	}
	toggleColorGroupVisible(e){
		e.preventDefault()
		this.setState({colorGruopVisible:!this.state.colorGruopVisible})
	}
	render() {
		const styleMap = {
			CODE: {
				backgroundColor: 'rgba(0, 0, 0, 0.05)',
				fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
				fontSize: 16,
				padding:'0 2px',
			},
		};
		for(var i=0;i<DefaultColors.length;i++){
			styleMap[DefaultColors[i]]={
				color:DefaultColors[i]
			}
		}
		return (
			<div className="DraftContainer" id="RouterIndex">
				<div className="ToolBar">
					{this.InlineStyleBtnGroup()}
					{this.BlockStyleBtnGroup()}
					{this.ColorSelect()}
				</div>
				<Editor
					ref="DraftEditor"
					editorState={this.state.editorState} 
					onChange={this.onChange}
					customStyleMap={styleMap}
					handleKeyCommand={this.handleKeyCommand.bind(this)}
					placeholder={'input some text'}
				/>
			</div>
		);
	}
	InlineStyleBtnGroup(){
		const InlineStyleList=[
			{ label: 'Bold', style:'BOLD'},
			{ label: 'Italic', style: 'ITALIC' },
		    { label: 'Underline', style: 'UNDERLINE' },
		    { label: 'Monospace', style: 'CODE' },
		]
		const inlineStyle=this.state.editorState.getCurrentInlineStyle();
		return <div className="inline-style">	
			{InlineStyleList.map(item=>{
				return (
					<span
						key={item.style}
						className={inlineStyle.has(item.style)?'active '+item.label:item.label}
						onMouseDown={this.inlineStyleChange.bind(this,item.style)}>
						{item.label}
					</span>
				)
			})}
		</div>
	}
	BlockStyleBtnGroup(){
		const BlockStyleList=[
			{label: 'H1', style: 'header-one'},
	        {label: 'H2', style: 'header-two'},
	        {label: 'H3', style: 'header-three'},
	        // {label: 'H4', style: 'header-four'},
	        // {label: 'H5', style: 'header-five'},
	        // {label: 'H6', style: 'header-six'},
	        // {label: 'Blockquote', style: 'blockquote'},
	        // {label: 'UL', style: 'unordered-list-item'},
	        // {label: 'OL', style: 'ordered-list-item'},
	        // {label: 'Code Block', style: 'code-block'},
		]
		const selection = this.state.editorState.getSelection();
        const blockType = this.state.editorState
			.getCurrentContent()
			.getBlockForKey(selection.getStartKey())
			.getType();

		return <div className="block-style">
			{BlockStyleList.map(item=>{
				return (
					<span
						key={item.label}
						className={item.style === blockType?'active':''}
						onMouseDown={this.blockStyleChange.bind(this,item.style)}>
						{item.label}
					</span>
				)
			})}
		</div>
	}

	ColorSelect(){
		const Colors=DefaultColors;
		const inlineStyle=this.state.editorState.getCurrentInlineStyle();
		return (
			<div className="color-select">
				<div className="target-color" onMouseDown={this.toggleColorGroupVisible.bind(this)}>
					{Colors.map(item=>{
						if(inlineStyle.has(item)){
							return (
								<span
									key={item}
									style={{background:item}}>
								</span>
							)
						}else{
							return ''
						}
					})}
				</div>
				<div 
					className={this.state.colorGruopVisible?'color-group':'hide color-group'}
					onMouseDown={this.toggleColorGroupVisible.bind(this)}>
					{Colors.map(item=>{
						return (
							<span
								key={item}
								// className={inlineStyle.has(item)?'active '+item.label:item.label}
								onMouseDown={this.colorChange.bind(this,item)}
								style={{
									background:item
								}}>
							</span>
						)
					})}
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state,ownProps) => {
	return {
		appendText: state.text
	}
}

export default connect(mapStateToProps)(Index);
