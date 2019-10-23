import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

// styles
import colors from '../constants/colors';
import styles from '../constants/style';

interface headerProps {
    title: String
}

const header = ({ title }: headerProps) => {
    return (
        <View style={stylesheet.container}>
            <View style={stylesheet.innerContainer}>
                <Text style={stylesheet.title}>{title}</Text>
            </View>
        </View>
    )
}

const stylesheet = StyleSheet.create({
    container: {
        zIndex: 30,
    },
    innerContainer: {
        ...styles.boxShadow,
        backgroundColor: colors.app_black,
        paddingTop: 80,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    title:{
        ...styles.H1,
        marginLeft: 35,
    },
})

export default header
