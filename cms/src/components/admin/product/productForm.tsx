import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

const ADD_PRODUCT = gql`
    #works => createProductMutation({ variables: { name: productName } });
    #mutation CreateTest($name: String!) {
    #    createTest(name: $name){
    #        name,
    #    }
    #}

    #works in playground & with => createProductMutation()
    #mutation{
    #    createProduct(input: { name: "Drink", price: 2 }) {
    #        name
    #        price
    #    }
    #}

    
    mutation CreateProduct($name: String, $price: Float) {
        createProduct(input: {name: $name, price: $price}){
            name
            price
        }
    }
`;

const ProductForm: React.FC = () => {
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    //const [productImage, setProductImage] = useState('');
    const [createProductMutation, { error, data }] = useMutation(ADD_PRODUCT);

    const handleSubmit = async (event: any) => {
        const product = {
            name: productName,
            price: productPrice
        }
        console.log(product);
        createProductMutation({ variables: { name: productName, price: Number(productPrice) }});
        if(data){
            console.log(data.createProduct.name)
        } 
        event.preventDefault();
    }

    return (
        <form onSubmit={handleSubmit}>
            {error ? <p>Oh no! {error.message}</p> : null}
            <div className="form-fields">
                <div className="form-group">
                    <label htmlFor="email">Naam product</label>
                    <input
                        type="text"
                        value={productName}
                        onChange={e => setProductName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Prijs product</label>
                    <input
                        type="text"
                        value={productPrice}
                        onChange={e => setProductPrice(e.target.value)}
                    />
                </div>
                <button className="button button--primary">
                    <span>Aanmaken</span>
                </button>
            </div>
        </form>
    )
}


export default ProductForm;