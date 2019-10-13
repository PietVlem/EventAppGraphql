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
    locationId: String
    image: String
}

interface Location {
    id: String
    name: String,
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

async function getLocations(){
    const locations = await admin
    .firestore()
    .collection('Locations')
    .get();
return locations.docs.map(location => location.data()) as Location[];
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

async function createEvent(parent, {input}){
    const newEvent: Event = {
        "id": uuid(),
        "name": input.name,
        "date": input.date,
        "image": input.image,
        "start": input.start,
        "end": input.end,
        "facebook": input.facebook,
        "details": input.details,
        "locationId": input.locationId,
    }
    await admin.firestore().collection('Events').add(newEvent);
    return newEvent;
}

async function deleteEvent(parent, data){
    await admin.firestore()
    .collection('Events')
    .where('id', "==", data.id)
    .get()
    .then(snapshot => {
        if (snapshot.empty) {
            console.log('No matching documents.');
            return;
        }
        const EventToBeDeleted = snapshot.docs[0];
        const imagePath = snapshot.docs[0].data().image;
        /* Get filename from Download-url */
        let name = imagePath.substr(imagePath.indexOf('%2F') + 3, (imagePath.indexOf('?')) - (imagePath.indexOf('%2F') + 3));
        name = name.replace('%20',' '); 
        /* Delete firebase storage Image */
        const bucket = admin.storage().bucket(process.env.FIREBASE_BUCKET);
        bucket.deleteFiles({
            prefix: `EventImages/${name}`
        });
        /* Delete firestore document */
        admin.firestore().collection('Events').doc(EventToBeDeleted.id).delete();
        /* Return message after deleting */
        const message =`Events: ${EventToBeDeleted.data().name} has been removed`
        console.log(message);
        return message;
    })
    .catch(err => {
        console.log('Error getting documents', err);
    });
}

async function createLocation(parent, {input}){
    const newLocation: Location = {
        "id": uuid(),
        "name": input.name,
        "address": input.address,
        "city": input.city,
        "country": input.country,
        "zipcode": input.zipcode,
    }
    await admin.firestore().collection('Locations').add(newLocation);
    return newLocation;
}

async function deleteLocation(parent, data){
    await admin.firestore()
    .collection('Locations')
    .where('id', "==", data.id)
    .get()
    .then(snapshot => {
        if (snapshot.empty) {
            console.log('No matching documents.');
            return;
        }
        const LocationsToBeDeleted = snapshot.docs[0];
        /* Delete firestore document */
        admin.firestore().collection('Locations').doc(LocationsToBeDeleted.id).delete();
        /* Return message after deleting */
        const message =`Locations: ${LocationsToBeDeleted.data().name} has been removed`
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
    getLocations,
    getProducts,
    getEventLocation,
    createProduct,
    deleteProduct,
    createEvent,
    deleteEvent,
    createLocation,
    deleteLocation
}