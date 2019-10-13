"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const serviceAccountJson = __importStar(require("../../service-account.json"));
const uuid_1 = __importDefault(require("uuid"));
require('dotenv').config();
/*
Firestore
*/
const serviceAccount = serviceAccountJson;
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(serviceAccount)
});
/*
Functions
*/
function getEvents() {
    return __awaiter(this, void 0, void 0, function* () {
        const events = yield firebase_admin_1.default
            .firestore()
            .collection('Events')
            .get();
        return events.docs.map(event => event.data());
    });
}
function getProducts() {
    return __awaiter(this, void 0, void 0, function* () {
        const products = yield firebase_admin_1.default
            .firestore()
            .collection('Products')
            .get();
        return products.docs.map(product => product.data());
    });
}
function getLocations() {
    return __awaiter(this, void 0, void 0, function* () {
        const locations = yield firebase_admin_1.default
            .firestore()
            .collection('Locations')
            .get();
        return locations.docs.map(location => location.data());
    });
}
function getEventLocation(locationId) {
    return __awaiter(this, void 0, void 0, function* () {
        const eventLocation = yield firebase_admin_1.default
            .firestore()
            .collection('Locations')
            .doc(`${locationId}`)
            .get();
        return eventLocation.data();
    });
}
function createProduct(parent, { input }) {
    return __awaiter(this, void 0, void 0, function* () {
        const newProduct = {
            "id": uuid_1.default(),
            "name": input.name,
            "price": input.price,
            "image": input.image
        };
        yield firebase_admin_1.default.firestore().collection('Products').add(newProduct);
        return newProduct;
    });
}
function deleteProduct(parent, data) {
    return __awaiter(this, void 0, void 0, function* () {
        yield firebase_admin_1.default.firestore()
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
            const bucket = firebase_admin_1.default.storage().bucket(process.env.FIREBASE_BUCKET);
            bucket.deleteFiles({
                prefix: `ProductImages/${name}`
            });
            /* Delete firestore document */
            firebase_admin_1.default.firestore().collection('Products').doc(productToBeDeleted.id).delete();
            /* Return message after deleting */
            const message = `Product: ${productToBeDeleted.data().name} has been removed`;
            console.log(message);
            return message;
        })
            .catch(err => {
            console.log('Error getting documents', err);
        });
    });
}
function createEvent(parent, { input }) {
    return __awaiter(this, void 0, void 0, function* () {
        const newEvent = {
            "id": uuid_1.default(),
            "name": input.name,
            "date": input.date,
            "image": input.image,
            "start": input.start,
            "end": input.end,
            "facebook": input.facebook,
            "details": input.details,
            "locationId": input.locationId,
        };
        yield firebase_admin_1.default.firestore().collection('Events').add(newEvent);
        return newEvent;
    });
}
function deleteEvent(parent, data) {
    return __awaiter(this, void 0, void 0, function* () {
        yield firebase_admin_1.default.firestore()
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
            const bucket = firebase_admin_1.default.storage().bucket(process.env.FIREBASE_BUCKET);
            bucket.deleteFiles({
                prefix: `EventImages/${name}`
            });
            /* Delete firestore document */
            firebase_admin_1.default.firestore().collection('Events').doc(EventToBeDeleted.id).delete();
            /* Return message after deleting */
            const message = `Events: ${EventToBeDeleted.data().name} has been removed`;
            console.log(message);
            return message;
        })
            .catch(err => {
            console.log('Error getting documents', err);
        });
    });
}
/*
Export
*/
exports.default = {
    getEvents,
    getLocations,
    getProducts,
    getEventLocation,
    createProduct,
    deleteProduct,
    createEvent,
    deleteEvent,
};
//# sourceMappingURL=services.js.map