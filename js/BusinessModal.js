import React, { Component } from 'react';
import data from '../businessData.json';
import {
    ViroText,
    ViroImage,
    ViroFlexView,
    ViroARSceneNavigator
} from 'react-viro';
import {
    Text,
    TouchableHighlight,
    View,
    StyleSheet,
    Image
 } 
 from 'react-native'

export default class BusinessModal extends Component {

    constructor() {
        super();

        this._handleOnClick = this._handleOnClick.bind(this);
      }
    render() {
        const hygiene_rating = {
            'fhrs_5_en-gb': require('./res/fhrs_5_en-gb.jpg'),
            'fhrs_4_en-gb': require('./res/fhrs_4_en-gb.jpg'),
            'fhrs_3_en-gb': require('./res/fhrs_3_en-gb.jpg'),
            'fhrs_2_en-gb': require('./res/fhrs_2_en-gb.jpg'),
            'fhrs_1_en-gb': require('./res/fhrs_1_en-gb.jpg'),
            'fhrs_0_en-gb': require('./res/fhrs_0_en-gb.jpg')
        }
        return (
            <View style={localStyles.outer} >
            <View style={localStyles.inner} >
            <Text style={localStyles.titleText}>{data.name}</Text>
            {data.phone ? <Text style={localStyles.text}>{data.phone}</Text> : null}
            <View style={localStyles.images}>
            <Image style={localStyles.singleImage} source={{uri: data.photos[0]}}/>
            <Image style={localStyles.singleImage} source={{uri: data.photos[1]}}/>
            <Image style={localStyles.singleImage} source={{uri: data.photos[2]}}/>
            </View>
            {data.hours[0].is_open_now ? <Text style={localStyles.open}>Open now</Text> : <Text style={localStyles.closed}>Closed now</Text>}
            <View style={localStyles.openingTimes}>
                <View style={localStyles.day}><Text style={localStyles.text}>Mon: </Text><Text style={localStyles.hours}>{data.hours[0].open[0].start} - {data.hours[0].open[0].end}</Text></View>
                <View style={localStyles.day}><Text style={localStyles.text}>Tue: </Text><Text style={localStyles.hours}>{data.hours[0].open[1].start} - {data.hours[0].open[1].end}</Text></View>
                <View style={localStyles.day}><Text style={localStyles.text}>Wed: </Text><Text style={localStyles.hours}>{data.hours[0].open[2].start} - {data.hours[0].open[2].end}</Text></View>
                <View style={localStyles.day}><Text style={localStyles.text}>Thu: </Text><Text style={localStyles.hours}>{data.hours[0].open[3].start} - {data.hours[0].open[3].end}</Text></View>
                <View style={localStyles.day}><Text style={localStyles.text}>Fri: </Text><Text style={localStyles.hours}>{data.hours[0].open[4].start} - {data.hours[0].open[4].end}</Text></View>
                <View style={localStyles.day}><Text style={localStyles.text}>Sat: </Text><Text style={localStyles.hours}>{data.hours[0].open[5].start} - {data.hours[0].open[5].end}</Text></View>
                <View style={localStyles.day}><Text style={localStyles.text}>Sun: </Text><Text style={localStyles.hours}>closed</Text></View>
            </View>
            <Image style={{width: 130, height: 65, margin: 10}} source={hygiene_rating[data.hygiene_rating]}/>
              <TouchableHighlight style={localStyles.buttons}
                underlayColor={'#68a0ff'} onPress={this._handleOnClick}>
                <Text style={localStyles.buttonText}>Close</Text>
              </TouchableHighlight>
            </View>
          </View>
        )
    }

    _handleOnClick() {
        this.props.closeModal()
    }
}

var localStyles = StyleSheet.create({
    outer : {
      flex : 1,
      flexDirection: 'row',
      alignItems:'center',
      backgroundColor: "white",
    },
    inner: {
      flex : 1,
      flexDirection: 'column',
      alignItems:'center',
      backgroundColor: "white",
    },
    titleText: {
        fontFamily: 'Arial',
        fontSize: 30,
        color: '#000000',
        textAlignVertical: 'center',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    buttonText: {
      color:'#fff',
      textAlign:'center',
      fontSize : 20
    },
    buttons : {
      height: 40,
      width: 100,
      paddingTop:5,
      paddingBottom:5,
      marginTop: 10,
      marginBottom: 10,
      backgroundColor:'#68a0cf',
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#fff',
    },
    exitButton : {
      height: 50,
      width: 100,
      paddingTop:10,
      paddingBottom:10,
      marginTop: 10,
      marginBottom: 10,
      backgroundColor:'#68a0cf',
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#fff',
    },
    images: {
        flexDirection: 'row',
        margin: 5
    },
    singleImage: {
        height: 100,
        width: 100,
        margin: 5
    },
    openingTimes: {
        margin: 5,
        width: '40%'
    },
    day: {
        flexDirection: 'row'
    },
    text: {
        fontSize: 15,
        position: 'absolute'
    },
    hours: {
        fontSize: 15,
        textAlign: 'center',
        left: '350%'
    },
    open: {
        color: 'green',
        fontSize: 18,
        fontWeight: 'bold',
        margin: 5
    },
    closed: {
        color: 'red',
        fontSize: 18,
        fontWeight: 'bold',
        margin: 5
    },
  });