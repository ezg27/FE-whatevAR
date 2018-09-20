'use strict';

import React, { Component } from 'react';
import Card from './Card.js';
import Geolocation from 'react-native-geolocation-service';
import {
  ViroARScene,
  ViroText,
  ViroImage
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
      error: null,
      onHoverId: null,
      isHovering: false
    };

    this._saveBusinessId = this._saveBusinessId.bind(this);
    this._openAppModal = this._openAppModal.bind(this);
  }

  render() {
    const bars = ['Bars', 'Cocktail Bars', 'Australian', 'Pubs', 'Lounges', 'Wine Bars', 'Champagne Bars', 'Sports Bars', 'Cinema'];
    const restaurants = ['Restaurants', 'Cafes', 'British', 'Food Stands', 'Breakfast & Brunch', 'Sandwiches', 'Pizza', 'Italian', 'Burgers', 'American (New)', 'Mexican', 'Chicken Shop', 'Salad', 'Japanese', 'Asian Fusion', 'Indian', 'Desserts', 'French', 'Vietnamese', 'Street Vendors', 'American (Traditional)', 'Fish & Chips'];
    if (Object.keys(this.state.data).length > 0) {
      return <ViroARScene>
        {Object.keys(this.state.data).map(businessId => {
          const barSrc = require('./res/cocktail.png');
          const restaurantSrc = require('./res/icons8-meal-64.png');
          const questionMark = require('./res/question-mark.jpg');
          const distance = this.state.data[businessId].distance
          return <ViroImage key={businessId} onClick={() => this._openAppModal(businessId)} 
          onHover={() => { this._saveBusinessId(businessId) }} 
          source={restaurants.includes(this.state.data[businessId].mainCategory) ? restaurantSrc : bars.includes(this.state.data[businessId].mainCategory) ? barSrc : questionMark} 
          scale={distance < 50 ? [10, 10, 10] : [18, 18, 18]} transformBehaviors={['billboard']} 
          position={[this.state.data[businessId].x, distance < 50 ? 8 : distance < 110 ? 10 : 33, this.state.data[businessId].z]} />
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
        const businesses = {}
        data.businesses.forEach(business => {
          if (business.distance < 100) {
            var point = utils.transformPointToAR(position.coords.latitude, position.coords.longitude, business.coordinates.latitude, business.coordinates.longitude);
            let categories = ''
            business.categories.forEach((cat, index) => {
              if (index < 3) {
                if (index !== business.categories.length - 1) categories += cat.title + ', ';
                else categories += cat.title;
              }
            })
            businesses[business.id] = {
              x: point.x,
              z: point.z,
              name: business.name,
              category: categories,
              rating: business.rating * 2,
              distance: Math.floor(business.distance),
              price: business.price,
              mainCategory: business.categories[0].title
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

  _saveBusinessId(businessId) {
    this.setState({ onHoverId: businessId, isHovering: !this.state.isHovering })
  }

  _openAppModal(businessId) {
    this.props.arSceneNavigator.viroAppProps.openModal(businessId)
}
}

