import React from 'react';
import {StyleSheet, ScrollView, TouchableOpacity, TouchableWithoutFeedback, TouchableHighlight, Text, Image, View, Modal, ToastAndroid} from 'react-native';
import {mainStyles} from './styles/MainStyles.js'
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import { SocialIcon } from "react-native-elements/src/index";
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {Sae, Isao} from 'react-native-textinput-effects';
import deepDiffer from 'react-native/lib/deepDiffer';
import * as firebase from 'firebase';



export default class HomeScreen extends React.Component {
    render() {
        const { navigation } = this.props;
        return (
            <View style={[mainStyles.background, {alignItems: 'center'}]}>
                <Header/>
                <SignIn navigation={navigation}/>
            </View>
        )
    }
}

class Header extends React.Component {
    render() {
        return (
            <View style={signInStyles.headerContainer}>
                <Text style={signInStyles.headerTitle}>TradeIt!</Text>
                <Text style={signInStyles.headerSubTitle}>A student's goto source for used textbooks.</Text>
            </View>
        )
    }
}

class SignIn extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            emailError: '',
            passwordError: '',
            modalSignUpVisible: false,
            modalForgotPasswordVisible: false,
            modalPhoneError: '',
            modalEmailError: '',
            modalPasswordError: '',

            signUpFirstName: '',
            signUpLastName: '',
            signUpPhone: '',
            signUpEmail: '',
            signUpPassword: '',
            signUpConfirmPassword: '',

            resetPasswordEmail: '',
            resetPasswordEmailError: '',

            signInEmail: '',
            signInPassword: '',
        }
    }


    render() {
        return (
            <View>
                <View style={signInStyles.signInContainer}>
                    <Sae
                        label={'Email Address'}
                        iconClass={FontAwesomeIcon}
                        iconName={'envelope'}
                        iconColor={'#A0A0A0'}
                        labelStyle={{color: '#A0A0A0'}}
                        onChangeText={(text) => this.validateText('email', text)}
                    />
                    <Text style={signInStyles.errorText}>{this.state.emailError}</Text>
                    <Sae
                        label={'Password'}
                        style={{marginTop: hp(-1.75)}}
                        iconClass={FontAwesomeIcon}
                        iconName={'key'}
                        iconColor={'#A0A0A0'}
                        labelStyle={{color: '#A0A0A0'}}
                        secureTextEntry={true}
                        onChangeText={(text) => this.setState({signInPassword: text})}
                    />
                    <Text style={signInStyles.errorText}>{this.state.passwordError}</Text>

                </View>
                <View style={{alignItems: 'center'}}>
                    <TouchableOpacity onPress={() => this.signIn()}>
                        <View style={[mainStyles.button, {marginTop: hp(3)}]}>
                            <Text style={mainStyles.buttonText}>Sign In</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={signInStyles.spacerContainer}>
                    <View style={signInStyles.spacer}/>
                </View>

                <View style={signInStyles.oauthContainer}>
                    <SocialIcon type='google' raised={true}/>
                    <SocialIcon type='facebook' raised={true}/>
                    <SocialIcon type='twitter' raised={true}/>
                    <SocialIcon type='github' raised={true}/>
                    <SocialIcon type='twitch' raised={true}/>
                </View>

                <View style={{alignItems: 'center'}}>
                   <View style={signInStyles.portfolioOptionsContainer}>
                       <Text onPress={() => this.setState({modalForgotPasswordVisible: true})} style={signInStyles.forgotPassword}>Forgot password?</Text>
                       <Text onPress={() => this.setState({modalSignUpVisible: true})} style={signInStyles.createAccount}>No account? Sign up.</Text>
                   </View>
                </View>

                <Modal
                    animationType="slide"
                    transparent={false}
                    onRequestClose={() => console.log("")}
                    visible={this.state.modalForgotPasswordVisible}>
                    <TouchableWithoutFeedback onPress={() => this.setState({modalForgotPasswordVisible: false})}>
                        <View style={[mainStyles.background, {alignItems: 'center'}]}>
                            <Text style={mainStyles.headerTitle}>Forgot Your Password?</Text>
                            <View>
                                <Text style={[mainStyles.headerSubTitle, {width: wp(75)}]}>If you already have an account, enter your email address and we'll send a link to reset your password.</Text>
                            </View>

                            <View style={{width: wp(80)}}>
                                <Text style={signInStyles.modalErrorText}>{this.state.resetPasswordEmailError}</Text>
                                <Isao
                                    label={'Email Address'}
                                    activeColor={'#e94f37'}
                                    borderHeight={4}
                                    inputPadding={16}
                                    labelHeight={24}
                                    passiveColor={'#A0A0A0'}
                                    onChangeText={(text) => this.validateText("resetpasswordemail", text)}
                                />
                            </View>
                            <TouchableOpacity onPress={() => this.resetPassword()}>
                                <View style={[mainStyles.button, {marginTop: hp(3)}]}>
                                    <Text style={mainStyles.buttonText}>Submit</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>

                <Modal
                    animationType="slide"
                    transparent={false}
                    onRequestClose={() => console.log("")}
                    visible={this.state.modalSignUpVisible}
                    style={[mainStyles.background, signInStyles.background]}>
                    <TouchableWithoutFeedback onPress={() => this.setState({modalSignUpVisible: false})}>
                        <View style={mainStyles.background}>
                            <Text style={mainStyles.headerTitle}>Create Your Account</Text>
                            <View style={{alignItems: 'center'}}>
                                <Text style={mainStyles.headerSubTitle}>Creating an account allows you to post, manage, and respond to used textbook ads.</Text>
                            </View>

                            <ScrollView style={[signInStyles.signUpContainer, {marginLeft: wp(10)}]}>
                                <View style={{flexDirection: 'row'}}>
                                    <View style={{width: wp(40)}}>
                                        <Isao
                                            label={'First Name'}
                                            activeColor={'#e94f37'}
                                            borderHeight={4}
                                            inputPadding={16}
                                            labelHeight={24}
                                            passiveColor={'#A0A0A0'}
                                            onChangeText={(text) => {this.setState({signUpFirstName: text})}}
                                        />
                                    </View>
                                    <View style={{width: wp(40)}}>
                                        <Isao
                                            label={'Last Name'}
                                            activeColor={'#e94f37'}
                                            borderHeight={4}
                                            inputPadding={16}
                                            labelHeight={24}
                                            passiveColor={'#A0A0A0'}
                                            onChangeText={(text) => {this.setState({signUpLastName: text})}}
                                        />
                                    </View>
                                </View>
                                <Text style={signInStyles.modalErrorText}>{this.state.modalPhoneError}</Text>
                                <Isao
                                    label={'Phone Number'}
                                    activeColor={'#e94f37'}
                                    borderHeight={4}
                                    inputPadding={16}
                                    labelHeight={24}
                                    passiveColor={'#A0A0A0'}
                                    onChangeText={(text) => this.validateText("signupphone", text)}
                                />
                                <Text style={signInStyles.modalErrorText}>{this.state.modalEmailError}</Text>
                                <Isao
                                    label={'Email Address'}
                                    activeColor={'#e94f37'}
                                    borderHeight={4}
                                    inputPadding={16}
                                    labelHeight={24}
                                    passiveColor={'#A0A0A0'}
                                    onChangeText={(text) => this.validateText("signupemail", text)}
                                />
                                <Isao
                                    label={'Password'}
                                    activeColor={'#e94f37'}
                                    borderHeight={4}
                                    inputPadding={16}
                                    labelHeight={24}
                                    passiveColor={'#A0A0A0'}
                                    secureTextEntry={true}
                                    onChangeText={(text) => {this.setState({signUpPassword: text})}}
                                />
                                <Text style={signInStyles.modalErrorText}>{this.state.modalPasswordError}</Text>
                                <Isao
                                    label={'Confirm Password'}
                                    activeColor={'#e94f37'}
                                    borderHeight={4}
                                    inputPadding={16}
                                    labelHeight={24}
                                    passiveColor={'#A0A0A0'}
                                    secureTextEntry={true}
                                    onChangeText={(text) => {this.setState({signUpConfirmPassword: text})}}
                                />
                                <TouchableOpacity onPress={() => this.signUp()}>
                                    <View style={[mainStyles.button, {marginTop: hp(2)}]}>
                                        <Text style={mainStyles.buttonText}>Sign Up</Text>
                                    </View>
                                </TouchableOpacity>
                            </ScrollView>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>

            </View>
        )
    }

    resetPassword(){
        if(this.state.resetPasswordEmail===''){
            ToastAndroid.show("This email is invalid.", ToastAndroid.SHORT);
            return;
        }
        firebase.auth().sendPasswordResetEmail(this.state.resetPasswordEmail).then(() => {
            ToastAndroid.show("A password reset email has been sent to your inbox", ToastAndroid.SHORT);
            this.setState({
               modalForgotPasswordVisible: false
            });
        }).catch((error) => {
            console.log(error);
        });
    }

    signUp(){
        if(this.state.signUpFirstName===''){
            ToastAndroid.show("Your first name is invalid.", ToastAndroid.SHORT);
            return;
        }
        if(this.state.signUpLastName===''){
            ToastAndroid.show("Your last name is invalid.", ToastAndroid.SHORT);
            return;
        }
        if(this.state.signUpPhone===''){
            ToastAndroid.show("Your phone number is invalid", ToastAndroid.SHORT);
            return;
        }
        if(this.state.signUpEmail===''){
            ToastAndroid.show("Your email is invalid", ToastAndroid.SHORT);
            return;
        }
        if(this.state.signUpPassword===''){
            ToastAndroid.show("Your password is invalid", ToastAndroid.SHORT);
            return;
        }
        if(this.state.signUpConfirmPassword===''){
            ToastAndroid.show("Your password is invalid", ToastAndroid.SHORT);
            return;
        }

        firebase.auth().createUserWithEmailAndPassword(this.state.signUpEmail, this.state.signUpPassword).catch(() => {
            let errorCode = error.code;
            let errorMessage = error.message;
            console.log(errorCode + ": " + errorMessage)
        }).finally(() => {
            let user = firebase.auth().currentUser;
            user.sendEmailVerification().then(() =>{
                ToastAndroid.show("You have been sent a verification email", ToastAndroid.SHORT);
                this.setState({modalSignUpVisible: false});
            });
            firebase.database().ref("users/" + user.uid).set({
                firstName: this.state.signUpFirstName,
                lastName: this.state.signUpLastName,
                phone: this.state.signUpPhone,
                email: this.state.signUpEmail
            }).then();
        });
    }

    signIn(){

       /* if(this.state.signInEmail==='' || this.state.signInPassword===''){
            ToastAndroid.show("Your email and password are invalid.", ToastAndroid.SHORT);
            return;
        }*/
       //todo: change back
        firebase.auth().signInWithEmailAndPassword(/*this.state.signInEmail*/"lampentimothy42@gmail.com", /*this.state.signInPassword*/"pancakes123").then(() => {
            //navigate to new screen
            ToastAndroid.show("You have been signed in.", ToastAndroid.SHORT);
            this.props.navigation.navigate("ViewListing");
        }).catch((error) => {
            console.log(error.code);
            switch(error.code){
                case "auth/wrong-password": {
                    ToastAndroid.show("That email and password combination do not match our records.", ToastAndroid.SHORT);
                    break;
                }
                default:
                    break;
            }
        })
    }

    validateText(type, text){
        switch(type.toLowerCase()) {
            case "email": {
                if(text.indexOf('@')==-1 || text.indexOf('.')==-1){
                    this.setState({
                        emailError: 'The email you have entered is not valid.',
                        signInEmail: ''
                    });
                    return;
                }
                if(this.state.emailError.length > 0)
                    this.setState({
                        emailError: '',
                    });
                this.setState({
                    signInEmail: text
                });
                break;
            }
            case "resetpasswordemail": {
                if(text.indexOf('@')==-1 || text.indexOf('.')==-1){
                    this.setState({
                        resetPasswordEmailError: 'The email you have entered is not valid.',
                        resetPasswordEmail: ''
                    });
                    return;
                }
                if(this.state.resetPasswordEmailError.length > 0)
                    this.setState({
                        resetPasswordEmailError: ''
                    });
                this.setState({
                    resetPasswordEmail: text
                });
                break;
            }
            case "signupemail": {
                if(text.indexOf('@')==-1 || text.indexOf('.')==-1){
                    this.setState({
                        modalEmailError: 'The email you have entered is not valid.',
                        signUpEmail: ''
                    });
                    return;
                }
                if(this.state.modalEmailError.length > 0)
                    this.setState({
                        modalEmailError: ''
                    });
                this.setState({
                    signUpEmail: text
                });
                break;
            }
            case "signupphone": {
                if(text.isNaN || text.length < 10){
                    this.setState({
                        modalPhoneError: 'The phone number you have entered is not valid.',
                        signUpPhone: ''
                    });
                    return;
                }
                if(this.state.modalPhoneError.length > 0)
                    this.setState({
                        modalPhoneError: ''
                    });
                this.setState({
                    signUpPhone: text
                });
                break;
            }
        }
    }
}

