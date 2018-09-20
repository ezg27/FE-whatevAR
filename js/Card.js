import React, { Component } from 'react';
import {
      ViroText,
      ViroImage,
      ViroFlexView
    } from 'react-viro';

export default class Card extends Component {
  
   render() {
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
          const prices = {
            '£': require('./res/£.png'),
            '££': require('./res/££.png'),
            '£££': require('./res/£££.png'),
            '££££': require('./res/££££.png'),
          }
      return (
      <ViroFlexView
      height={this.props.business.distance < 50 ? 26 : 50}
      width={this.props.business.distance < 50 ? 26 : 50}
      opacity={0.9}
      position={[this.props.business.x, this.props.business.distance < 50 ? -10 : this.props.business.distance < 110 ? -25 : -27, this.props.business.z]}
      transformBehaviors={["billboard"]}>
      <ViroFlexView backgroundColor={'#e1bee7'} style={{ flex: 0.2, flexDirection: 'row' }} >
        <ViroText
          style={{ color: 'black', flex: 1 }}
          text={this.props.business.name}
          textAlign={'center'}
          fontWeight={'bold'}
          fontFamily={'Avenir'}
          fontSize={this.props.business.distance < 50 ? 300 : 480} />
      </ViroFlexView>
      <ViroFlexView backgroundColor={'white'} style={{ flex: 0.2, flexDirection: 'row' }} >
        <ViroImage source={require('./res/Yelp_trademark_RGB_outline.png')} style={{ flex: 1 }} scale={this.props.business.distance < 50 ? [0.6, 1.7, 0.8] : [0.7, 1.8, 0.9]} />
      </ViroFlexView>
      <ViroFlexView backgroundColor={'white'} style={{ flex: 0.2, flexDirection: 'row' }} >
        <ViroImage source={images['image' + this.props.business.rating]} style={{ flex: 1 }} scale={[0.5, 0.5, 0.5]} />
      </ViroFlexView>
      <ViroFlexView backgroundColor={'white'} style={{ flex: 0.2, flexDirection: 'row' }} >
        <ViroText
          style={{ color: 'black', flex: 1 }}
          text={this.props.business.category}
          textAlign={'center'}
          fontSize={this.props.business.distance < 50 ? 220 : 400} />
      </ViroFlexView>
      <ViroFlexView backgroundColor={'white'} style={{ flex: 0.1, flexDirection: 'row' }} >
        <ViroImage source={prices[this.props.business.price]} style={{ flex: 1 }} scale={[0.3, 1, 0.3]} />
      </ViroFlexView>
      <ViroFlexView backgroundColor={'white'} style={{ flex: 0.2, flexDirection: 'row' }} >
        <ViroText
          style={{ color: 'black', flex: 1 }}
          text={`${this.props.business.distance} meters from you`}
          textAlign={'center'}
          fontSize={this.props.business.distance < 50 ? 220 : 400} />
      </ViroFlexView>
    </ViroFlexView>
      )
   }
}

