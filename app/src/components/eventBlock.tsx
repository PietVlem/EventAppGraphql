import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

/*
Constants
*/
import colors from '../constants/colors';
import styles from '../constants/style';

/*
Interfaces
*/
import Event from '../interfaces/event';


interface EventDetailProps {
    eventDetails: Event,
    navigateDetails: Function
}

const eventSmall = React.memo(({ eventDetails, navigateDetails }: EventDetailProps) => {
    const smallDate = eventDetails.date ? eventDetails.date : '';
    const day = smallDate.substring(0, 2).replace(/\s/g, '');
    const month = smallDate.substring(2).replace(/\s/g, '').substring(0, 3);

    return (
        <TouchableOpacity
            style={stylesheet.container}
            onPress={() => navigateDetails()}
        >
            <View style={stylesheet.dateContainer}>
                <Text style={stylesheet.month}>{month}</Text>
                <Text style={stylesheet.day}>{day}</Text>
            </View>
            <View style={stylesheet.textContainer}>
                <Text style={stylesheet.start}>Start: {eventDetails.start}</Text>
                <Text style={stylesheet.name}>{eventDetails.name}</Text>
            </View>
        </TouchableOpacity>
    )
});

const stylesheet = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        shadowOffset: { width: 2, height: 8, },
        shadowColor: 'black',
        shadowOpacity: 0.04,
        borderRadius: 10,
        marginBottom: 20,
        flexDirection: 'row',
    },
    dateContainer: {
        backgroundColor: colors.app_primary,
        width: 70,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10,
    },
    month: {
        color: 'white',
        fontFamily: 'Raleway-Bold',
        fontSize: 16,
        textTransform: 'uppercase',
    },
    day: {
        color: 'white',
        fontFamily: 'Raleway-Bold',
        fontSize: 24,
    },
    textContainer: {
        padding: 20,
    },
    start:{

    },
    name:{
        ...styles.H3,
        textTransform: "uppercase",
        fontFamily: 'Raleway-Bold',
    },
})

export default eventSmall
