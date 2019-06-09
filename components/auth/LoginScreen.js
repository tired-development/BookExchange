import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, TextInput, TouchableWithoutFeedback, AsyncStorage} from "react-native";
import {heightPercentageToDP, widthPercentageToDP} from "react-native-responsive-screen";
import { SocialIcon } from "react-native-elements/src/index";
import { mainStyles } from '../styles/MainStyles';
import firebase from 'firebase/index'
import { getGithubTokenAsync } from './TokenService'
import { authorize } from "react-native-app-auth/index"


const GITHUB_STORAGE_KEY = "password123";


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
            if (!isSignedIn)
            {
                console.log("lol");
            }
        })
    };

    render() {
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
                <LoginOptions/>
            </View>
        );
    }
}

async function signInAsync(token)
{
    try {
        if (!token)
        {
            const token = await getGithubTokenAsync();
            if (token)
            {
                await AsyncStorage.setItem(GITHUB_STORAGE_KEY, token);
                return signInAsync(token);
            }
            else
            {
                return;
            }
        }

        const credential = firebase.auth.GithubAuthProvider.credential(token);
        return firebase.auth().signInAndRetrieveDataWithCredential(credential);
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
                <TouchableWithoutFeedback>
                    <SocialIcon
                        title={"Twitter"}
                        button
                        fontWeight={"bold"}
                        fontStyle={optionStyles.optionButtonFont}
                        style={[optionStyles.optionButton, {marginTop: heightPercentageToDP(24)}]}
                        type={"twitter"}
                    />
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback>
                    <SocialIcon
                        title={"Facebook"}
                        button
                        fontWeight={"bold"}
                        fontStyle={optionStyles.optionButtonFont}
                        style={[optionStyles.optionButton, {marginTop: heightPercentageToDP(7)}]}
                        type={"facebook"}
                    />
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback>
                    <SocialIcon
                        title={"Google"}
                        button
                        fontWeight={"bold"}
                        fontStyle={optionStyles.optionButtonFont}
                        style={[optionStyles.optionButton, {marginTop: heightPercentageToDP(7)}]}
                        type={"google-plus-official"}
                    />
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback>
                    <SocialIcon
                        title={"Github"}
                        button
                        onPress={() => {
                            signInAsync()
                        }}
                        fontWeight={"bold"}
                        fontStyle={optionStyles.optionButtonFont}
                        style={[optionStyles.optionButton, {marginTop:heightPercentageToDP(7)}]}
                        light
                        type={"github"}
                    />
                </TouchableWithoutFeedback>
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