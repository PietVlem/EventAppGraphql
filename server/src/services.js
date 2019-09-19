const admin = require("firebase-admin");
const serviceAccount = require('../service-account.json');

/*
Firestore
*/
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})
let db = admin.firestore();

/*
Functions
*/
async function getBooks(){
    const books = await admin
        .firestore()
        .collection('Books')
        .get();
    return books.docs.map(book => book.data());
}

/*
Export
*/
module.exports = {
    getBooks,
}