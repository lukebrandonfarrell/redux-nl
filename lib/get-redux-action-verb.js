"use strict";
/**
 * @author Luke Brandon Farrell
 * @description
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReduxActionVerb = void 0;
const rest_verbs_1 = require("./rest-verbs");
/**
 * Maps a REST verb to our action verb
 *
 * @param verb {"Get"|"Patch"|"Post"|"Delete"|"Put"}
 */
function getReduxActionVerb(verb) {
    switch (verb) {
        case rest_verbs_1.RestVerbs.Get:
            return "Fetch";
        case rest_verbs_1.RestVerbs.Patch:
            return "Update";
        case rest_verbs_1.RestVerbs.Post:
            return "Create";
        case rest_verbs_1.RestVerbs.Delete:
            return "Delete";
        case rest_verbs_1.RestVerbs.Put:
            return "Put";
        default:
            return "Fetch";
    }
}
exports.getReduxActionVerb = getReduxActionVerb;
