/**
 * @author Luke Brandon Farrell
 * @description
 */

import { RestVerbs } from "./rest-verbs";

/**
 * Maps a REST verb to our action verb
 *
 * @param verb {"Get"|"Patch"|"Post"|"Delete"|"Put"}
 *
 * @param {"Fetch"|"Update"|"Create"|"Delete"|"Put"}
 */
export function getReduxActionVerb(verb) {
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
  }
}
