import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Image from 'react-native-scalable-image';

// styles
import colors from '../constants/colors';
import styles from '../constants/style';

/*
Interfaces
*/
import Product from '../interfaces/product';

interface productBlockProps{
    product: Product
}

const productBlock = ({ product }: productBlockProps) => {
    return (
        <View style={stylesheet.container}>
            <View style={stylesheet.imageContainer}>
                <Image
                    height={70}
                    style={stylesheet.image}
                    source={{ uri: product.image }}
                />
            </View>
            <View style={stylesheet.textContainer}>
                <Text style={styles.H3}>{product.name}</Text>
                <Text style={styles.p}>{product.price}</Text>
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
        flex: 1,
        flexDirection: "row",
    },
    imageContainer:{
        flex: 1,
        alignItems: 'center',
    },
    image:{
        flex: 1,
    },
    textContainer:{
        flex: 3,
    },
})

export default productBlock;
