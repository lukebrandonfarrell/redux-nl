"use strict";
/**
 * @author Luke Brandon Farrell
 * @description
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRESTVerb = void 0;
const rest_verbs_1 = require("./rest-verbs");
/**
 * Maps a action type verb to a Rest verb
 *
 * @param verb {"Fetch"|"Update"|"Create"|"Delete"}
 *
 * @param {"Get"|"Patch"|"Post"|"Delete"}
 */
function getRESTVerb(verb) {
    switch (verb) {
        case "Fetch":
            return rest_verbs_1.RestVerbs.Get;
        case "Update":
            return rest_verbs_1.RestVerbs.Patch;
        case "Create":
            return rest_verbs_1.RestVerbs.Post;
        case "Delete":
            return rest_verbs_1.RestVerbs.Delete;
        case "Put":
            return rest_verbs_1.RestVerbs.Put;
    }
}
exports.getRESTVerb = getRESTVerb;
