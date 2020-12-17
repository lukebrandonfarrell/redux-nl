"use strict";
/**
 * @author Luke Brandon Farrell
 * @description This build our action type
 * for a specific path with the Response suffix
 * i.e. GET /fetch -> FetchFactsResponse
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResponseType = void 0;
const get_redux_action_type_1 = require("./get-redux-action-type");
/**
 * Gets our reducer value key from type for Response
 *
 * @param {string} verb
 * @param {string} path
 *
 * @return {string}
 */
function getResponseType(verb, path) {
    return get_redux_action_type_1.getReduxActionType(verb, path, "Response");
}
exports.getResponseType = getResponseType;
