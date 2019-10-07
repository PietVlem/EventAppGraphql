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
    const [createProductMutation, { error, data }] = useMutation(ADD_PRODUCT);

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        uplaodFile().then((imageUrl)=>{
            createProductMutation({ variables: { name: productName, price: Number(productPrice), image: imageUrl } });
        });
    }

    const uplaodFile = async () => {
        let imageUrl: string = '';
        if (ImageFiles.length === 0) {
            return console.error('No Files to upload!');
        }
        // Get file and create file name
        const file = ImageFiles[0];
        const currentImageName = file.name.substring(0, file.name.length - 4) + '-' + Date.now();
        // Upload file to firebase
        await firebase.storage().ref(`ProductImages/${currentImageName}`).put(file);
        // Get filename of the uploaded image
        await firebase.storage().ref('ProductImages').child(currentImageName).getDownloadURL().then(url => {
            console.table({ "data: ": url, 'type:': typeof (url) });
            imageUrl = url;
        })
        return imageUrl;
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
                <div className="form-group">
                    <label htmlFor="password">Foto product</label>
                    <ReactDropzone setImageFiles={setImageFiles} />
                </div>
                <button className="button button--primary">
                    <span>Aanmaken</span>
                </button>
            </div>
        </form>
    )
}


export default ProductForm;