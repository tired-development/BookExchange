import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableWithoutFeedback,
    Button,
    ToastAndroid,
    TouchableOpacity
} from "react-native";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import { ImagePicker } from 'expo';
import * as firebase from 'firebase';
import 'firebase/firestore';
import uuidv4 from 'uuid';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Fumi } from 'react-native-textinput-effects';
import { mainStyles } from './styles/MainStyles';
import Modal from 'react-native-modalbox';



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
          <View style ={mainStyles.background}>
              <Header/>
              <Inputs callback={this.updatePostState.bind(this)}/>
              <ImageUpload callback={this.updatePostState.bind(this)}/>

              <View style={{alignItems: 'center'}}>
                  <TouchableOpacity onPress={() => this.submitListing()}>
                      <View style={[mainStyles.button, {marginTop: hp(3)}]}>
                          <Text style={mainStyles.buttonText}>Submit Listing</Text>
                      </View>
                  </TouchableOpacity>
              </View>
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

        let uid = await firebase.auth().currentUser.uid;
//
        const postUUID = uuidv4();
        await firebase.database().ref("posts/"+ postUUID).set({
            title: this.state.title,
            description: this.state.description,
            price: this.state.price,
            imageUUID: this.state.imageUUID,
            ownerUID: uid
        }).then(() => {
            ToastAndroid.show("Successfully uploaded post!", ToastAndroid.SHORT);
            this.navigation.navigate('ViewListing')
        });
    }
}


class Header extends React.Component {
    render() {
        return (
            <View>
                <Text style={mainStyles.headerTitle}>Create Listing</Text>
                <View style={{alignItems: 'center'}}>
                    <Text style={mainStyles.headerSubTitle}>Enter the info and upload an image of the textbooks to create a listing.</Text>
                </View>
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
                <Fumi label={'Title'}
                    style={{backgroundColor: '#333138'}}
                    iconClass={FontAwesomeIcon}
                    iconName={'pencil'}
                    inputPadding={16}
                    labelHeight={24}
                    borderHeight={2}
                    width={wp(60)}
                    labelStyle={{color: '#F2545B'}}
                    iconColor={'#F2545B'}
                    onChangeText={(text) => this.validateInput('title', text)}
                />
                <Text style={styles.inputError}>{this.state.titleError}</Text>
                <Fumi label={'Description'}
                      style={{backgroundColor: '#333138'}}
                      iconClass={FontAwesomeIcon}
                      iconName={'align-center'}
                      inputPadding={16}
                      labelHeight={24}
                      borderHeight={2}
                      width={wp(60)}
                      labelStyle={{color: '#F2545B'}}
                      iconColor={'#F2545B'}
                      onChangeText={(text) => this.validateInput('description', text)}
                />
                <Text style={styles.inputError}>{this.state.descriptionError}</Text>
                <Fumi label={'Price'}
                      style={{backgroundColor: '#333138'}}
                      iconClass={FontAwesomeIcon}
                      iconName={'dollar'}
                      inputPadding={16}
                      labelHeight={24}
                      borderHeight={2}
                      width={wp(60)}
                      labelStyle={{color: '#F2545B'}}
                      iconColor={'#F2545B'}
                      onChangeText={(text) => this.validateInput('price', text)}
                />
                <Text style={styles.inputError}>{this.state.priceError}</Text>


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
        let result = await ImagePicker.launchImageLibraryAsync(({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [3.14, 2],
        }));
        if (result.cancelled) {
            return;
        }

        let numOfDots = 0;
        const textRunnable = setInterval(() => {
            if(numOfDots < 3)
                numOfDots++;
            else
                numOfDots = 0;

            let text = "Uploading";
            for(let i = 0; i < numOfDots; i++){
                text += ".";
            }
            this.setState({
                imgText: text
            });
        }, 250);

        const data = await this.uploadImageAsync(result.uri);
        clearInterval(textRunnable);
        console.log(data.toString());
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
    modalButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: hp(3)
    },
    modalButtonSubmit: {
        justifyContent: 'flex-start' ,
    },
    modalButtonSubmitContainer: {
        flex: 1,
        backgroundColor: '#2AAF14',
        width: wp(35),
        height: hp(5)
    },
    modalButtonBack: {
        justifyContent: 'flex-end',

    },
    modalButtonBackContainer: {
        backgroundColor: '#F2545B',
        width: wp(35),
        height: hp(5)
    },
    confirmModal: {
        backgroundColor: '#333138',
        height: hp(30),
        alignItems: 'center'
    },
    confirmModalText: {
        color: '#F7F7F7',
        marginTop: hp(3),
        fontSize: wp(6),
        width: wp(80),
        fontWeight: 'bold',
        textAlign: 'center'
    },
    inputError: {
        color: '#F2545B',
        fontSize: wp(3),
        marginTop: hp(-2),
        marginLeft: wp(15),
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
        marginTop: hp(4)
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
        marginTop: hp(5),
        marginLeft: wp(5),
        alignItems: 'flex-start'
    },
});