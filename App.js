import React from 'react';
import CreateListingScreen from './components/CreateListing'
import {StyleSheet, TouchableWithoutFeedback, Text, Image, View} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import {createAppContainer, createStackNavigator} from "react-navigation";
import * as firebase from 'firebase'
import HomeScreen from "./components/HomeScreen";
import LoginScreen from "./components/LoginScreen";

export default class App extends React.Component {
  render() {
    return (
        <AppContainer />
    );
  }
}

const AppNavigator = createStackNavigator(
    {
      Home: HomeScreen,
      Login: LoginScreen,
      CreateListing: CreateListingScreen
    },
    {
      initialRouteName: "Home",
      defaultNavigationOptions: {
        header: null
      }
    }
);


const firebaseConfig = {
  apiKey: "AIzaSyDPe9Nckm0M2LamEnzv2in2SGK25drJy0g",
  authDomain: "bookexchange-f1b95.firebaseapp.com",
  databaseURL: "https://bookexchange-f1b95.firebaseio.com",
  projectId: "bookexchange-f1b95",
  storageBucket: "bookexchange-f1b95.appspot.com",
  messagingSenderId: "942772568512",
  appId: "1:942772568512:web:65acf76c1c6e02c2"
};
firebase.initializeApp(firebaseConfig);



const AppContainer = createAppContainer(AppNavigator);

