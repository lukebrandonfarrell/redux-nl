/**
 * @author Luke Brandon Farrell
 * @description This build our action type
 * for a specific path with the Response suffix
 * i.e. GET /fetch -> FetchFactsResponse
 */

import { getReduxActionType } from "./get-redux-action-type";
import { RestVerbType } from "./rest-verbs";

/**
 * Gets our reducer value key from type for Response
 *
 * @param {string} verb
 * @param {string} path
 *
 * @return {string}
 */
export function getResponseType(verb: RestVerbType, path: string) {
  return getReduxActionType(verb, path, "Response");
}
