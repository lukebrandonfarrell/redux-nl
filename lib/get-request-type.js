"use strict";
/**
 * @author Luke Brandon Farrell
 * @description This build our action type
 * for a specific path with the Request suffix
 * i.e. GET /fetch -> FetchFactsRequest
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRequestType = void 0;
const get_redux_action_type_1 = require("./get-redux-action-type");
/**
 * Gets our reducer value key from type for Request
 *
 * @param {string} verb
 * @param {string} path
 *
 * @return {string}
 */
function getRequestType(verb, path) {
    return get_redux_action_type_1.getReduxActionType(verb, path, "Request");
}
exports.getRequestType = getRequestType;
