import React, { Component } from 'react';
import logo from './logo.svg';

import './App.css';
import { Button,Steps } from 'antd';

import Test from './components/test';
import RouterWatcher from './components/router-watcher';
import { connect } from 'react-redux';
import { Link ,Switch ,Redirect } from 'react-router-dom'
import LazyRoute from './components/LazyRoute'

const Step=Steps.Step
class App extends Component {
	constructor(props){
		super(props);
		this.state={
			aNumber:123,
			bNumber:789,
			step:parseInt(Math.random()*3,10)
		}
	}
	componentDidMount(){
		// setInterval(_=>{
		// 	this.setState({step:parseInt(Math.random()*3,10)})
		// },2000)

		// 使用scriptjs引入远程js文件 同样可以作为jsonp请求工具
		// $script('http://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js',_=>{
		// 	console.log(window.$)
		// })
	}
	// componentWillMount(){}
	render() {
		return (
			<div className="App">
				<div className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h2>Welcome to React</h2>
				</div>
				<p className="App-intro">To get started, edit <code>src/App.js</code> and save to reload.</p>
				<Steps current={this.state.step}>
					<Step title="Finished" description="This is a description." />
					<Step title="In Progress" description="This is a description." />
					<Step title="Waiting" description="This is a description." />
				</Steps>
				<p className="showState">Redux state.setter.text={this.props.appendText}</p>
				<Test tester={this.state.aNumber}>
					<div>组件嵌套测试节点1</div>
					<div>组件嵌套测试节点2</div>
				</Test>
				<RouterWatcher/>
				<ul>{this.navList()}</ul>
				
				<div className="views">
					<p>当前路由 : </p>
					{this.routeView()}
				</div>
			</div>
		);
	}
	routeView(){
		const redirect='/404';

		return (
			<Switch>
				<LazyRoute path='/index' component={()=>import('./views/index')}/>
				<LazyRoute path='/index/:user_id' component={()=>import('./views/index')}/>
				<LazyRoute path='/list' component={()=>import('./views/list')}/>
				<LazyRoute path='/detail' component={()=>import('./views/detail')}/>
				<LazyRoute path='/404' component={()=>import('./views/error')}/>
				<Redirect to={redirect}/>
			</Switch>
		)
	}
	navList(){
		var navList=[
			{link:'/index/user_a?time_set=12321',name:'index'},
			{link:'/list',name:'list'},
			{link:'/detail',name:'detail'}
		]
		return navList.map((item,idx)=>{
			return (
				<li key={idx} style={{
					display:'inline'
				}}>
					<Link to={item.link}><Button>{item.name}</Button></Link>
				</li>
			)
		})	
	}
}

const mapStateToProps = (state,ownProps) => {
	return {
		appendText: state.setter.text
	}
}

export default connect(mapStateToProps)(App);
