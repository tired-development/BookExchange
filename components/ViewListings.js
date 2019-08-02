import {Text, TouchableOpacity, TouchableWithoutFeedback, View, Image, FlatList} from "react-native";
import {mainStyles} from "./styles/MainStyles";
import React from "react";
import * as firebase from 'firebase';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modalbox';




export default class ViewListingScreen extends React.Component {
    render() {
        const { navigation } = this.props;


        return (<View style ={mainStyles.background}>
            <Header/>
            <Listings navigation={navigation}/>
        </View>
        );
    }
}

class Header extends React.Component {
    render() {
        return (
            <View>
                <Text style={mainStyles.headerTitle}>Listings</Text>
                <View style={{alignItems: 'center'}}>
                    <Text style={mainStyles.headerSubTitle}>Scroll to view all available listings</Text>
                </View>
            </View>
        );
    }
}

class Listings extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            postData: []
        }
    }

    render() {
        this.downloadListings();
        return (
            <View style={{alignItems: 'center'}}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate("CreateListing")}>
                    <View style={[mainStyles.button, {marginTop: hp(3)}]}>
                        <Text style={mainStyles.buttonText}>Create Listing</Text>
                    </View>
                </TouchableOpacity>
                <View style={{marginTop: hp(5)}}/>
                <FlatList
                    data= {this.state.postData}
                    renderItem = { ({ item }) => (this.renderListing(item.title, item.description, item.price, item.imageUUID))}
                    keyExtractor={(item,index) => item.title}
                    style={{height: hp(60)}}/>
            </View>
        );
    }

    renderListing(title, description, price, imageUUID){
        return (<View style={styles.postContainer}>
            <View style={{alignItems: 'center'}}>
                <Image style={styles.postImage} source={{uri: "https://firebasestorage.googleapis.com/v0/b/bookexchange-f1b95.appspot.com/o/images%2F" + imageUUID + "?alt=media&token=5fa0ec9a-c5a6-446e-b381-1f0b8db8bc2d"}}/>
            </View>
            <Text style={styles.postTitle}>{title}</Text>
            <Text style={styles.postDescription}>{description}</Text>

            <View style={styles.postButtonContainer}>
                <View style={styles.priceSquare}>
                    <Text style={styles.postPrice}>${price}</Text>
                </View>
                <View style={styles.buttonCircle}>
                    <Icon name="envelope" size={wp(10)} color="#fff" />
                </View>
                <View style={styles.buttonCircle}>
                    <Icon name="phone" size={wp(10)} color="#ffffff" />
                </View>
            </View>
        </View>);
    }


    async downloadListings(){
        firebase.database().ref("posts").once("value").then((snapshot) => {

            let posts = [];
            snapshot.forEach((child) => {

                let email = "", phone = "";
                firebase.database().ref("users/" + child.val().ownerUID).once("value", (userSnapshot) => {
                    email = userSnapshot.val().email;
                    phone = userSnapshot.val().phone;
                });
                posts.push({
                    title: child.val().title,
                    description: child.val().description,
                    price: child.val().price,
                    imageUUID: child.val().imageUUID,
                    email: email,
                    phone: phone
                });
            });
            this.setState({postData: posts});
        }, (error) => {
            console.log("the read failed: " + error);
        });
        return null;
    }
}



const styles = {
    postContainer: {
        backgroundColor: "#595959",
        borderRadius: wp(1),
        width: wp(90),
        marginBottom: hp(5),
    },
    postTitle: {
        color: '#FFFFFA',
        fontSize: wp(6.5),
        fontWeight: 'bold',
        marginLeft: wp(5)
    },
    postDescription: {
        color: '#FFFFFA',
        fontSize: wp(4.5),
        marginLeft: wp(5)
    },
    postPrice: {
        color: '#2AAF14',
        fontSize: wp(8),
    },
    postImage: {
        width: wp(80),
        height: hp(25),
        marginTop: hp(2)
    },

    buttonCircle: {
        width: wp(17),
        height: wp(17),
        borderRadius: wp(17)/2,
        backgroundColor: '#333138',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: wp(5)
    },
    priceSquare: {
        height: wp(17),
        width: wp(30),
        backgroundColor: '#333138',
        borderRadius: wp(2),
        justifyContent: 'center',
        alignItems: 'center'
    },
    postButtonContainer: {
        alignItems: 'center',
        marginBottom: hp(2),
        marginLeft: wp(5),
        flexDirection: 'row',
        marginTop: hp(2)
    }
};