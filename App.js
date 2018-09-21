import React, { Component } from 'react';
import key from './config.js';
import { ViroARSceneNavigator } from 'react-viro';
import MainView from './js/MainView.js';
import Error from './js/Error.js';
import { Dimensions, StyleSheet, View } from 'react-native';
import BusinessModal from './js/BusinessModal.js';
import LoadingPage from './js/LoadingPage.js';

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
      openModal: {
        id: null,
        name: null
      },
      loadingPage: true,
      error: false
    };
    this._exitViro = this._exitViro.bind(this);
    this._openModal = this._openModal.bind(this);
    this._closeModal = this._closeModal.bind(this);
    this._displayError = this._displayError.bind(this);
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        { this.state.error ? <Error displayError={this._displayError}/> :
          !this.state.openModal.id && this.state.loadingPage ? <LoadingPage /> :
          this.state.openModal.id && !this.state.loadingPage ?
            <BusinessModal closeModal={this._closeModal} business={this.state.openModal} displayError={this._displayError} /> :
            <ViroARSceneNavigator
              {...this.state.sharedProps}
              initialScene={{ scene: MainView }}
              worldAlignment="GravityAndHeading"
              viroAppProps={{ openModal: this._openModal, displayError: this._displayError }}
            />}
        {!this.state.openModal.id && !this.state.loadingPage && !this.state.error ? <View style={styles.crosshair} /> : null}
      </View>
    );
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        loadingPage: false
      })
    }, 2000)
  }

  _exitViro() {
    this.setState({
      navigatorType: UNSET
    });
  }

  _openModal(businessId, businessName) {
    this.setState({
      openModal: {
        id: businessId,
        name: businessName
      }
    })
  }

  _closeModal() {
    this.setState({ openModal: {id: null, name: null } })
  }

  _displayError() {
    this.setState({ error: !this.state.error })
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