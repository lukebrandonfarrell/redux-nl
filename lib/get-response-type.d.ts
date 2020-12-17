/**
 * @author Luke Brandon Farrell
 * @description This build our action type
 * for a specific path with the Response suffix
 * i.e. GET /fetch -> FetchFactsResponse
 */
import { RestVerbType } from "./rest-verbs";
/**
 * Gets our reducer value key from type for Response
 *
 * @param {string} verb
 * @param {string} path
 *
 * @return {string}
 */
export declare function getResponseType(verb: RestVerbType, path: string): string;
