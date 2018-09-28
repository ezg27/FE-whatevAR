import React, { Component } from 'react';
import key from './config.js';
import { ViroARSceneNavigator } from 'react-viro';
import MainView from './js/MainView.js';
import Error from './js/Error.js';
import Geolocation from 'react-native-geolocation-service';
import { Dimensions, StyleSheet, View, Text } from 'react-native';
import BusinessModal from './js/BusinessModal.js';
import LoadingPage from './js/LoadingPage.js';

const sharedProps = {
  apiKey: key
};
const UNSET = 'UNSET';
const defaultNavigatorType = UNSET;
console.disableYellowBox = true;

export default class ViroSample extends Component {
  state = {
    navigatorType: defaultNavigatorType,
    sharedProps: sharedProps,
    openModal: {
      id: null,
      name: null
    },
    loadingPage: true,
    error: false,
    data: null
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.state.error ? (
          <Error displayError={this._displayError} />
        ) : !this.state.openModal.id && this.state.data === null ? (
          <LoadingPage />
        ) : this.state.openModal.id && !this.state.loadingPage ? (
          <BusinessModal
            closeModal={this._closeModal}
            business={this.state.openModal}
            displayError={this._displayError}
          />
        ) : (
          <ViroARSceneNavigator
            {...this.state.sharedProps}
            initialScene={{ scene: MainView }}
            worldAlignment="GravityAndHeading"
            viroAppProps={{
              openModal: this._openModal,
              data: this.state.data,
              displayError: this._displayError
            }}
          />
        )}
        {!this.state.openModal.id &&
        !this.state.loadingPage &&
        !this.state.error ? (
          <View style={styles.crosshair} />
        ) : null}
      </View>
    );
  }

  componentDidMount() {
    this._fetchData();
    setTimeout(() => {
      this.setState({
        loadingPage: false
      });
    }, 2000);
  }

  _fetchData = () => {
    Geolocation.getCurrentPosition(
      position => {
        fetch(
          `https://0p83k3udwg.execute-api.us-east-1.amazonaws.com/dev/api/device/businesses/${
            position.coords.latitude
          }/${position.coords.longitude}`
        )
          .then(buffer => buffer.json())
          .then(res => {
            if (res.message) {
              this.setState({ error: true });
            } else {
              const filteredRes = {};
              for (let k in res) {
                if (res[k].distance < 70) {
                  filteredRes[k] = res[k];
                }
              }
              this.setState({ data: filteredRes });
            }
          });
      },
      error => this.setState({ error: true }),
      { enableHighAccuracy: true, timeout: 2000, maximumAge: 2000 }
    );
  };
  _exitViro = () => {
    this.setState({
      navigatorType: UNSET
    });
  };

  _openModal = (businessId, businessName) => {
    this.setState({
      openModal: {
        id: businessId,
        name: businessName
      }
    });
  };

  _closeModal = () => {
    this.setState({ openModal: { id: null, name: null } });
  };

  _displayError = () => {
    this._fetchData();
    this.setState({ error: !this.state.error });
  };
}

const styles = StyleSheet.create({
  crosshair: {
    position: 'absolute',
    top: Dimensions.get('window').height / 2 - 10,
    left: Dimensions.get('window').width / 2 - 10,
    width: 15,
    height: 15,
    borderRadius: 15,
    borderWidth: 1,
    backgroundColor: '#ffebee'
  },
  buttonText: {
    fontFamily: 'Avenir',
    color: '#1D976C',
    textAlign: 'center',
    fontSize: 25,
    textAlignVertical: 'center'
  },
  button: {
    height: 25,
    width: '33%',
    marginTop: 40,
    marginBottom: 10,
    borderRadius: 10,
    marginLeft: '33%',
    marginRight: '33%'
  }
});
