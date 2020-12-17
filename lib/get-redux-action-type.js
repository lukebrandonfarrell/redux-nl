"use strict";
/**
 * @author Luke Brandon Farrell
 * @description
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReduxActionType = void 0;
const lodash_startcase_1 = __importDefault(require("lodash.startcase"));
const get_redux_action_verb_1 = require("./get-redux-action-verb");
/**
 * Gets our reducer value key from type
 *
 * @param {string} verb
 * @param {string} path
 * @param {string} suffix
 *
 * @return {string}
 */
function getReduxActionType(verb, path, suffix) {
    const actionVerb = get_redux_action_verb_1.getReduxActionVerb(verb);
    const pathAsActionType = lodash_startcase_1.default(path).replace(/\s/g, '');
    return `@ReduxNL/${actionVerb}${pathAsActionType}${suffix}`;
}
exports.getReduxActionType = getReduxActionType;
