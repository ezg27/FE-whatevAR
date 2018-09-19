import React, { Component } from 'react';
import key from './config.js';
import { ViroARSceneNavigator } from 'react-viro';
import MainView from './js/MainView.js';
import { Dimensions, StyleSheet, View } from 'react-native';
import BusinessModal from './js/BusinessModal.js';

const sharedProps = {
  apiKey: key
};
const UNSET = 'UNSET';
const defaultNavigatorType = UNSET;
console.disableYellowBox = true;

export default class ViroSample extends Component {
  constructor() {
    super();

    this.state = {
      navigatorType: defaultNavigatorType,
      sharedProps: sharedProps,
      openModal: null
    };
    this._exitViro = this._exitViro.bind(this);
    this._openModal = this._openModal.bind(this);
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
     {!this.state.openModal ? <ViroARSceneNavigator
        {...this.state.sharedProps}
        initialScene={{ scene: MainView }}
        worldAlignment="GravityAndHeading"
        viroAppProps={{openModal: this._openModal}}
      /> : <BusinessModal/>}
      {!this.state.openModal ? <View style={styles.crosshair}/> : null}
        </View>
    );
  }

  _exitViro() {
    this.setState({
      navigatorType: UNSET
    });
  }

  _openModal(businessId) {
    this.setState({ openModal: businessId })
  }
}

const styles = StyleSheet.create({
  crosshair: {
      position: 'absolute',
      top: (Dimensions.get('window').height / 2),
      left: (Dimensions.get('window').width / 2),
      width: 15,
      height: 15,
      borderRadius: 15,
      borderWidth: 1,
      backgroundColor: '#ffebee'
  },
})