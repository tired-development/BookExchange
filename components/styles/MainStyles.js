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
        alignItems:'center'
    },
    headerTitle: {
        fontSize: wp(11),
        color: '#FFFFFA',
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: hp(7)
    },
    headerSubTitle: {
        fontSize: wp(4),
        color: '#FFFFFA',
        textAlign: 'center',
        width: wp(75)
    },
    button: {
        backgroundColor: '#e94f37',
        width: wp(85),
        height: hp(6),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: wp(1),
    },
    buttonText: {
        fontWeight: 'bold',
        color: "#fffffa",
        fontSize: wp(6)
    }
});