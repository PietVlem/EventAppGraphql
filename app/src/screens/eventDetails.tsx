import React from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import Image from 'react-native-scalable-image';
import Emoji from 'react-native-emoji';

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
                <BackArrowHeader goBack={goBack} />
            </View>
            <Image
                width={Dimensions.get('window').width}
                style={stylesheet.image}
                source={{ uri: eventDetails.image }}
            />
            <View style={stylesheet.container}>
                <View style={stylesheet.section}>
                    <View style={stylesheet.titleWrapper}>
                        <Emoji name="tada" style={stylesheet.emoji} />
                        <Text style={styles.H3}>{eventDetails.name}</Text>
                    </View>
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
    container: {
        marginLeft: 20,
        marginRight: 20,
    },
    header:{
        marginLeft: 20,
        marginRight: 20,
    },
    image:{
        height: 500,
        marginBottom: 40,
    },
    section:{
        marginBottom: 40,
    },
    emoji:{
        fontSize: 20,
        marginRight: 20,
    },
    titleWrapper: {
        flexDirection: 'row',
        borderBottomColor: colors.app_black,
        borderBottomWidth: 1,
        paddingBottom: 7,
        marginBottom: 20,
    },
    sectionTitle:{
       
    },
})

export default eventDetails
