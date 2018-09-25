import React, { Component } from 'react';
import data from '../businessData.json';
import propTypes from 'prop-types';
import hygiene_rating from './res/foodHygiene/index.js'
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
        this.state = {
            business: {},
            error: false
        }
        this._handleOnClick = this._handleOnClick.bind(this);
        this._redirectToApp = this._redirectToApp.bind(this);
    }
    render() {
        if (Object.keys(this.state.business).length !== 0) {
            return (
                <View style={localStyles.inner} >
                    <View style={{ height: this.state.business.name.length < 20 ? '23%' : '28%', width: '100%', bottom: 20 }}>
                        <ImageBackground source={require('./res/Mojito.jpg')} style={{ width: '100%', height: '100%' }}>
                            <Text style={localStyles.titleText}>{this.state.business.name}</Text>
                            {this.state.business.address ? <Text style={{ fontSize: 20, textAlign: 'center', color: 'white' }}>{this.state.business.address}</Text> : null}
                            {this.state.business.postcode ? <Text style={{ fontSize: 20, textAlign: 'center', color: 'white' }}>{this.state.business.postcode}</Text> : null}
                            {this.state.business.phone ? <Text style={{ fontSize: 20, textAlign: 'center', color: 'white' }}>{this.state.business.phone}</Text> : null}
                        </ImageBackground>
                    </View>
                    <View style={localStyles.images}>
                        <Image style={localStyles.singleImage} source={{ uri: this.state.business.photos[0] }} />
                        <Image style={localStyles.singleImage} source={{ uri: this.state.business.photos[1] }} />
                        <Image style={localStyles.singleImage} source={{ uri: this.state.business.photos[2] }} />
                    </View>
                    {this.state.business.isOpen === null ? null : this.state.business.isOpen ? <Text style={localStyles.open}>Open now</Text> : <Text style={localStyles.closed}>Closed now</Text>}
                    <View style={localStyles.openingTimes}>
                        <View style={localStyles.day}><Text style={localStyles.text}>Mon: </Text><Text style={localStyles.hours}>{this.state.business.hours[0]}</Text></View>
                        <View style={localStyles.day}><Text style={localStyles.text}>Tue: </Text><Text style={localStyles.hours}>{this.state.business.hours[1]}</Text></View>
                        <View style={localStyles.day}><Text style={localStyles.text}>Wed: </Text><Text style={localStyles.hours}>{this.state.business.hours[2]}</Text></View>
                        <View style={localStyles.day}><Text style={localStyles.text}>Thu: </Text><Text style={localStyles.hours}>{this.state.business.hours[3]}</Text></View>
                        <View style={localStyles.day}><Text style={localStyles.text}>Fri: </Text><Text style={localStyles.hours}>{this.state.business.hours[4]}</Text></View>
                        <View style={localStyles.day}><Text style={localStyles.text}>Sat: </Text><Text style={localStyles.hours}>{this.state.business.hours[5]}</Text></View>
                        <View style={localStyles.day}><Text style={localStyles.text}>Sun: </Text><Text style={localStyles.hours}>{this.state.business.hours[6]}</Text></View>
                    </View>
                    {console.log(hygiene_rating)}
                    {this.state.business.foodRating ? <Image style={{ width: 130, height: 65, margin: 10 }} source={hygiene_rating[this.state.business.foodRating]} /> : null}
                    <TouchableHighlight style={this.state.business.name.length > 20 ? localStyles.button : localStyles.smallButton}
                        underlayColor={'#68a0ff'} onPress={this._handleOnClick}>
                        <Text style={localStyles.buttonText}>Close</Text>
                    </TouchableHighlight>
                </View>
            )
        } else return <View style={localStyles.inner}>
            <Text style={localStyles.loading}>Loading...</Text>
        </View>
    }

    componentDidMount() {
        //this.setState({ business: data })
        let businessName = this.props.business.name.toLowerCase().replace(/\s/g, '+').replace(/&/g, 'and');
        fetch(`https://0p83k3udwg.execute-api.us-east-1.amazonaws.com/dev/api/device/business/${this.props.business.id}/${businessName}`)
            .then(buffer => buffer.json())
            .then(res => {
                if (res.message) {
                    this.setState({ error: true }, () => this._redirectToApp())
                } else if (res.hours !== null) this.setState({ business: res })
                else this.setState({
                    business: {
                        ...res,
                        hours: ['No listing', 'No listing', 'No listing', 'No listing', 'No listing', 'No listing', 'No listing']
                    }
                })
            });
    }

    _handleOnClick() {
        this.props.closeModal();
    }

    _redirectToApp() {
        this.props.displayError()
    }
}

BusinessModal.propTypes = {
    business: propTypes.object,
    closeModal: propTypes.func,
    displayError: propTypes.func
}

var localStyles = StyleSheet.create({
    inner: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: "white",
    },
    titleText: {
        fontFamily: 'Avenir',
        fontSize: 30,
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        paddingTop: 30
    },
    buttonText: {
        fontFamily: 'Avenir',
        color: '#fff',
        textAlign: 'center',
        fontSize: 23,
        textAlignVertical: 'center'
    },
    button: {
        height: 40,
        width: 100,
        paddingTop: 5,
        paddingBottom: 5,
        marginTop: 2,
        marginBottom: 10,
        backgroundColor: '#1D976C',
        borderRadius: 10
    },
    smallButton: {
        height: 40,
        width: 100,
        paddingTop: 5,
        paddingBottom: 5,
        marginTop: 15,
        marginBottom: 10,
        backgroundColor: '#1D976C',
        borderRadius: 10
    },
    images: {
        flexDirection: 'row',
        bottom: 5,
        shadowColor: 'black',
        shadowOffset: { width: 2, height: 2 },
        shadowRadius: 4,
        shadowOpacity: 0.8
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
    loading: {
        fontFamily: 'Avenir',
        fontSize: 35,
        textAlign: 'center',
        margin: 100
    }
});