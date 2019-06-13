import {Text, TouchableOpacity, ScrollView, View, Image, FlatList} from "react-native";
import {mainStyles} from "./styles/MainStyles";
import React from "react";
import * as firebase from 'firebase';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";



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
                    <Text style={mainStyles.headerSubTitle}>Click on a listing to view more information about it.</Text>
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
                <ScrollView>
                <FlatList
                    data= {this.state.postData}
                    renderItem = { ({ item }) => (this.renderListing(item.title, item.description, item.price, item.imageUUID))}
                    keyExtractor={(item,index) => item.title}/>
                </ScrollView>
            </View>
        );
    }

    renderListing(title, description, price, imageUUID){
        console.log(imageUUID);
        return (<View style={styles.postContainer}>
            <Text style={styles.postTitle}>{title}</Text>
            <Text style={styles.postDescription}>{description}</Text>
            <Text style={styles.postPrice}>${price}</Text>
            <Image style={styles.postImage} source={{uri: "https://firebasestorage.googleapis.com/v0/b/bookexchange-f1b95.appspot.com/o/images%2F" + imageUUID + "?alt=media&token=5fa0ec9a-c5a6-446e-b381-1f0b8db8bc2d"}}/>
        </View>);
    }//
    //<FlatList keyExtractor={(item, index) => index.toString()} data={this.state.postData} renderItem={(item) => {this.renderListing(item.title, item.description, item.price, item.imageUUID)}}/>
//            <Image style={styles.postImage} source={{uri: 'https://firebasestorage.googleapis.com/v0/b/bookexchange-f1b95.appspot.com/o/images%2F02a877b3-a0b2-4ecc-8da2-791b09945d82?alt=media&token=c5daeb2b-e54c-471c-98f8-5ff950db0261'}} />
    async downloadListings(){
        firebase.database().ref("posts").once("value").then((snapshot) => {

            let posts = [];
            snapshot.forEach((child) => {
                posts.push({
                    title: child.val().title,
                    description: child.val().description,
                    price: child.val().price,
                    imageUUID: child.val().imageUUID
                });
            });
            this.setState({postData: posts});
        }, (error) => {
            console.log("the read failed: " + error)
        });
        return null;
    }
}



const styles = {
    postContainer: {
        backgroundColor: "#595959",
        alignItems: 'center',
        borderRadius: wp(1),
        width: wp(90),
        marginTop: hp(4)
    },
    postTitle: {
        color: '#FFFFFA',
        fontSize: wp(8),
        fontWeight: 'bold'
    },
    postDescription: {
        color: '#FFFFFA',
        fontSize: wp(5),
        paddingLeft: wp(2)
    },
    postPrice: {
        color: '#2AAF14',
        fontSize: wp(6)
    },
    postImage: {
        width: wp(50),
        height: hp(20),
        marginBottom: hp(2)
    }
};