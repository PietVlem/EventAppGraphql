"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const error_1 = require("graphql/error");
const language_1 = require("graphql/language");
const DateTime = new graphql_1.GraphQLScalarType({
    name: 'DateTime',
    description: 'Use JavaScript Date object for date/time fields.',
    serialize(value) {
        let v = value;
        if (!(v instanceof Date) && typeof v !== 'string' && typeof v !== 'number') {
            throw new TypeError(`Value is not an instance of Date, Date string or number: ${v}`);
        }
        if (typeof v === 'string') {
            v = new Date();
            v.setTime(Date.parse(value));
        }
        else if (typeof v === 'number') {
            v = new Date(v);
        }
        if (Number.isNaN(v.getTime())) {
            throw new TypeError(`Value is not a valid Date: ${v}`);
        }
        return v.toJSON();
    },
    parseValue(value) {
        const date = new Date(value);
        if (Number.isNaN(date.getTime())) {
            throw new TypeError(`Value is not a valid Date: ${value}`);
        }
        return date;
    },
    parseLiteral(ast) {
        if (ast.kind !== language_1.Kind.STRING && ast.kind !== language_1.Kind.INT) {
            throw new error_1.GraphQLError(`Can only parse strings & integers to dates but got a: ${ast.kind}`);
        }
        const result = new Date(ast.kind === language_1.Kind.INT ? Number(ast.value) : ast.value);
        if (Number.isNaN(result.getTime())) {
            throw new error_1.GraphQLError(`Value is not a valid Date: ${ast.value}`);
        }
        if (ast.kind === language_1.Kind.STRING && ast.value !== result.toJSON()) {
            throw new error_1.GraphQLError(`Value is not a valid Date format (YYYY-MM-DDTHH:MM:SS.SSSZ): ${ast.value}`);
        }
        return result;
    },
});
exports.default = DateTime;
//# sourceMappingURL=dateTime.js.map