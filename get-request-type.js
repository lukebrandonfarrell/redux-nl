/**
 * @author Luke Brandon Farrell
 * @description
 */

import { getActionType } from "./get-action-type";

/**
 * Gets our reducer value key from type for REQUEST
 *
 * @param {string} verb
 * @param {string} path
 *
 * @return {string}
 */
export function getRequestType(verb, path) {
  return getActionType(verb, path, "REQUEST");
}
