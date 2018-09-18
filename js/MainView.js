'use strict';

import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {
  ViroARScene,
  ViroText,
  ViroImage,
} from 'react-viro';
import * as utils from '../utils.js';
import data from '../data.json';

export default class MainView extends Component {

  constructor() {
    super();

    this.state = {
      data: {},
      latitude: null,
      longitude: null,
      error: null
    };
  }

  render() {
    if (Object.keys(this.state.data).length > 0) {
      console.log(this.state)
     return  <ViroARScene>
          {Object.keys(this.state.data).map(businessId => {
            return <ViroText key={'p' + businessId} text={this.state.data[businessId].name} scale={[18, 18, 18]} transformBehaviors={["billboard"]} position={[this.state.data[businessId].x, 18, this.state.data[businessId].z]} style={styles.helloWorldTextStyle} />
          })} 
          {Object.keys(this.state.data).map(businessId => {
            return <ViroImage key={businessId} source={{ uri: 'https://www.freeiconspng.com/uploads/fork-and-knife-22.png' }} scale={[18, 18, 18]} transformBehaviors={["billboard"]} position={[this.state.data[businessId].x, 0, this.state.data[businessId].z]} />
          })} 
          </ViroARScene>
    } else return <ViroARScene>
      <ViroText text='Loading...' scale={[1, 1, 1]} transformBehaviors={["billboard"]} position={[0, 0, -2]} />
    </ViroARScene>
  }

  componentDidMount() {
    Geolocation.getCurrentPosition(
      (position) => {
        const businesses = {}
        data.businesses.forEach(business => {
          if (business.distance < 100) {
          var point = utils.transformPointToAR(position.coords.latitude, position.coords.longitude, business.coordinates.latitude, business.coordinates.longitude);
          businesses[business.id] = {
            x: point.x,
            z: point.z,
            name: business.name
          }
        }
        })
        this.setState({
          data: businesses,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
          string: String(position.coords.latitude)
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 2000, maximumAge: 2000 },
    )
    }
}

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 20,
    color: '#000000',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

