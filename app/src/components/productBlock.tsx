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
            <View>
                <Image
                    height={65}
                    style={stylesheet.image}
                    source={{ uri: product.image }}
                />
            </View>
            <View>
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
        flexDirection: "row",
    },
    image:{

    }
})

export default productBlock;
