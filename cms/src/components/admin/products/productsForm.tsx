import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import firebase from '../../../services/firestore';

/* Components */
import ReactDropzone from '../../utils/reactDropzone';

/* Functions */
import uplaodImage from '../../../functions/uploadImage';

const ADD_PRODUCT = gql`    
    mutation CreateProduct($name: String!, $price: Float!, $image: String) {
        createProduct(input: {name: $name, price: $price, image: $image}){
            name
            price
        }
    }
`;

const ProductsForm: React.FC = () => {
    const [productName, setProductName] = useState<string>('');
    const [productPrice, setProductPrice] = useState<string>('');
    const [ImageFiles, setImageFiles] = useState<Array<File>>([]);
    const [status, setSatus] = useState<string>('Vul de onderstaande velden in:');
    const [createProductMutation, { error }] = useMutation(ADD_PRODUCT);

    const capitalize = (s: string) => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
    }

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        setSatus('Saving data to database...');
        uplaodImage(ImageFiles, "ProductImages", setSatus).then(async(imageUrl)=>{
            if (imageUrl !== null)
                await createProductMutation({ variables: { name: productName, price: Number(productPrice), image: imageUrl } });
                setProductName('');
                setProductPrice('');
                setImageFiles([]);
                setSatus(`${productName} is toegevoegd!`);
        });
        setTimeout(() => { 
            setSatus('Vul de onderstaande velden in:') 
        }, 5000);
    }

    return (
        <form onSubmit={handleSubmit}>
            {error ? <p>Oh no! {error.message}</p> : null}
            <div className="form-status">
                <span>{status}</span>
            </div>
            <div className="form-fields">
                <div className="form-group">
                    <label htmlFor="email">Naam product</label>
                    <input
                        type="text"
                        value={productName}
                        onChange={e => setProductName(capitalize(e.target.value))}
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
                <div className="form-group">
                    <label htmlFor="password">Foto product</label>
                    <ReactDropzone files={ImageFiles} setImageFiles={setImageFiles} />
                </div>
                <button className="button button--primary">
                    <span>Aanmaken</span>
                </button>
            </div>
        </form>
    )
}

export default ProductsForm;