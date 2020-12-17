/**
 * @author Luke Brandon Farrell
 * @description
 */

import { RestVerbs, RestVerbType } from "./rest-verbs";

type verb = "Fetch" | "Update" | "Create" | "Delete" | "Put"

/**
 * Maps a REST verb to our action verb
 *
 * @param verb {"Get"|"Patch"|"Post"|"Delete"|"Put"}
 */
export function getReduxActionVerb(verb: RestVerbType): verb {
  switch (verb) {
    case RestVerbs.Get:
      return "Fetch";
    case RestVerbs.Patch:
      return "Update";
    case RestVerbs.Post:
      return "Create";
    case RestVerbs.Delete:
      return "Delete";
    case RestVerbs.Put:
      return "Put";
    default:
      return "Fetch";
  }
}
