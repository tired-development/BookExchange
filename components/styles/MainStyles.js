import { StyleSheet } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";

export const mainStyles = StyleSheet.create({
    background: {
        flex: 1,
        width: wp(100),
        height: hp(100),
        backgroundColor: '#333138',
    },
    headerContainer: {
        backgroundColor: '#E94F37',
        width: wp(100),
        height: hp(20)
    },
    headerTitle: {
        fontSize: wp(15),
        marginTop: hp(5),
        fontWeight: "bold",
        color: "#FFFFFA",
    },
    headerSubTitle: {
        fontSize: wp(5),
        fontWeight: "bold",
        width: wp(80),
        marginTop: hp(2),
        marginLeft: wp(5),
        color: "#F7F7F7"
    }
});