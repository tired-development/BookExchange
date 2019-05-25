import React from 'react';
import {StyleSheet, Text, View, TextInput} from "react-native";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";


export default class CreateListingScreen extends React.Component {


    render() {
        return (
          <View style ={styles.background}>
              <Header />
              <Inputs />
          </View>
        );
    }
}

class Header extends React.Component {
    render() {
        return (
            <View style={styles.headerContainer}>
                <Text style={styles.headerTitle}>Create Listing</Text>
            </View>
        );
    }
}

class Inputs extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            title: "Title",
            description: "Description",
            price: "Price"
        }
    }

    render() {
        return (
            <View style={styles.inputContainer}>
                <ListingInput defaultName="Title"/>
            </View>
        )
    }
}

/*
* Takes a deafult name.
* */
class ListingInput extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            defaultValue: props.defaultName,
            changedValue: ""
        }
    }

    render() {
        return (
            <View>
                <TextInput style={styles.inputHeader} onFocus={() => this.setState({changedValue: ""})} onChangeText={(text)=> this.setState({changedValue: text})} value={this.state.changedValue==null ? this.state.defaultValue : this.state.changedValue} />
                <View style={styles.lineContainer}>
                    <View style={styles.line} />
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    inputHeader: {
        color: "#F2545B",
        fontSize: wp(5),
        marginLeft: wp(10)
    },
    inputContainer: {
        marginTop: hp(10),

    },
    background: {
        flex: 1,
        width: wp(100),
        height: hp(100),
        backgroundColor: '#333138',
    },
    lineContainer: {
        alignItems: 'center',
        marginBottom: hp(5)
    },
    line: {
        height: 1,
        width: wp(80),
        borderRadius: 1,
        borderColor: "#F2545B",
        backgroundColor: "#F2545B",
    },
    headerContainer: {
        backgroundColor: '#E94F37',
        borderBottomLeftRadius: wp(15),
        width: wp(100),
        height: hp(20),
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerTitle: {
        fontSize: wp(12),
        fontWeight: "bold",
        color: "#FFFFFA",
        marginLeft: wp(5),
    },
});