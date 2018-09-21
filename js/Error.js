import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    ImageBackground,
    TouchableHighlight
 } 
 from 'react-native';

export default class Error extends Component {

constructor() {
    super()
    this._handleOnPress = this._handleOnPress.bind(this);
}

    render() {
        return (
            <ImageBackground source={require('./res/Mojito.jpg')} style={{width: '100%', height: '100%'}}>
            <View style={localStyles.outer} >
           <View style={localStyles.inner}>
            <Text style={localStyles.titleText}>Whoooops!</Text>
            <Text style={localStyles.titleText}>Something went wrong</Text>
            <TouchableHighlight style={localStyles.button}
                        underlayColor={'#68a0ff'} onPress={this._handleOnPress}>
                        <Text style={localStyles.buttonText}>Retry</Text>
                    </TouchableHighlight>
        </View>
        </View>
          </ImageBackground>
        )
    }

    _handleOnPress() {
    this.props.displayError();
    }
}

var localStyles = StyleSheet.create({
    outer : {
      flex : 1,
      flexDirection: 'row',
      alignItems:'center',
      justifyContent: 'center'
    },
    inner: {
      flex : 1,
      flexDirection: 'column',
      alignItems:'center'
    },
    titleText: {
        fontFamily: 'Avenir',
        fontSize: 25,
        color: '#000000',
        textAlignVertical: 'center',
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'white'
    },
    buttonText: {
        fontFamily: 'Avenir',
        color: '#1D976C',
        textAlign: 'center',
        fontSize: 25,
        textAlignVertical: 'center'
    },
    button: {
        height: 45,
        width: 120,
        paddingTop: 5,
        paddingBottom: 5,
        marginTop: 40,
        marginBottom: 10,
        backgroundColor: 'white',
        borderRadius: 10
    },
})