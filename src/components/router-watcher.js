import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';


class RouterWatcher extends Component {
	render() {
		return (
			<div  className="routerInfo">
				<p>当前路径:&lt;{this.watchRouter()}&gt;</p>
			</div>
		);
	}
    watchRouter(){
		if(this.props.RouterChange)this.props.RouterChange(this.props.location.pathname);
		
        return this.props.location.pathname;
    }
}

export default withRouter(RouterWatcher)