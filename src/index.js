import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import Index from './views/index';
import { createStore,combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { setter } from './reducers/setter.js';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import { HashRouter as Router, Route } from 'react-router-dom'//BrowserRouter

const reducers=combineReducers({setter})
let store = createStore(reducers);

ReactDOM.render(
    <Provider store={store}>
        <Router>
           <Route path="/" component={App}></Route>
        </Router>
    </Provider>, 
    document.getElementById('root')
);

registerServiceWorker();
