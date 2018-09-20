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
    Image,
    ImageBackground
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
            <View style={localStyles.inner} >
            {/* <View style={localStyles.inner} > */}
            <View style={{height: data.name.length < 20 ? '23%' : '28%', width: '100%', bottom: 20}}>
            <ImageBackground source={require('./res/Mojito.jpg')} style={{width: '100%', height: '100%'}}>
            <Text style={localStyles.titleText}>{data.name}</Text>
            <Text style={{fontSize: 20, textAlign: 'center', color: 'white'}}>{data.location.address1}</Text>
            <Text style={{fontSize: 20, textAlign: 'center', color: 'white'}}>{data.location.zip_code}</Text>
            {data.phone ? <Text style={{fontSize: 20, textAlign: 'center', color: 'white'}}>{data.phone}</Text> : null}
            </ImageBackground>
            </View>
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
              <TouchableHighlight style={data.name.length > 20 ? localStyles.button : localStyles.smallButton} 
                underlayColor={'#68a0ff'} onPress={this._handleOnClick}>
                <Text style={localStyles.buttonText}>Close</Text>
              </TouchableHighlight>
            </View>
        //   </View>
        )
    }

    _handleOnClick() {
        this.props.closeModal()
    }
}

var localStyles = StyleSheet.create({
    inner: {
      flex : 1,
      flexDirection: 'column',
      alignItems:'center',
      backgroundColor: "white",
    },
    titleText: {
        fontFamily: 'Avenir',
        fontSize: 30,
        color: 'white',
        //textAlignVertical: 'center',
        textAlign: 'center',
        fontWeight: 'bold',
        paddingTop: 30
    },
    buttonText: {
        fontFamily: 'Avenir',
      color:'#fff',
      textAlign:'center',
      fontSize : 23,
      textAlignVertical: 'center'
    },
    button : {
      height: 40,
      width: 100,
      paddingTop: 5,
      paddingBottom:5,
      marginTop: 2,
      marginBottom: 10,
      backgroundColor:'#1D976C',
      borderRadius: 10
    },
    smallButton : {
        height: 40,
        width: 100,
        paddingTop: 5,
        paddingBottom:5,
        marginTop: 15,
        marginBottom: 10,
        backgroundColor:'#1D976C',
        borderRadius: 10
      },
    images: {
        flexDirection: 'row',
        bottom: 5,
        shadowColor: 'black',
        shadowOffset: {width: 2, height: 2},
        shadowRadius: 4,
        shadowOpacity:  0.8
    },
    singleImage: {
        height: 100,
        width: 100,
        margin: 5
    },
    openingTimes: {
        margin: 5,
        width: '48%'
    },
    day: {
        flexDirection: 'row'
    },
    text: {
        fontFamily: 'Avenir',
        fontSize: 18,
        position: 'absolute',
        fontWeight: 'bold'
    },
    hours: {
        fontFamily: 'Avenir',
        fontSize: 18,
        textAlign: 'center',
        left: '350%'
    },
    open: {
        fontFamily: 'Avenir',
        color: '#1D976C',
        fontSize: 25,
        fontWeight: 'bold',
        margin: 5
    },
    closed: {
        fontFamily: 'Avenir',
        color: 'red',
        fontSize: 25,
        fontWeight: 'bold',
        margin: 5
    },
  });