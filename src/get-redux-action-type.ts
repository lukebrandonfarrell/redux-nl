/**
 * @author Luke Brandon Farrell
 * @description
 */

import _startCase from "lodash.startcase";
import { getReduxActionVerb } from "./get-redux-action-verb";
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
export function getReduxActionType(verb: RestVerbType, path: string, suffix: string): string {
  const actionVerb = getReduxActionVerb(verb);
  const pathAsActionType = _startCase(path).replace(/\s/g, '');

  return `@ReduxNL/${actionVerb}${pathAsActionType}${suffix}`;
}
