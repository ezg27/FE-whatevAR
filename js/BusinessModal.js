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
    StyleSheet
 } 
 from 'react-native'

export default class BusinessModal extends Component {

    constructor() {
        super();

        this._handleOnClick = this._handleOnClick.bind(this);
      }
    render() {
        return (
            <View style={localStyles.outer} >
            <View style={localStyles.inner} >
            <Text>{data.name}</Text>
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
      paddingTop: 30,
      paddingBottom: 20,
      color:'#fff',
      textAlign:'center',
      fontSize : 25
    },
    buttonText: {
      color:'#fff',
      textAlign:'center',
      fontSize : 20
    },
    buttons : {
      height: 80,
      width: 150,
      paddingTop:20,
      paddingBottom:20,
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
    }
  });