import React from 'react';
import CreateListingScreen from './components/CreateListing'
import {StyleSheet, TouchableWithoutFeedback, Text, Image, View} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import {createAppContainer, createStackNavigator} from "react-navigation";
import * as firebase from 'firebase';
export default class App extends React.Component {
  render() {
    return (
        <AppContainer />
    );
  }
}

class LoginScreen extends React.Component{
  render() {
    const navigation = this.props.navigation;
    return (
          <View style={styles.background}>
            <Header/>
            <SignIn navigation={navigation}/>
          </View>
    )
  }
}

class Header extends React.Component {
  render() {
    return (
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Hello.</Text>
          <Text style={styles.headerSubTitle}>Welcome to the Student Book Exchange.</Text>
        </View>
    );
  }
}

class SignIn extends React.Component {
  render() {
    const navigation = this.props.navigation;
    return (
        <View>
          <View style={styles.signInContainer}>
            <View style={styles.line1} />
            <Text style={styles.signInTitle}>Sign In</Text>
            <View style={styles.line2} />
          </View>
          <View style={styles.signInOptions}>
            <TouchableWithoutFeedback onPress={() =>  navigation.navigate("CreateListing")}>
              <Image style={styles.googleSignIn} source={require('./assets/login-google.png')} />
            </TouchableWithoutFeedback>
          </View>
        </View>
    );
  }
}



const AppNavigator = createStackNavigator(
    {
      Login: LoginScreen,
      CreateListing: CreateListingScreen
    },
    {
      initialRouteName: "Login",
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

const styles = StyleSheet.create({
  signInOptions: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  googleSignIn: {
    width: wp(80),
    height: hp(7),
    marginTop: hp(10),
  },
  background: {
    flex: 1,
    width: wp(100),
    height: hp(100),
    backgroundColor: '#333138',
  },
  headerContainer: {
    backgroundColor: '#E94F37',
    borderBottomLeftRadius: wp(15),
    width: wp(100),
    height: hp(32)
  },
  headerTitle: {
    fontSize: wp(15),
    marginTop: hp(5),
    fontWeight: "bold",
    color: "#FFFFFA",
    marginLeft: wp(5),
  },
  signInTitle: {
    fontSize: wp(5),
    fontWeight: "bold",
    color: "#FFFFFA",
    marginLeft: wp(4),
    marginTop: hp(-3.2)
  },
  headerSubTitle: {
    fontSize: wp(5),
    fontWeight: "bold",
    width: wp(80),
    marginTop: hp(2),
    marginLeft: wp(5),
    color: "#FFFFFA"
  },
  signInContainer: {
    marginTop: hp(15),
    flex: 1,
    flexDirection: 'row'
  },
  line1: {
    height: 1,
    width: wp(30),
    borderRadius: 1,
    borderColor: "#F2545B",
    backgroundColor: "#F2545B",
    marginLeft: wp(8),
    marginTop: hp(-1)
  },
  line2: {
    height: 1,
    width: wp(30),
    borderRadius: 1,
    borderColor: "#F2545B",
    backgroundColor: "#F2545B",
    marginLeft: wp(4),
    marginTop: hp(-1)
  }
});

