import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import Image from 'react-native-scalable-image';

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

            <View>
                <View style={stylesheet.dateContainer}>
                    <Text style={stylesheet.date}>{day}</Text>
                    <Text style={stylesheet.dateMonth}>{month}</Text>
                </View>
                <Image
                    width={Dimensions.get('window').width - 40}
                    style={stylesheet.image}
                    source={{ uri: eventDetails.image }}
                />
            </View>
            <View style={stylesheet.infoContainer}>
                <Text style={stylesheet.infoTitle}>{eventDetails.name}</Text>
                <Text style={stylesheet.infoDetails}>{eventDetails.start} - {eventDetails.end}{'\n'}{eventDetails.location.name}</Text>
            </View>

        
        </TouchableOpacity>
    )
});

const stylesheet = StyleSheet.create({
    container: {
        ...styles.boxShadow,
        borderRadius: 25,
        backgroundColor: colors.app_black,
        flex:1,
        marginBottom: 20,
    },
    image:{
        borderRadius: 25,
    },
    dateContainer:{
        ...styles.boxShadow,
        backgroundColor: colors.app_black,
        width: 60,
        height: 60,
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        borderRadius: 10,
        position: "absolute",
        top: 20,
        left: 20,
        zIndex: 5,
    },
    date:{
        ...styles.H4,
        color: colors.app_white,
    },
    dateMonth:{
        ...styles.H4,
        color: colors.app_primary,
    },
    infoContainer:{
        padding: 20,
    },
    infoTitle:{
        ...styles.H2,
        paddingBottom: 5,
    },
    infoDetails:{
        ...styles.p,
    }
})

export default eventSmall
