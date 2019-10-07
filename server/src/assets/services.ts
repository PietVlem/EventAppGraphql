import admin from 'firebase-admin';
import * as serviceAccountJson from '../../service-account.json';
import uuid from "uuid";
require('dotenv').config();

/*
Firestore
*/
const serviceAccount = (<any>serviceAccountJson);
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

/*
Interfaces
*/
interface Event {
    id: String
    name: String
    date: String
    start: String
    end: String
    facebook: String
    details: String
    location: String
    image: String
}

interface Location {
    address: String
    city: String
    zipcode: String
    country: String
}

interface Product {
    id: String
    name: String
    price: Number
    image: String
}

/*
Functions
*/
async function getEvents() {
    const events = await admin
        .firestore()
        .collection('Events')
        .get();
    return events.docs.map(event => event.data()) as Event[];
}

async function getProducts() {
    const products = await admin
        .firestore()
        .collection('Products')
        .get();
    return products.docs.map(product => product.data()) as Product[];
}

async function getEventLocation(locationId) {
    const eventLocation = await admin
        .firestore()
        .collection('Locations')
        .doc(`${locationId}`)
        .get();
    return eventLocation.data() as Location[];
}

async function createProduct(parent, { input }) {
    const newProduct: Product = {
        "id": uuid(),
        "name": input.name,
        "price": input.price,
        "image": input.image
    }
    await admin.firestore().collection('Products').add(newProduct);
    return newProduct;
}

async function deleteProduct(parent, data) {
    await admin.firestore()
        .collection('Products')
        .where('id', "==", data.id)
        .get()
        .then(snapshot => {
            if (snapshot.empty) {
                console.log('No matching documents.');
                return;
            }
            const productToBeDeleted = snapshot.docs[0];
            const imagePath = snapshot.docs[0].data().image;
            /* Get filename from Download-url */
            let name = imagePath.substr(imagePath.indexOf('%2F') + 3, (imagePath.indexOf('?')) - (imagePath.indexOf('%2F') + 3));
            name = name.replace('%20',' '); 
            /* Delete firebase storage Image */
            const bucket = admin.storage().bucket(process.env.FIREBASE_BUCKET);
            bucket.deleteFiles({
                prefix: `ProductImages/${name}`
            });
            // bucket.file(`ProductImages/${name}`).delete();
            /* Delete firestore document */
            admin.firestore().collection('Products').doc(productToBeDeleted.id).delete();
            /* Return message after deleting */
            const message =`Product: ${productToBeDeleted.data().name} has been removed`
            console.log(message);
            return message;
        })
        .catch(err => {
            console.log('Error getting documents', err);
        });
}

/*
Export
*/
export default {
    getEvents,
    getEventLocation,
    getProducts,
    createProduct,
    deleteProduct,
}