import React, { Component } from 'react';
import key from './config.js';
import { ViroARSceneNavigator } from 'react-viro';
import InitialARScene from './js/MainView.js';
import { Dimensions, StyleSheet, View } from 'react-native';

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
      <View style={{ flex: 1 }}>
      <ViroARSceneNavigator
        {...this.state.sharedProps}
        initialScene={{ scene: InitialARScene }}
        worldAlignment="GravityAndHeading"
      />
      <View style={styles.crosshair}/>
        </View>
    );
  }

  _exitViro() {
    this.setState({
      navigatorType: UNSET
    });
  }
}

const styles = StyleSheet.create({
  crosshair: {
      position: 'absolute',
      top: (Dimensions.get('window').height / 2),
      left: (Dimensions.get('window').width / 2),
      width: 20,
      height: 20,
      borderRadius: 15,
      borderWidth: 1,
      backgroundColor: 'grey',
  },
})
