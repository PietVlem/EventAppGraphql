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

interface Post {
    id: String
    body: String
    postedAt: String
}

/*
Queries
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

async function getLocations() {
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

async function getPosts() {
    const posts = await admin
        .firestore()
        .collection('Posts')
        .get();
    return posts.docs.map(post => post.data()) as Post[];
}

/* 
Mutations
*/
async function createProduct({ input }) {
    const newProduct: Product = {
        "id": uuid(),
        "name": input.name,
        "price": input.price,
        "image": input.image
    }
    await admin.firestore().collection('Products').add(newProduct);
    return newProduct;
}

async function deleteProduct(data) {
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
            name = name.replace('%20', ' ');
            /* Delete firebase storage Image */
            const bucket = admin.storage().bucket(process.env.FIREBASE_BUCKET);
            bucket.deleteFiles({
                prefix: `ProductImages/${name}`
            });
            /* Delete firestore document */
            admin.firestore().collection('Products').doc(productToBeDeleted.id).delete();
            /* Return message after deleting */
            const message = `Product: ${productToBeDeleted.data().name} has been removed`
            console.log(message);
            return message;
        })
        .catch(err => {
            console.log('Error getting documents', err);
        });
}

async function createEvent({ input }) {
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
    return newEvent as Event;
}

async function deleteEvent(data) {
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
            name = name.replace('%20', ' ');
            /* Delete firebase storage Image */
            const bucket = admin.storage().bucket(process.env.FIREBASE_BUCKET);
            bucket.deleteFiles({
                prefix: `EventImages/${name}`
            });
            /* Delete firestore document */
            admin.firestore().collection('Events').doc(EventToBeDeleted.id).delete();
            /* Return message after deleting */
            const message = `Events: ${EventToBeDeleted.data().name} has been removed`
            console.log(message);
            return message;
        })
        .catch(err => {
            console.log('Error getting documents', err);
        });
}

async function createLocation({ input }, {pubsub}) {
    const newLocation: Location = {
        "id": uuid(),
        "name": input.name,
        "address": input.address,
        "city": input.city,
        "country": input.country,
        "zipcode": input.zipcode,
    }
    await admin.firestore().collection('Locations').add(newLocation);
    pubsub.publish('NEW_LOCATION', { newLocation })
    return newLocation as Location;
}

async function deleteLocation(data, { pubsub }) {
    const location = await admin.firestore()
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
            console.log(`Location - ${LocationsToBeDeleted.data().name} - has been removed`);
            const deletedLocation = LocationsToBeDeleted.data();
            pubsub.publish('DELETE_LOCATION', { deletedLocation })
            return deletedLocation as Location;
        })
        .catch(err => {
            console.log('Error getting documents', err);
        });
    return location;
}

async function createPost({ input }, {pubsub}) {
    const newPost: Post = {
        "id": uuid(),
        "body": input.body,
        "postedAt": new Date().toLocaleString(),
    }
    await admin.firestore().collection('Posts').add(newPost);
    pubsub.publish('NEW_POST', { newPost });
    return newPost;
}

async function deletePost(data , {pubsub}) {
    const post = await admin.firestore()
        .collection('Posts')
        .where('id', "==", data.id)
        .get()
        .then(snapshot => {
            if (snapshot.empty) {
                console.log('No matching documents.');
                return;
            }
            const postToBeDeleted = snapshot.docs[0];
            /* Delete firestore document */
            admin.firestore().collection('Posts').doc(postToBeDeleted.id).delete();
            /* Return message after deleting */
            const deletedPost = postToBeDeleted.data();
            console.log(`Post with body - ${postToBeDeleted.data().body} - has been removed`);
            pubsub.publish('DELETE_POST', { deletedPost });
            return deletedPost as Post;
        })
        .catch(err => {
            console.log('Error getting documents', err);
        });
    console.log(post);
    return post;
}

/*
Export
*/
export default {
    // Queries
    getEvents,
    getLocations,
    getProducts,
    getEventLocation,
    getPosts,

    // Mutations
    createProduct,
    deleteProduct,
    createEvent,
    deleteEvent,
    createLocation,
    deleteLocation,
    createPost,
    deletePost,
}