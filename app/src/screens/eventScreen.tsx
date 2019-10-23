import React from 'react'
import { View, ScrollView , Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

/*
GraphQl
*/
import * as queries from '../graphql/queries.graphql';

/*
Components
*/
import Header from '../components/header';
import EventBlock from '../components/eventBlock';

/*
Constants
*/
import styles from '../constants/style';
import colors from '../constants/colors';

const GET_EVENTS = gql`
    {
        events {
            id
            name
            date
            start
            end
            facebook
            details
            image
            location{
                name
                address
                city
                zipcode
                country
            }
        }
    }
`;


const homeScreen = ({ navigation }) => {
    const { loading, error, data } = useQuery(GET_EVENTS);
    const navigate = (event) => {
        navigation.navigate("EventDetails", { 'eventDetails': event });
    }

    if (loading)
        return <Text>{'Loading...'}</Text>;
    if (error)
        return <Text>{`Error! ${error.message}`}</Text>;

    return (
        <View style={stylesheet.container}>
            <Header title="Evenementen" />
            <ScrollView style={stylesheet.eventWrapper}>
                {data.events.map(event => (
                    <TouchableOpacity key={event.id}>
                        <EventBlock navigateDetails={() => navigate(event)} eventDetails={event} />
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}

homeScreen.navigationOptions = {
    header: null,
};

const stylesheet = StyleSheet.create({
    container: {
        backgroundColor: colors.app_black,
    },
    eventWrapper:{
        padding: 20,
    }
})

export default homeScreen

