'use strict';

import React, { Component } from 'react';
import Card from './Card.js';
import Geolocation from 'react-native-geolocation-service';
import {
  ViroARScene,
  ViroText,
  ViroImage
} from 'react-viro';
import icons from './res/icons/index.js'
import {bars, restaurants} from './res/categories'
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
  }

  render() {
    const { data } = this.props.arSceneNavigator.viroAppProps.data
    console.log(this.props)
    if (Object.keys(this.state.data).length > 0) {
      const restaurantColor = '#93f9b9';
      const barColor = '#81d4fa';
      return <ViroARScene>
        {Object.keys(this.state.data).map(businessId => {
          const {distance} = this.state.data[businessId];
          return <ViroImage key={businessId} onClick={() => this._openAppModal(businessId)}
            onHover={() => { this._saveBusinessId(businessId) }}
            source={restaurants.includes(this.state.data[businessId].categories[0]) ? icons.food : bars.includes(this.state.data[businessId].categories[0]) ? icons.bar : icons.questionMark}
            scale={[distance / 5, distance / 5, distance / 5]}
            transformBehaviors={['billboard']}
            position={this.state.data[businessId].position} />
        })}
        {this.state.isHovering ? <Card color={restaurants.includes(this.state.data[this.state.onHoverId].categories[0]) ? restaurantColor : barColor} business={this.state.data[this.state.onHoverId]} /> : null}
      </ViroARScene>
    } else return <ViroARScene>
      <ViroText text='Loading...' scale={[1, 1, 1]} transformBehaviors={['billboard']} position={[0, 0, -2]} />
    </ViroARScene>
  }

  componentDidMount() {
    this.setState({
      data: this.props.sceneNavigator.viroAppProps.data
    })
  }

  _saveBusinessId = (businessId) => {
    this.setState({ onHoverId: businessId, isHovering: !this.state.isHovering })
  }

  _openAppModal =(businessId) => {
    this.props.arSceneNavigator.viroAppProps.openModal(businessId, this.state.data[businessId].name)
  }

  _redirectToApp = () => {
    this.props.arSceneNavigator.viroAppProps.displayError()
  }
}
