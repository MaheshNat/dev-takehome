import axiosDefaults from 'axios/lib/defaults';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { loadUser } from './actions/authActions';
import Home from './components/Home';
import Login from './components/Login';
import Navigation from './components/Navigation';
import Register from './components/Register';
import TodosPage from './components/TodosPage';
import rootReducer from './reducers/rootReducer';
axiosDefaults.baseURL = 'https://bofg-takehome-mahesh.herokuapp.com/';
// axiosDefaults.baseURL = 'http://localhost:8080';

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
