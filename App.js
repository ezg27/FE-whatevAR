import React, { Component } from 'react';
import key from './config.js';
import { ViroARSceneNavigator } from 'react-viro';
import InitialARScene from './js/MainView.js';

const sharedProps = {
  apiKey: key
};
const UNSET = 'UNSET';
const defaultNavigatorType = UNSET;

export default class ViroSample extends Component {
  constructor() {
    super();

    this.state = {
      navigatorType: defaultNavigatorType,
      sharedProps: sharedProps
    };
    this._exitViro = this._exitViro.bind(this);
  }

  render() {
    return (
      <ViroARSceneNavigator
        {...this.state.sharedProps}
        initialScene={{ scene: InitialARScene }}
        worldAlignment="GravityAndHeading"
      />
    );
  }

  _exitViro() {
    this.setState({
      navigatorType: UNSET
    });
  }
}
