/**
 * @author Luke Brandon Farrell
 * @description
 */
import { RestVerbType } from "./rest-verbs";
/**
 * Gets our reducer value key from type
 *
 * @param {string} verb
 * @param {string} path
 * @param {string} suffix
 *
 * @return {string}
 */
export declare function getReduxActionType(verb: RestVerbType, path: string, suffix: string): string;
