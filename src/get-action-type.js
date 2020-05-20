/**
 * @author Luke Brandon Farrell
 * @description
 */

import _snakeCase from "lodash/snakeCase";
import { getActionVerb } from "./get-action-verb";

/**
 * Gets our reducer value key from type
 *
 * @param {string} verb
 * @param {string} path
 * @param {string} suffix
 *
 * @return {string}
 */
export function getActionType(verb, path, suffix) {
  const actionVerb = getActionVerb(verb);
  const pathAsActionType = _snakeCase(
    path
      .replace(/\//g, "_")
      .replace(/\{|}/g, "")
  ).toUpperCase();

  return `${actionVerb}_${pathAsActionType}_${suffix}`;
}
