import React from 'react';
import {StyleSheet, ScrollView, TouchableOpacity, TouchableWithoutFeedback, TouchableHighlight, Text, Image, View, Modal} from 'react-native';
import {mainStyles} from './styles/MainStyles.js'
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import { SocialIcon } from "react-native-elements/src/index";
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {Sae, Isao} from 'react-native-textinput-effects';


export default class HomeScreen extends React.Component {
    render() {
        return (
            <View style={[mainStyles.background, signInStyles.background]}>
                <Header/>
                <SignIn/>
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

    componentWillMount() {
        console.log("testsest")
    }

    constructor(props) {
        super(props);
        this.state = {
            emailError: '',
            passwordError: '',
            modalSignUpVisible: false,
            modalForgotPasswordVisible: false,
            modalPhoneError: '',
            modalEmailError: '',
            modalPasswordError: ''
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
                    />
                    <Text style={signInStyles.errorText}>{this.state.passwordError}</Text>

                </View>
                <View style={{alignItems: 'center'}}>
                    <TouchableOpacity onPress={() => this.refs.signUpModal.open()}>
                        <View style={signInStyles.signInButton}>
                            <Text style={signInStyles.signInButtonText}>Sign In</Text>
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
                    visible={this.state.modalForgotPasswordVisible}
                    style={[mainStyles.background, signInStyles.background]}>
                    <TouchableWithoutFeedback onPress={() => this.setState({modalForgotPasswordVisible: false})}>
                        <View style={[mainStyles.background, signInStyles.background]}>
                            <Text style={signInStyles.signUpTitle}>Forgot Your Password?</Text>
                            <View>
                                <Text style={[signInStyles.signUpSubTitle, {width: wp(75)}]}>If you already have an account, enter your email address and we'll send a link to reset your password.</Text>
                            </View>

                            <View style={signInStyles.signUpContainer}>
                                <Isao
                                    label={'Email Address'}
                                    activeColor={'#e94f37'}
                                    borderHeight={4}
                                    inputPadding={16}
                                    labelHeight={24}
                                    passiveColor={'#A0A0A0'}
                                    onChangeText={(text) => this.validateText("modalphone", text)}
                                />
                                <TouchableOpacity onPress={() => this.resetPassword()}>
                                    <View style={signInStyles.signUpButton}>
                                        <Text style={signInStyles.signInButtonText}>Submit</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
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
                        <View style={[mainStyles.background, signInStyles.background]}>
                            <Text style={signInStyles.signUpTitle}>Create Your Account</Text>
                            <View>
                                <Text style={[signInStyles.signUpSubTitle, {width: wp(75)}]}>Creating an account allows you to post, manage, and respond to used textbook ads.</Text>
                            </View>

                            <ScrollView style={signInStyles.signUpContainer}>
                                <View style={{flexDirection: 'row'}}>
                                    <View style={{width: wp(40)}}>
                                        <Isao
                                            label={'First Name'}
                                            activeColor={'#e94f37'}
                                            borderHeight={4}
                                            inputPadding={16}
                                            labelHeight={24}
                                            passiveColor={'#A0A0A0'}
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
                                    onChangeText={(text) => this.validateText("modalphone", text)}
                                />
                                <Text style={signInStyles.modalErrorText}>{this.state.modalEmailError}</Text>
                                <Isao
                                    label={'Email Address'}
                                    activeColor={'#e94f37'}
                                    borderHeight={4}
                                    inputPadding={16}
                                    labelHeight={24}
                                    passiveColor={'#A0A0A0'}
                                    onChangeText={(text) => this.validateText("modalemail", text)}
                                />
                                <Isao
                                    label={'Password'}
                                    activeColor={'#e94f37'}
                                    borderHeight={4}
                                    inputPadding={16}
                                    labelHeight={24}
                                    passiveColor={'#A0A0A0'}
                                    secureTextEntry={true}
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
                                />
                                <TouchableOpacity onPress={() => this.signUp()}>
                                    <View style={signInStyles.signUpButton}>
                                        <Text style={signInStyles.signInButtonText}>Sign Up</Text>
                                    </View>
                                </TouchableOpacity>
                            </ScrollView>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>

            </View>
        )
    }

    resetPassword(){}

    signUp(){}

    signIn(){}

    validateText(type, text){
        switch(type.toLowerCase()) {
            case "email": {
                if(text.indexOf('@')==-1 || text.indexOf('.')==-1){
                    this.setState({
                        emailError: 'The email you have entered is not valid.'
                    });
                    return;
                }
                if(this.state.emailError.length > 0)
                    this.setState({
                        emailError: ''
                    });
                break;
            }
            case "modalemail": {
                if(text.indexOf('@')==-1 || text.indexOf('.')==-1){
                    this.setState({
                        modalEmailError: 'The email you have entered is not valid.'
                    });
                    return;
                }
                if(this.state.modalEmailError.length > 0)
                    this.setState({
                        modalEmailError: ''
                    });
                break;
            }
            case "modalphone": {
                if(text.isNaN || text.length < 10){
                    this.setState({
                        modalPhoneError: 'The phone number you have entered is not valid.'
                    });
                    return;
                }
                if(this.state.modalPhoneError.length > 0)
                    this.setState({
                        modalPhoneError: ''
                    })
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
    signUpTitle: {
        fontSize: wp(11),
        color: '#FFFFFA',
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: hp(7)
    },
    signUpSubTitle: {
        fontSize: wp(4),
        color: '#FFFFFA',
        textAlign: 'center'
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
    signInButton: {
        backgroundColor: '#e94f37',
        width: wp(85),
        height: hp(6),
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: hp(4),
        borderRadius: wp(1),
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
    signInButtonText: {
        fontWeight: 'bold',
        color: "#fffffa",
        fontSize: wp(6)
    },
    background: {
        alignItems: 'center'
    },
    signInContainer: {
        marginLeft: wp(5),
        width: wp(80),
    },
    signUpContainer: {
        marginLeft: wp(5),
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