import React, {useEffect} from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import Image from 'react-native-scalable-image';
import Emoji from 'react-native-emoji';
import { Feather } from '@expo/vector-icons';

/*
Components
*/
import BackArrowButton from '../components/backArrowButton';

/*
Constants
*/
import styles from '../constants/style';
import colors from '../constants/colors';

const eventDetails = ({ navigation }) => {
    const eventDetails = navigation.getParam('eventDetails', '');
    const goBack = () => {
        navigation.navigate('EventsOverview');
    }

    return (
        <View style={stylesheet.container}>
            <View style={stylesheet.header}>
                <BackArrowButton goBack={goBack}/>
                <Image
                    width={Dimensions.get('window').width}
                    style={stylesheet.image}
                    source={{ uri: eventDetails.image }}
                />
            </View>
            <View style={stylesheet.contentWrapper}>
                <View style={stylesheet.quickInfo}>
                    <Text style={stylesheet.eventName}>{eventDetails.name}</Text>
                    <Text style={stylesheet.infotitle}>Info</Text>
                    <View style={stylesheet.infoBlock}>
                        <Feather
                            name='calendar'
                            size={26}
                            style={stylesheet.infoBlockIcon}
                        />
                        <Text style={styles.H4}>{eventDetails.date}</Text>
                    </View>
                    <View style={stylesheet.infoBlock}>
                        <Feather
                            name='clock'
                            size={26}
                            style={stylesheet.infoBlockIcon}
                        />
                        <Text style={styles.H4}>{eventDetails.start} - {eventDetails.end}</Text>
                    </View>
                    <View style={stylesheet.infoBlock}>
                        <Feather
                            name='map-pin'
                            size={26}
                            style={stylesheet.infoBlockIcon}
                        />
                        <View>
                            <Text style={styles.H4}>{eventDetails.location.name}</Text>
                            <Text style={stylesheet.address}>{eventDetails.location.address}{'\n'}{eventDetails.location.zipcode} {eventDetails.location.city}</Text>
                        </View>
                    </View>
                </View>
                <View>
                    <Text style={styles.H2}>Details</Text>
                    <Text style={styles.p}>{eventDetails.details}</Text>
                </View>
            </View>
            
        </View>
    )
}

eventDetails.navigationOptions = {
    header: null,
};

const stylesheet = StyleSheet.create({
    container:{
        backgroundColor: colors.app_black,
        flex: 1,
    },
    header:{
        
    },
    image:{
        height: 500,
    },
    eventName:{
        ...styles.H1,
        paddingBottom: 40,
    },
    contentWrapper: {
        ...styles.boxShadow,
        position: 'relative',
        backgroundColor: colors.app_black,
        top: -22,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        padding: 20,
        paddingLeft: 40,
        paddingRight: 40,
        zIndex: 2,
        flex: 1,
    },
    quickInfo:{
        marginTop: 20,
        marginBottom: 40,
    },
    infotitle:{
        ...styles.H2,
    },
    infoBlock:{
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
    },
    infoBlockIcon:{
        marginRight: 20,
        color: colors.app_white,
    },
    address:{
        ...styles.p,
        color: colors.app_white,
    },
    subTitle:{
        ...styles.H3,
        marginBottom: 20,
    }
})

export default eventDetails
