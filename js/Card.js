import React, { Component } from 'react';
import { ViroText, ViroImage, ViroFlexView } from 'react-viro';
import propTypes from 'prop-types';
import prices from './res/price/index.js';
import rating from './res/rating/index.js';

export default class Card extends Component {
  render() {
    let categories = '';
    this.props.business.categories.forEach((cat, index) => {
      if (index < 2) categories += cat + ', ';
    });
    let formatedCategories = categories.slice(0, -2);
    return (
      <ViroFlexView
        height={this.props.business.distance * 0.5}
        width={this.props.business.distance * 0.5}
        opacity={0.9}
        animation={{ name: 'animateImage', run: true, loop: true }}
        position={[
          this.props.business.position[0],
          this.props.business.distance / -2.5,
          this.props.business.position[2]
        ]}
        transformBehaviors={['billboard']}
      >
        <ViroFlexView
          backgroundColor={this.props.color}
          style={{ flex: 0.2, flexDirection: 'row' }}
        >
          <ViroText
            style={{ color: 'black', flex: 1 }}
            text={this.props.business.name}
            textAlign={'center'}
            fontWeight={'bold'}
            fontFamily={'Avenir'}
            fontSize={this.props.business.distance * 5}
          />
        </ViroFlexView>
        <ViroFlexView
          backgroundColor={'white'}
          style={{ flex: 0.2, flexDirection: 'row' }}
        >
          <ViroImage
            source={require('./res/Yelp_trademark_RGB_outline.png')}
            style={{ flex: 1 }}
            scale={[
              0.4 + this.props.business.distance / 400,
              1.2 + this.props.business.distance / 180,
              0.5 + this.props.business.distance / 180
            ]}
          />
        </ViroFlexView>
        <ViroFlexView
          backgroundColor={'white'}
          style={{ flex: 0.2, flexDirection: 'row' }}
        >
          <ViroImage
            source={rating['image' + this.props.business.rating]}
            style={{ flex: 1 }}
            scale={[0.5, 0.5, 0.5]}
          />
        </ViroFlexView>
        <ViroFlexView
          backgroundColor={'white'}
          style={{ flex: 0.2, flexDirection: 'row' }}
        >
          <ViroText
            style={{ color: 'black', flex: 1 }}
            text={formatedCategories}
            textAlign={'center'}
            fontSize={this.props.business.distance * 4}
          />
        </ViroFlexView>
        <ViroFlexView
          backgroundColor={'white'}
          style={{ flex: 0.1, flexDirection: 'row' }}
        >
          {this.props.business.price ? (
            <ViroImage
              source={prices[this.props.business.price]}
              style={{ flex: 1 }}
              scale={[0.3, 1, 0.3]}
            />
          ) : null}
        </ViroFlexView>
        <ViroFlexView
          backgroundColor={'white'}
          style={{ flex: 0.2, flexDirection: 'row' }}
        >
          <ViroText
            style={{ color: 'black', flex: 1 }}
            text={`${this.props.business.distance} meters from you`}
            textAlign={'center'}
            fontSize={this.props.business.distance * 4}
          />
        </ViroFlexView>
      </ViroFlexView>
    );
  }
}

Card.propTypes = {
  business: propTypes.object
};
