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
        <ScrollView style={stylesheet.container}>
            <Header />
            <Text style={styles.H1}>Evenementen</Text>
            <Text style={stylesheet.subtitle}>Opkomende</Text>
            {data.events.map(event => (
                <TouchableOpacity key={event.id}>
                    <EventBlock navigateDetails={() => navigate(event)} eventDetails={event} />
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
}

homeScreen.navigationOptions = {
    header: null,
};

const stylesheet = StyleSheet.create({
    container: {
        marginLeft: 20,
        marginRight: 20,
    },
    subtitle: {
        ...styles.H3,
        marginBottom: 30,
    }
})

export default homeScreen

