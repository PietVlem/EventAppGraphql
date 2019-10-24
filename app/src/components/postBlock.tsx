import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

// styles
import colors from '../constants/colors';
import styles from '../constants/style';

const postBlock = (props) => {
    return (
        <View style={stylesheet.container}>
            <Feather
                name="zap"
                size={26}
                style={stylesheet.icon}
                color={colors.app_primary}
            />
            <View>
                <Text style={stylesheet.body}>{props.post.body}</Text>
                <Text style={stylesheet.date}>{props.post.postedAt}</Text>
            </View>
           
        </View>
    )
}

const stylesheet = StyleSheet.create({
    container: {
        ...styles.boxShadow,
        backgroundColor: colors.app_black,
        padding: 20,
        marginBottom: 20,
        borderRadius: 20,
        flexDirection: "row",
    },
    icon:{
        paddingRight: 20,
    },
    body:{
        ...styles.H3,
    },
    date:{
        ...styles.p,
    }
    
})

export default postBlock;
