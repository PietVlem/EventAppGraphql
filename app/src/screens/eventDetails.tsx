import React, {useEffect} from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import Image from 'react-native-scalable-image';
import Emoji from 'react-native-emoji';
import { Feather } from '@expo/vector-icons';

/*
Components
*/
import BackArrowHeader from '../components/backArrowHeader';

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
        <View>
            <View style={stylesheet.header}>
                <BackArrowHeader goBack={goBack}/>
                <Image
                    width={Dimensions.get('window').width}
                    style={stylesheet.image}
                    source={{ uri: eventDetails.image }}
                />
            </View>
            <View style={stylesheet.container}>
                <View style={stylesheet.quickInfo}>
                    <Text style={stylesheet.eventName}>{eventDetails.name}</Text>
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
                    <Text style={stylesheet.subTitle}>Details</Text>
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
    header:{
        
    },
    image:{
        height: 500,
    },
    eventName:{
        ...styles.H3,
        marginBottom: 20,
    },
    container: {
        position: 'relative',
        backgroundColor: 'white',
        shadowOffset: { width: 0, height: -8, },
        shadowColor: 'black',
        shadowOpacity: 0.05,
        top: -22,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        padding: 20,
        paddingLeft: 40,
        paddingRight: 40,
        zIndex: 2,
    },
    quickInfo:{
        marginTop: 20,
        marginBottom: 40,
    },
    infoBlock:{
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
    },
    infoBlockIcon:{
        marginRight: 20,
        color: colors.app_black,
    },
    address:{
        ...styles.p,
    },
    subTitle:{
        ...styles.H3,
        marginBottom: 20,
    }
})

export default eventDetails
