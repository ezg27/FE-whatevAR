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
      error: null,
      onHoverId: null,
      isHovering: false
    };

    this._saveBusinessId = this._saveBusinessId.bind(this);
    this._openAppModal = this._openAppModal.bind(this);
  }

  render() {
    const bars = ['Bars', 'Cocktail Bars', 'Australian', 'Pubs', 'Lounges', 'Wine Bars', 'Champagne Bars', 'Sports Bars', 'Cinema', 'Dance Clubs'];
    const restaurants = ['Restaurants', 'Cafes', 'Portuguese', 'British', 'Food Stands', 'Breakfast & Brunch', 'Sandwiches', 'Pizza', 'Italian', 'Burgers', 'American (New)', 'Mexican', 'Chicken Shop', 'Salad', 'Japanese', 'Asian Fusion', 'Indian', 'Desserts', 'French', 'Vietnamese', 'Street Vendors', 'American (Traditional)', 'Fish & Chips', 'Chinese'];
    if (Object.keys(this.state.data).length > 0) {
      return <ViroARScene>
        {Object.keys(this.state.data).map(businessId => {
          const barSrc = require('./res/cocktail.png');
          const restaurantSrc = require('./res/icons8-meal-64.png');
          const questionMark = require('./res/question-mark.png');
          const distance = this.state.data[businessId].distance
          return <ViroImage key={businessId} onClick={() => this._openAppModal(businessId)} 
          onHover={() => { this._saveBusinessId(businessId) }} 
          source={restaurants.includes(this.state.data[businessId].categories[0]) ? restaurantSrc : bars.includes(this.state.data[businessId].categories[0]) ? barSrc : questionMark} 
          scale={distance < 50 ? [10, 10, 10] : [18, 18, 18]} transformBehaviors={['billboard']} 
          position={[this.state.data[businessId].position[0], distance < 50 ? 8 : distance < 110 ? 10 : 33, this.state.data[businessId].position[2]]} />
        })}
        {this.state.isHovering ? <Card business={this.state.data[this.state.onHoverId]} /> : null}
      </ViroARScene>
    } else return <ViroARScene>
      <ViroText text='Loading...' scale={[1, 1, 1]} transformBehaviors={['billboard']} position={[0, 0, -2]} />
    </ViroARScene>
  }

  componentDidMount() {
    Geolocation.getCurrentPosition(
      (position) => {
       //this.setState({ data })
        fetch(`https://0p83k3udwg.execute-api.us-east-1.amazonaws.com/dev/api/device/businesses/${position.coords.latitude}/${position.coords.longitude}`)
         .then(buffer => buffer.json())
         .then(res => {
           console.log(res)
          const filteredRes = {}
          for (let k in res) {
            if (res[k].distance < 150) {
              filteredRes[k] = res[k]
            }
          }
           this.setState({ data: filteredRes })
          });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 2000, maximumAge: 2000 },
    )
  }

  _saveBusinessId(businessId) {
    this.setState({ onHoverId: businessId, isHovering: !this.state.isHovering })
  }

  _openAppModal(businessId) {
    this.props.arSceneNavigator.viroAppProps.openModal(businessId, this.state.data[businessId].name)
}
}

