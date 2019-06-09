import React from 'react';
import {StyleSheet, TouchableWithoutFeedback, Text, Image, View} from 'react-native';
import {mainStyles} from './styles/MainStyles.js'
import {heightPercentageToDP, widthPercentageToDP} from "react-native-responsive-screen";
import Button from 'react-native-button'

export default class HomeScreen extends React.Component {
    render() {
        return (
            <View style={mainStyles.background}>
                <Header/>
                <SignIn navigation={this.props.navigation}/>
            </View>
        )
    }
}

class Header extends React.Component {
    render() {
        return (
            <View style={mainStyles.headerContainer}>
                <Text style={mainStyles.headerTitle}>Hello.</Text>
                <Text style={mainStyles.headerSubTitle}>Welcome to the Student Book Exchange.</Text>
            </View>
        )
    }
}

class SignIn extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <Button
                style={signInStyles.signInButton}
                containerStyle={signInStyles.signInContainer}
                // TODO change CreateListing to Login, waiting for auth implementation
                onPress={() => this.props.navigation.navigate("Login")}
            >
                Sign in
            </Button>
        )
    }
}

const signInStyles = StyleSheet.create({
    signInContainer: {
        padding: 10,
        height: heightPercentageToDP(7.5),
        borderRadius: 8,
        alignItems: "center",
        backgroundColor: "#E94F37",
        marginLeft: widthPercentageToDP(27),
        marginTop: heightPercentageToDP(50),
        width: widthPercentageToDP(50)
    },
    signInButton: {
        fontSize: widthPercentageToDP(5),
        fontWeight: "bold",
        color: "#FFFFFA"
    }
});