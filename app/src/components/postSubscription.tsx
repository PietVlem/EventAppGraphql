
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSubscription } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const SUBSCRIPTION_POSTS = gql`
    subscription{
        newPost{
            id
            body
            postedAt
        }
    }
`;

const PostSubscription = () => {
    const { loading, error, data } = useSubscription(SUBSCRIPTION_POSTS);
    if (error)
        return <Text>{`Error! ${error.message}`}</Text>;
    return <Text>New post: {!loading && data.newPost.body}</Text>;
}

export default PostSubscription;
