import admin from 'firebase-admin';
import * as serviceAccountJson from '../../service-account.json';

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
    name: string
    date: string
    start: string
    end: string
    facebook: string
    details: string
    locationID: string
}

interface Location {
    address: String
    city: String
    zipcode: String
    country: String
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

async function getEventLocation(locationId) {
    const eventLocation = await admin
        .firestore()
        .collection('Locations')
        .doc(`${locationId}`)
        .get();
    return eventLocation.data() as Location[];
}

/*
Export
*/
export default {
    getEvents,
    getEventLocation,
}