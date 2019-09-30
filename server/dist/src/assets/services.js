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
/*
Export
*/
exports.default = {
    getEvents,
    getEventLocation,
    getProducts,
    createProduct,
};
//# sourceMappingURL=services.js.map