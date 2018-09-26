import React, { Component } from 'react';
import {
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
                        <Image source={require('./res/logo_final.png')} style={localStyles.logo}/>
                        <Image source={require('./res/viro.png')} style={localStyles.bottomImage}/>
                    </View>
                </View>
            </ImageBackground>
        )
    }
}

const localStyles = StyleSheet.create({
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
    logo: {
        height: 350,
        width: 250
    },
    bottomImage: {
        top: 60,
        bottom: 30,
        right: 1,
        left: 1,
        height: 110,
        width: 170
    }
})