const services = require('./services');

module.exports = {
    Query: {
        books: () => services.getBooks(),
    },
};