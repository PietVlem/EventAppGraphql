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
        fontSize: 24,
        fontWeight: "bold",
        color: colors.app_black,
        fontFamily: 'Raleway-Bold',
    },
    H4: {
        fontSize: 20,
        fontWeight: "bold",
        color: colors.app_black,
        fontFamily: 'Raleway-Bold',
    },
    p:{
        fontSize: 20,
        lineHeight: 28,
        fontFamily: 'Raleway-Regular',
    },
    boxShadow:{
        shadowOffset: { width: 0, height: 0, },
        shadowColor: 'black',
        shadowOpacity: 0.08,
        shadowRadius: 10,
    }
});