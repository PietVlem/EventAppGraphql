import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import firebase from '../../../services/firestore';

/*
Components
*/
import ReactDropzone from '../../utils/reactDropzone';

const ADD_PRODUCT = gql`    
    mutation CreateProduct($name: String!, $price: Float!, $image: String) {
        createProduct(input: {name: $name, price: $price, image: $image}){
            name
            price
        }
    }
`;

const ProductForm: React.FC = () => {
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
        uplaodImage().then(async(imageUrl)=>{
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

    const uplaodImage = async () => {
        let imageUrl;
        if (ImageFiles.length === 0) {
            console.error('No Files to upload!');
            setSatus('U heeft geen image meegegeven.')
            return imageUrl = null;
        }
        /* Get file and create file name */
        const file = ImageFiles[0];
        const currentImageName = file.name.substring(0, file.name.length - 4) + '-' + Date.now();
        /* Upload file to firebase */
        await firebase.storage().ref(`ProductImages/${currentImageName}`).put(file);
        /* Get filename of the uploaded image */
        await firebase.storage().ref('ProductImages').child(currentImageName).getDownloadURL().then(url => {
            imageUrl = url;
        })
        return imageUrl;
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

export default ProductForm;