const signInStyles = StyleSheet.create({
    modalErrorText: {
        fontSize: wp(3),
        color: '#e94f37',
        marginLeft: wp(4),
        marginBottom: hp(-2)
    },
    errorText: {
        fontSize: wp(3),
        color: '#e94f37'
    },
    portfolioOptionsContainer: {
        marginTop: hp(3),
        width: wp(80),
        flexDirection: 'row',
    },
    forgotPassword: {
        color: '#A0A0A0',
    },
    createAccount: {
        color: '#A0A0A0',
        position: 'absolute',
        right: 0,
        textDecorationLine: 'underline'
    },
    oauthContainer: {
        marginTop: hp(3),
        flexDirection: 'row'
    },
    oauthOption: {
        flex: 1,
        width: wp(5),
        height: hp(7),
        backgroundColor: 'blue',
        marginRight: wp(2)
    },
    spacerContainer: {
        alignItems: 'center'
    },
    spacer: {
        height: hp(.25),
        width: wp(60),
        marginTop: hp(3),
        backgroundColor: '#e94f37',
    },
    signUpButton: {
        backgroundColor: '#e94f37',
        width: wp(80),
        height: hp(6),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: wp(1),
        marginTop: hp(3),
        marginBottom: hp(5)
    },
    signInContainer: {
        marginLeft: wp(5),
        width: wp(80),
    },
    signUpContainer: {
        width: wp(80),
        height: hp(40)
    },
    headerContainer: {
        alignItems: 'center',
        marginTop: hp(20),
        backgroundColor: '#E94F37',
        width: wp(95),
        height: hp(20),
        borderRadius: wp(1),
        paddingTop: hp(3)
    },
    headerTitle: {
        fontSize: wp(15),
        fontWeight: "bold",
        color: "#FFFFFA",
        margin: 'auto'
    },
    headerSubTitle: {
        fontSize: wp(4),
        marginTop: hp(-1),
        color: "#FFFFFA",
        margin: 'auto'

    }
});