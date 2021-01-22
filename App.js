import React from 'react';
// import { AppNavigator } from './src/navigations/AppNavigator';
import LoginNavigator from './src/navigations/LoginNavigator'

import thunkMiddleware from 'redux-thunk';
import reducer from './src/reducers/index';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';


const middleware = applyMiddleware(thunkMiddleware);
const store = createStore(reducer, middleware);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <LoginNavigator />
      </Provider>
    );
  }
}