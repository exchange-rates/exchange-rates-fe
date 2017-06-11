import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducer from './reducers/reducers';
import Layout from './components/Layout';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.store = createStore(reducer, {}, applyMiddleware(ReduxThunk));
  }

  render() {
    return (
      <Provider store={this.store}>
        <Layout dispatch={this.store.dispatch} />
      </Provider>
    );
  }
}
