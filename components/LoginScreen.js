import React from 'react';
import {StyleSheet, Text, View, TextInput, TouchableWithoutFeedback, Alert} from "react-native";
import {heightPercentageToDP, widthPercentageToDP} from "react-native-responsive-screen";
import { SocialIcon } from "react-native-elements";
import { mainStyles } from './styles/MainStyles';

export default class LoginScreen extends React.Component
{
    render() {
        return (
            <View style={mainStyles.background}>
                <LoginOptions/>
            </View>
        );
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
                        style={[optionStyles.optionButton, {marginTop:heightPercentageToDP(24)}]}
                        type={"twitter"}
                    />
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback>
                    <SocialIcon
                        title={"Facebook"}
                        button
                        fontWeight={"bold"}
                        fontStyle={optionStyles.optionButtonFont}
                        style={[optionStyles.optionButton, {marginTop:heightPercentageToDP(7)}]}
                        type={"facebook"}
                    />
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback>
                    <SocialIcon
                        title={"Google"}
                        button
                        fontWeight={"bold"}
                        fontStyle={optionStyles.optionButtonFont}
                        style={[optionStyles.optionButton, {marginTop:heightPercentageToDP(7)}]}
                        type={"google-plus-official"}
                    />
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback>
                    <SocialIcon
                        title={"Github"}
                        button
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