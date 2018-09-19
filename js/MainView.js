'use strict';

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {
  ViroARScene,
  ViroText,
  ViroImage,
  ViroFlexView
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
  }

  render() {
    if (Object.keys(this.state.data).length > 0) {
      const images = {
        image0: require('./res/0.png'),
        image2: require('./res/2.png'),
        image3: require('./res/3.png'),
        image4: require('./res/4.png'),
        image5: require('./res/5.png'),
        image6: require('./res/6.png'),
        image7: require('./res/7.png'),
        image8: require('./res/8.png'),
        image9: require('./res/9.png'),
        image10: require('./res/10.png')
      }
     return  <ViroARScene>
          {Object.keys(this.state.data).map(businessId => {
            const barSrc = require('./res/cocktail.png');
            const restaurantSrc = require('./res/icons8-meal-64.png');
            const distance = this.state.data[businessId].distance
            return <ViroImage key={businessId} onHover={() => {this._saveBusinessId(businessId)}} source={restaurantSrc} scale={distance < 50 ? [10, 10, 10] : [18, 18, 18]} transformBehaviors={["billboard"]} position={[this.state.data[businessId].x, distance < 110 ? 10 : 33, this.state.data[businessId].z]} />
            })} 
            {this.state.isHovering ? 
            <ViroFlexView
	         height={this.state.data[this.state.onHoverId].distance < 50 ? 26 : 50}
           width={this.state.data[this.state.onHoverId].distance < 50 ? 26 : 50}
           opacity={0.9}
	         position={[this.state.data[this.state.onHoverId].x, this.state.data[this.state.onHoverId].distance < 50 ? -10 : this.state.data[this.state.onHoverId].distance < 110 ? -25 : -27, this.state.data[this.state.onHoverId].z]}
	         transformBehaviors={["billboard"]}>
          		<ViroFlexView backgroundColor={'#e1bee7'} style={{flex:0.2,flexDirection: 'row'}} >
              <ViroText
              style={{color: 'black', flex:1}}
              text={this.state.data[this.state.onHoverId].name}
              textAlign={'center'}
              fontWeight={'bold'}
        			fontSize={this.state.data[this.state.onHoverId].distance < 50 ? 300 : 480} />
        	</ViroFlexView>
          <ViroFlexView backgroundColor={'white'} style={{flex:0.3,flexDirection: 'row'}} >
          <ViroImage source={require('./res/Yelp_trademark_RGB_outline.png')} style={{flex:1}} scale={this.state.data[this.state.onHoverId].distance < 50 ? [0.7, 1.3, 0.9] : [0.8, 1.4, 1]}/>
          </ViroFlexView>
          <ViroFlexView backgroundColor={'white'} style={{flex:0.2,flexDirection: 'row'}} >
          <ViroImage source={images['image' + this.state.data[this.state.onHoverId].rating]} style={{flex:1}} scale={[0.5, 0.5, 0.5]}/>
          </ViroFlexView>
        	<ViroFlexView backgroundColor={'white'} style={{flex:0.2,flexDirection: 'row'}} >
        		<ViroText
              style={{color: 'black', flex:1}}
              text={`${this.state.data[this.state.onHoverId].category}`}
              textAlign={'center'}
        			fontSize={this.state.data[this.state.onHoverId].distance < 50 ? 220 : 400} />
        	</ViroFlexView>
          <ViroFlexView backgroundColor={'white'} style={{flex:0.2,flexDirection: 'row'}} >
        		<ViroText
              style={{color: 'black', flex:1}}
              text={`${this.state.data[this.state.onHoverId].distance} meters from you`}
              textAlign={'center'}
        			fontSize={this.state.data[this.state.onHoverId].distance < 50 ? 220 : 400} />
        	</ViroFlexView>
        </ViroFlexView> : null}
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
          if (business.distance < 120) {
          var point = utils.transformPointToAR(position.coords.latitude, position.coords.longitude, business.coordinates.latitude, business.coordinates.longitude);
          let categories = ''
          business.categories.forEach((cat, index) => {
            if (index !== business.categories.length-1) categories += cat.title + ', ';
            else categories += cat.title;
          })
          businesses[business.id] = {
            x: point.x,
            z: point.z,
            name: business.name,
            category: categories,
            rating: business.rating * 2,
            distance: Math.floor(business.distance)
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

  }

var styles = StyleSheet.create({
});

