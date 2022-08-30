import React, { Component } from 'react';
import TodosPage from './components/TodosPage';
import Navigation from './components/Navigation';
import Login from './components/Login';
import Home from './components/Home';
import { BrowserRouter, Route } from 'react-router-dom';
import { loadUser } from './actions/authActions';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers/rootReducer';
import thunk from 'redux-thunk';
import Register from './components/Register';
import { composeWithDevTools } from 'redux-devtools-extension';
import axiosDefaults from 'axios/lib/defaults';
// axiosDefaults.baseURL = 'https://p0st-master.herokuapp.com/';
axiosDefaults.baseURL = 'http://localhost:8080';

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Navigation />
          <div className="container">
            <Route path="/" exact component={Home} />
            <Route path="/todos" component={TodosPage} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
