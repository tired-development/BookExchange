import React from 'react';
import {StyleSheet, Text, View, TextInput, TouchableWithoutFeedback, Alert} from "react-native";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import { ImagePicker } from 'expo';
import * as firebase from 'firebase';
import uuidv4 from 'uuid';

export default class CreateListingScreen extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: null,
            description: null,
            price: null,
            imageUUID: null
        }
    }

    render() {
        return (
          <View style ={styles.background}>
              <Header/>
              <Inputs/>
              <ImageUpload action={this.setImageUUID}/>

              <TouchableWithoutFeedback onPress={ () => this.submitListing()}>
                  <View style={styles.submitBtn}>
                      <Text style={styles.submitText}>Submit</Text>
                  </View>
              </TouchableWithoutFeedback>
          </View>
        );
    }

    setTitle(title){
        this.setState({title: title});
    }

    setDecription(description){
        this.setState({description: description});
    }

    setPrice(price){
        this.setState({price: price});
    }

    setImageUUID(uuid){
        this.setState({imageUUID: uuid});
        console.log("test testt")
    }

    submitListing(){

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

    render() {
        return (
            <View style={styles.inputContainer}>
                <ListingInput defaultValue="Title"/>
                <ListingInput defaultValue="Description"/>
                <ListingInput defaultValue="Price"/>
            </View>
        )
    }
}
/*
* @param defaultName - the name that should be .
* */
class ListingInput extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            inputValue: null
        }
    }

    render() {
        return (
            <View>
                <TextInput style={styles.inputHeader} onEndEditing={() => this.returnToDefault()} onFocus={() => this.setState({inputValue: ""})} onChangeText={(text)=> this.setState({inputValue: text})} value={this.state.inputValue==null ? this.props.defaultValue : this.state.inputValue} />
                <View style={styles.lineContainer}>
                    <View style={styles.line} />
                </View>
            </View>
        )
    }

    returnToDefault(){
        if(this.state.inputValue==null || this.state.inputValue===""){
            this.setState({inputValue: this.props.defaultValue});
        }
    }
}

class ImageUpload extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            uploaded: false,
        }
    }

    render() {
        let imageUploadStyle = this.state.uploaded ? <Text style={styles.imageUploadedText}>Image Uploaded</Text> : <Text style={styles.imageUploadText}>Upload Image</Text>;
        return(
            <TouchableWithoutFeedback onPress={() => this.chooseImage()}>
                <View style={styles.imageUploadContainer}>
                    <View style={styles.imageUpload}>
                        {imageUploadStyle}
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }

    async chooseImage() {
        let result = await ImagePicker.launchImageLibraryAsync();
        if (!result.cancelled) {
            const data = await this.uploadImageAsync(result.uri);
            console.log(data.toString());
        }
    }

    async uploadImageAsync(uri) {
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function (e) {
                console.log(e);
                reject(new TypeError('Network request failed'));
            };
            xhr.responseType = 'blob';
            xhr.open('GET', uri, true);
            xhr.send(null);
        });
        const imgUUID = uuidv4();
        const ref = firebase.storage().ref().child("images/" + imgUUID);
        await ref.put(blob);
        blob.close();

        console.log(imgUUID + " / " + uri.substring(uri.lastIndexOf(".")))
        this.setState({
            uploaded: true
        });
        this.props.action(imgUUID);
        return [imgUUID, uri.substring(uri.lastIndexOf("."))];
    }
}



const styles = StyleSheet.create({
    imageUploadText: {
        color: '#F2545B',
        fontSize: wp(8),
        fontWeight: 'bold'
    },
    imageUploadedText: {
        color: '#2AAF14',
        fontSize: wp(8),
        fontWeight: 'bold'
    },
    imageUploadContainer: {
        alignItems: "center",
    },
    imageUpload: {
        width: wp(80),
        height: hp(30),
        backgroundColor: "#595959",
        borderRadius: wp(5),
        justifyContent: 'center',
        alignItems: 'center',
    },
    submitBtn: {
        width: wp(100),
        height: hp(7),
        position: "absolute",
        bottom: 0,
        backgroundColor: "#2AAF14",
        alignItems: 'center',
        justifyContent: 'center'
    },
    submitText: {
        fontSize: wp(5),
        fontWeight: 'bold',
        color: "#FFFFFA"
    },
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