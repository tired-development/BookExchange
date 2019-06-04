import React from 'react';
import {StyleSheet, Text, View, TextInput, TouchableWithoutFeedback, Button, ToastAndroid} from "react-native";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import { ImagePicker } from 'expo';
import * as firebase from 'firebase';
import 'firebase/firestore';
import uuidv4 from 'uuid';
import {Input} from 'react-native-elements';


export default class CreateListingScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: null,
            description: null,
            price: null,
            imageUUID: null,
        }
    }

    render() {
        return (
          <View style ={styles.background}>
              <Header/>
              <Inputs callback={this.updatePostState.bind(this)}/>
              <ImageUpload callback={this.updatePostState.bind(this)}/>

              <TouchableWithoutFeedback onPress={ () => this.submitListing()}>
                  <View style={styles.submitBtn}>
                      <Text style={styles.submitText}>Submit</Text>
                  </View>
              </TouchableWithoutFeedback>
          </View>
        );
    }

    updatePostState(key, value){
        this.setState({
           [key]: value
        });

        console.log("set " + key + " to " + value);
    }

    async submitListing(){
        console.ignoredYellowBox = ['Setting a timer'];
        if(this.state.title==null){
            console.log("This title sucks!");
            return;
        }
        if(this.state.description==null){
            console.log("This desc. sucks!");
            return;
        }
        if(this.state.price==null){
            console.log("This price sucks!");
            return;
        }
//
        const postUUID = uuidv4();
        await firebase.database().ref("posts/"+ postUUID).set({
            title: this.state.title,
            description: this.state.description,
            price: this.state.price,
            imageUUID: this.state.imageUUID
        }).then(() => {
            ToastAndroid.show("Successfully uploaded post!", ToastAndroid.SHORT);
        });
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
            titleError: " ",
            descriptionError: " ",
            priceError: " "
        }
    }

    render() {
        return (
            <View style={styles.inputContainer}>
                <Input leftIcon={{type: 'entypo', name: 'text'}} style={styles.inputStyling} placeholder="Title" errorStyle={{color: 'red'}} errorMessage={this.state.titleError} onChangeText={(text) => this.validateInput("title", text)}/>
                <Input style={styles.inputStyling} placeholder="Description" errorStyle={{color: 'red'}} errorMessage={this.state.descriptionError} onChangeText={(text) => this.validateInput("description", text)}/>
                <Input style={styles.inputStyling} placeholder="Price" errorStyle={{color: 'red'}} errorMessage={this.state.priceError} onChangeText={(text) => this.validateInput("price", text)}/>

            </View>
        )
    }

    validateInput(type, value){
        switch(type){
            case "title": {
                if(value.length < 10) {
                    this.setState({titleError: "You need " + (10 - value.length) + " more characters."});
                    break;
                }
                if(this.state.titleError.length > 0)
                    this.setState({titleError: " "});
                this.props.callback(type, value);
                break;
            }
            case "description": {
                if(value.length < 50) {
                    this.setState({descriptionError: "You need " + (50 - value.length) + " more characters."});
                    break;
                }
                if(this.state.descriptionError.length > 0)
                    this.setState({descriptionError: " "});
                this.props.callback(type, value);
                break;
            }
            case "price": {
                if(isNaN(value)){
                    this.setState({priceError: "Your input is not a number"});
                    break;
                }
                if(this.state.priceError.length > 0)
                    this.setState({priceError: " "});
                this.props.callback(type, value);
                break;
            }
            default:
                break;
        }
    }
}

class ImageUpload extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            uploaded: false,
            imgText: "Upload Image"
        }
    }

    render() {
        let imageUploadStyle = this.state.uploaded ? <Text style={styles.imageUploadedText}>{this.state.imgText}</Text> : <Text style={styles.imageUploadText}>{this.state.imgText}</Text>;
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
            this.setState({
               imgText: "Uploading.."
            });
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

        this.setState({
            uploaded: true,
            imgText: "Image Uploaded"
        });
        this.props.callback("imageUUID", imgUUID);
        return [imgUUID, uri.substring(uri.lastIndexOf("."))];
    }
}



const styles = StyleSheet.create({
    inputStyling: {
      color: '#F2545B'
    },
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
        marginTop: hp(7),
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