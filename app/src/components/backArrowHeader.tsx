import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

/*
Constants
*/
import colors from '../constants/colors';

interface backArrowHeaderProps {
    goBack: Function
}

const backArrowHeader = ({ goBack }: backArrowHeaderProps) => {
    return (
        <TouchableOpacity
            style={stylesheet.container}
            onPress={() => goBack()}
        >
            <FontAwesome name="long-arrow-left" size={33} color={colors.app_primary} />
        </TouchableOpacity>
    );
}

const stylesheet = StyleSheet.create({
    container: {
        marginTop: 80,
        marginBottom: 50,
    },
})

export default backArrowHeader
