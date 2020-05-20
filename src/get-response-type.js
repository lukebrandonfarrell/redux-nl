/**
 * @author Luke Brandon Farrell
 * @description
 */

import { getActionType } from "./get-action-type";

/**
 * Gets our reducer value key from type for RESPONSE
 *
 * @param {string} verb
 * @param {string} path
 *
 * @return {string}
 */
export function getResponseType(verb, path) {
  return getActionType(verb, path, "RESPONSE");
}
