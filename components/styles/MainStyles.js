import { StyleSheet } from 'react-native'
import {heightPercentageToDP, hp, widthPercentageToDP, wp} from "react-native-responsive-screen";

export const mainStyles = StyleSheet.create({
    background: {
        flex: 1,
        width: widthPercentageToDP(100),
        height: heightPercentageToDP(100),
        backgroundColor: '#333138',
    },
    headerContainer: {
        backgroundColor: '#E94F37',
        borderBottomLeftRadius: widthPercentageToDP(15),
        width: widthPercentageToDP(100),
        height: heightPercentageToDP(32)
    },
    headerTitle: {
        fontSize: widthPercentageToDP(15),
        marginTop: heightPercentageToDP(5),
        fontWeight: "bold",
        color: "#FFFFFA",
        marginLeft: widthPercentageToDP(5),
    },
    headerSubTitle: {
        fontSize: widthPercentageToDP(5),
        fontWeight: "bold",
        width: widthPercentageToDP(80),
        marginTop: heightPercentageToDP(2),
        marginLeft: widthPercentageToDP(5),
        color: "#FFFFFA"
    }
});