import admin from 'firebase-admin';
import * as serviceAccountJson from '../../service-account.json';
import uuid from "uuid";

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

async function getProducts(){
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

async function createProduct(parent, {input}){
    const newProduct: Product = {
        "id": uuid(),
        "name": input.name,
        "price": input.price,
        "image": input.image
    }
    await admin.firestore().collection('Products').add(newProduct);
    return newProduct;
}

/*
Export
*/
export default {
    getEvents,
    getEventLocation,
    getProducts,
    createProduct,
}