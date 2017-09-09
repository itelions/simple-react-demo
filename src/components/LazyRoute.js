import React, { Component } from 'react'
import { Route } from 'react-router-dom'

class Bundle extends Component {

    constructor(props) {
        super(props)
        this.state = {
            mod: null
        }
    }

    componentWillMount() {
        this.load(this.props)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.load !== this.props.load) {
            this.load(nextProps)
        }
    }

    load(props) {
        if(props.load() instanceof Promise) {
            props.load().then(module => {
                this.setState({
                    mod: module.default
                })
            })
        }else {
            this.setState({
                mod: props.load
            })
        }
    }

    render() {
        return this.state.mod ? this.props.children(this.state.mod) : null
    }
}

const LazyRoute = ({component, ...rest}) => {

    let module = () => (
        <Bundle load={component}>
            {Component => <Component />}
        </Bundle>
    )

    return <Route {...rest} component={module} />
}

export default LazyRoute