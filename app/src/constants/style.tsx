import { StyleSheet } from 'react-native';
import colors from './colors';

export default StyleSheet.create({
    H1: {
        fontSize: 52,
        fontWeight: "bold",
        color: colors.app_black,
        paddingBottom: 20,
        fontFamily: 'NeoSansPro-Bold',
    },
    H2: {
        fontSize: 32,
        color: colors.app_black,
        fontWeight: "100",
        fontFamily: 'Raleway-Light',
    },
    H3: {
        fontSize: 20,
        fontWeight: "bold",
        color: colors.app_black,
        fontFamily: 'Raleway-Bold',
    },
    p:{
        fontSize: 20,
        fontFamily: 'Raleway-Regular',
    }
});