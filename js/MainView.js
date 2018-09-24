'use strict';

import React, { Component } from 'react';
import Card from './Card.js';
import Geolocation from 'react-native-geolocation-service';
import {
  ViroARScene,
  ViroText,
  ViroImage
} from 'react-viro';
import data from '../testData.json';

export default class MainView extends Component {

  constructor() {
    super();

    this.state = {
      data: {},
      latitude: null,
      longitude: null,
      error: false,
      onHoverId: null,
      isHovering: false
    };

    this._saveBusinessId = this._saveBusinessId.bind(this);
    this._openAppModal = this._openAppModal.bind(this);
    this._redirectToApp = this._redirectToApp.bind(this);
  }

  render() {
    const bars = ['Bars', 'Cocktail Bars', 'Australian', 'Pubs', 'Lounges', 'Wine Bars', 'Champagne Bars', 'Sports Bars', 'Cinema', 'Dance Clubs'];
    const restaurants = ['Restaurants', 'Cafes', 'Portuguese', 'British', 'Food Stands', 'Breakfast & Brunch', 'Sandwiches', 'Pizza', 'Italian', 'Burgers', 'American (New)', 'Mexican', 'Chicken Shop', 'Salad', 'Japanese', 'Asian Fusion', 'Indian', 'Desserts', 'French', 'Vietnamese', 'Street Vendors', 'American (Traditional)', 'Fish & Chips', 'Chinese'];
    if (Object.keys(this.state.data).length > 0) {
      const restaurantColor = '#93f9b9';
      const barColor = '#81d4fa';
      return <ViroARScene>
        {Object.keys(this.state.data).map(businessId => {
          const barSrc = require('./res/whatevAr-bar.png');
          const restaurantSrc = require('./res/whatevAr-food.png');
          const questionMark = require('./res/question-mark.png');
          const distance = this.state.data[businessId].distance;
          return <ViroImage key={businessId} onClick={() => this._openAppModal(businessId)}
            onHover={() => { this._saveBusinessId(businessId) }}
            source={restaurants.includes(this.state.data[businessId].categories[0]) ? restaurantSrc : bars.includes(this.state.data[businessId].categories[0]) ? barSrc : questionMark}
            scale={[distance / 5, distance / 5, distance / 5]}
            transformBehaviors={['billboard']}
            position={[this.state.data[businessId].position[0], distance / 6, this.state.data[businessId].position[2]]} />
        })}
        {this.state.isHovering ? <Card color={restaurants.includes(this.state.data[this.state.onHoverId].categories[0]) ? restaurantColor : barColor} business={this.state.data[this.state.onHoverId]} /> : null}
      </ViroARScene>
    } else return <ViroARScene>
      <ViroText text='Loading...' scale={[1, 1, 1]} transformBehaviors={['billboard']} position={[0, 0, -2]} />
    </ViroARScene>
  }

  componentDidMount() {
    Geolocation.getCurrentPosition(
      (position) => {
        // const filteredRes = {}
        // for (let k in data) {
        //   if (data[k].distance < 120) {
        //     filteredRes[k] = data[k]
        //   }
        // }
        // this.setState({ data: filteredRes })
        fetch(`https://0p83k3udwg.execute-api.us-east-1.amazonaws.com/dev/api/device/businesses/${position.coords.latitude}/${position.coords.longitude}`)
          .then(buffer => buffer.json())
          .then(res => {
            if (res.message) {
              this.setState({ error: true }, () => this._redirectToApp())
            } else {
              const filteredRes = {}
              for (let k in res) {
                if (res[k].distance < 150) {
                  filteredRes[k] = res[k]
                }
              }
              this.setState({ data: filteredRes })
            }
          });
      },
      (error) => this.setState({ error: true }),
      { enableHighAccuracy: true, timeout: 2000, maximumAge: 2000 },
    )
  }

  _saveBusinessId(businessId) {
    this.setState({ onHoverId: businessId, isHovering: !this.state.isHovering })
  }

  _openAppModal(businessId) {
    this.props.arSceneNavigator.viroAppProps.openModal(businessId, this.state.data[businessId].name)
  }

  _redirectToApp() {
    this.props.arSceneNavigator.viroAppProps.displayError()
  }
}

