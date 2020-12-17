/**
 * @author Luke Brandon Farrell
 * @description This build our action type
 * for a specific path with the Request suffix
 * i.e. GET /fetch -> FetchFactsRequest
 */

import { getReduxActionType } from "./get-redux-action-type";
import { RestVerbType } from "./rest-verbs";

/**
 * Gets our reducer value key from type for Request
 *
 * @param {string} verb
 * @param {string} path
 *
 * @return {string}
 */
export function getRequestType(verb: RestVerbType, path: string) {
  return getReduxActionType(verb, path, "Request");
}
