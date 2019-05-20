import React from 'react';
import { StyleSheet, Text, View, Font } from 'react-native';
import * as firebase from 'firebase';
import LoginBackground from "./components/Login.js";
import LoadingBackground from "./components/Loading.js";

const firebaseConfig = {
  apiKey: "AIzaSyDPe9Nckm0M2LamEnzv2in2SGK25drJy0g",
  authDomain: "bookexchange-f1b95.firebaseapp.com",
  databaseURL: "https://bookexchange-f1b95.firebaseio.com",
  storageBucket: "bookexchange-f1b95.appspot.com"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

export default class App extends React.Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
        <LoginBackground/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
