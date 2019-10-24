import React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

/*
Components
*/
import Header from '../components/header';
import ProductBlock from '../components/productBlock';

/*
Constants
*/
import styles from '../constants/style';
import colors from '../constants/colors';

const GET_PRODUCTS = gql`
    {
        products{
            id
            image
            name
            price
        }
    }
`;

const ProductScreen = () => {
    const { loading, error, data } = useQuery(GET_PRODUCTS);

    if (loading)
        return <Text>{'Loading...'}</Text>;
    if (error)
        return <Text>{`Error! ${error.message}`}</Text>;

    return (
        <View style={stylesheet.container}>
            <Header title="Producten"/>
            <ScrollView style={stylesheet.productsWrapper}>
                {data.products.map(product => (
                    <ProductBlock key={product.id} product={product} />
                ))}
                <View style={stylesheet.bottomSpace} />
            </ScrollView>
        </View>
    );
}

ProductScreen.navigationOptions = {
    header: null,
};

const stylesheet = StyleSheet.create({
    container:{
        backgroundColor: colors.app_black,
        flex: 1,
    },
    productsWrapper:{
        padding: 20,
        marginBottom: 60,
    },
    bottomSpace:{
        height: 40,
    }
})

export default ProductScreen
