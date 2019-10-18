import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

/*
Constants
*/
import colors from '../constants/colors';
import styles from '../constants/style';

interface backArrowHeaderProps {
    goBack: Function
}

const backArrowHeader = ({ goBack }: backArrowHeaderProps) => {
    return (
        <TouchableOpacity
            style={stylesheet.container}
            onPress={() => goBack()}
        >
            <FontAwesome name="chevron-left" size={20} color={colors.app_black} />
        </TouchableOpacity>
    );
}

const stylesheet = StyleSheet.create({
    container: {
        ...styles.boxShadow,
        position: "absolute",
        width: 50,
        height: 50,
        backgroundColor: 'white',
        borderRadius: 25,
        top: 40,
        left: 40,
        zIndex: 100,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default backArrowHeader
