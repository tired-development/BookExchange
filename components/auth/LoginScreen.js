import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, TextInput, TouchableWithoutFeedback, AsyncStorage} from "react-native";
import {heightPercentageToDP, widthPercentageToDP} from "react-native-responsive-screen";
import { SocialIcon } from "react-native-elements/src/index";
import { mainStyles } from '../styles/MainStyles';
import firebase from 'firebase'
import { getTokenAsync } from "./providers/AuthProvider";
import Providers from "./providers/AuthProviders";


export default class LoginScreen extends React.Component
{
    state = { isSignedIn: false };

    componentDidMount() {
        this.setupFirebaseAsync();
    }

    setupFirebaseAsync = async () => {
        firebase.auth().onAuthStateChanged(async auth => {
            const isSignedIn = !!auth;
            this.setState({ isSignedIn });

            console.log("bing bang boom")
            if (!isSignedIn)
            {
                console.log("lol");
            }
        })
    };

    render() {

        const { navigation } = this.props;

        if (this.state.isSignedIn)
        {
            const user = firebase.auth().currentUser || {};

            return (
                <View>
                    <Text>{user.displayName}</Text>
                </View>
            )
        }

        return (
            <View style={mainStyles.background}>
                <LoginOptions navigation={navigation}/>
            </View>
        );
    }
}

async function signInAsync(provider, token)
{
    try {
        if (!token)
        {
            const token = await getTokenAsync(provider);
            if (token)
            {
                await AsyncStorage.setItem(provider.storageKey, token);
                return signInAsync(provider, token);
            }
            else
            {
                return;
            }
        }

        const credential = provider.firebaseAuth.credential(token);
        return firebase.auth().signInWithCredential(credential);
    }
    catch ({ message }) {
        alert(message);
    }
}

class LoginOptions extends React.Component
{
    render() {
        return (
            <View>
                    <SocialIcon
                        title={"Twitter"}
                        button
                        fontWeight={"bold"}
                        fontStyle={optionStyles.optionButtonFont}
                        style={[optionStyles.optionButton, {marginTop: heightPercentageToDP(24)}]}
                        type={"twitter"}
                        onPress={() =>this.props.navigation.navigate("CreateListing")}/*Just for testing now*/
                    />

                    <SocialIcon
                        title={"Facebook"}
                        button
                        fontWeight={"bold"}
                        fontStyle={optionStyles.optionButtonFont}
                        style={[optionStyles.optionButton, {marginTop: heightPercentageToDP(7)}]}
                        type={"facebook"}
                    />

                    <SocialIcon
                        title={"Google"}
                        button
                        fontWeight={"bold"}
                        fontStyle={optionStyles.optionButtonFont}
                        style={[optionStyles.optionButton, {marginTop: heightPercentageToDP(7)}]}
                        type={"google-plus-official"}
                    />

                    <SocialIcon
                        title={"Github"}
                        button
                        onPress={() => {
                            signInAsync(Providers.github)
                        }}
                        fontWeight={"bold"}
                        fontStyle={optionStyles.optionButtonFont}
                        style={[optionStyles.optionButton, {marginTop:heightPercentageToDP(7)}]}
                        light
                        type={"github"}
                    />
            </View>
        );
    }
    //
    // componentDidMount() {
    //
    //     const manager = new OAuthManager('test');
    //     manager.configure({
    //         google: {
    //             callback_url: `https://bookexchange-f1b95.firebaseapp.com/__/auth/handler`,
    //             client_id: '942772568512-i97mctv5gp2nk97sbdmp85b2bj8sn8me.apps.googleusercontent.com',
    //             client_secret: 'MshjQUHwYx2wWHVEcYreZL4F'
    //         }
    //     })
    //         .then(data => console.log(data))
    //         .catch(error => console.log(error));
    //
    //     manager.authorize('google', {scopes: 'profile email'})
    //         .then(response => console.log('Your users ID'))
    //         .catch(error => console.log("ERROR"));
    // }
}



const optionStyles = StyleSheet.create({

    optionButton: {
        alignItems: "center",
        width: widthPercentageToDP(70),
        height: heightPercentageToDP(7),
        marginLeft: widthPercentageToDP(15)
    },

    optionButtonFont: {
        fontSize: heightPercentageToDP(2.5)
    }
});