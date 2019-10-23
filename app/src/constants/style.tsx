import { StyleSheet } from 'react-native';
import colors from './colors';

export default StyleSheet.create({
    H1: {
        fontSize: 33,
        fontWeight: "bold",
        color: colors.app_primary,
        paddingBottom: 20,
        fontFamily: 'Raleway-Black',
        textTransform: 'uppercase',
    },
    H2: {
        fontSize: 24,
        color: colors.app_primary,
        fontFamily: 'Raleway-Bold',
        paddingBottom: 20,
    },
    H3: {
        fontSize: 24,
        fontWeight: "bold",
        color: colors.app_black,
        fontFamily: 'Raleway-Bold',
    },
    H4: {
        fontFamily: 'Raleway-Black',
        color: colors.app_white,
        fontSize: 20,
        lineHeight: 24
    },
    p:{
        fontSize: 20,
        lineHeight: 28,
        fontFamily: 'Raleway-Regular',
        color: colors.app_white,
    },
    boxShadow:{
        shadowOffset: { width: 0, height: 0, },
        shadowColor: 'black',
        shadowOpacity: 0.5,
        shadowRadius: 10,
    }
});