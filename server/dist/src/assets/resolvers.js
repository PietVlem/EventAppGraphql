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
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const services_1 = __importDefault(require("./services"));
exports.default = {
    Query: {
        events: () => services_1.default.getEvents(),
    },
    Event: {
        location(event) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const location = services_1.default.getEventLocation(event.locationId);
                    return location;
                }
                catch (error) {
                    throw new apollo_server_1.ApolloError(error);
                }
            });
        }
    }
};
//# sourceMappingURL=resolvers.js.map