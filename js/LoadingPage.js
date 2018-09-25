import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    ImageBackground,
    Image
}
    from 'react-native'

export default class BusinessModal extends Component {

    render() {
        return (
            <ImageBackground source={require('./res/Mojito.jpg')} style={{ width: '100%', height: '100%' }}>
                <View style={localStyles.outer} >
                    <View style={localStyles.inner} >
                        <Text style={localStyles.titleText}>WhatevAR</Text>
                        <Image source={require('./res/viro.png')} style={localStyles.bottomImage}></Image>
                    </View>
                </View>
            </ImageBackground>
        )
    }
}

var localStyles = StyleSheet.create({
    outer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    inner: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center'
    },
    titleText: {
        fontFamily: 'Avenir',
        fontSize: 50,
        color: '#000000',
        textAlignVertical: 'center',
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'white'
    },
    bottomImage: {
        top: 200,
        bottom: 0,
        right: 1,
        left: 1,
        height: 130,
        width: 200
    }
})