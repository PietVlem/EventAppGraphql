import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

/*
Constants
*/
import colors from '../constants/colors';
import styles from '../constants/style';

interface backArrowHeaderProps {
    goBack: Function
}

const backArrowButton = ({ goBack }: backArrowHeaderProps) => {
    return (
        <TouchableOpacity
            style={stylesheet.container}
            onPress={() => goBack()}
        >
            <Feather name="chevron-left" size={33} color={colors.app_primary} />
        </TouchableOpacity>
    );
}



const stylesheet = StyleSheet.create({
    container: {
        ...styles.boxShadow,
        backgroundColor: colors.app_black,
        position: "absolute",
        width: 50,
        height: 50,
        borderRadius: 25,
        top: 40,
        left: 40,
        zIndex: 100,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default backArrowButton
