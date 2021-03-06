import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

/*
Components
*/
import Header from '../components/header';
import PostBlock from '../components/postBlock';
import PostSubscription from '../components/postSubscription';

/*
Constants
*/
import styles from '../constants/style';
import colors from '../constants/colors';

const GET_POSTS = gql`
    {
        posts{
            id
            body
            postedAt
        }
    }
`;

const postsScreen = () => {
    const { loading, error, data } = useQuery(GET_POSTS);

    if (loading)
        return <Text>{'Loading...'}</Text>;
    if (error)
        return <Text>{`Error! ${error.message}`}</Text>;

    return (
        <View style={stylesheet.container}>
            <Header title="Berichten"/>
            <ScrollView style={stylesheet.postsWrapper}>
                <PostSubscription />
                {data.posts.map(post => (
                    <PostBlock key={post.id} post={post}/>
                ))}
                <View style={stylesheet.bottomSpace} />
            </ScrollView>
        </View>
    );
}

postsScreen.navigationOptions = {
    header: null,
};

const stylesheet = StyleSheet.create({
    container:{
        backgroundColor: colors.app_black,
        flex: 1,
    },
    postsWrapper:{
        padding: 20,
        marginBottom: 60,
    },
    bottomSpace:{
        height: 40,
    }
})

export default postsScreen
