import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk'
import reducer from './reducers/reducers';
import Layout from './components/Layout';

const store = createStore(reducer, {}, applyMiddleware(ReduxThunk));

export default class App extends Component {
  render() {
    return <Provider store={store}>
      <Layout dispatch={store.dispatch} />
    </Provider>;
  }
}
