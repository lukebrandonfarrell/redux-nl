/**
 * @author Luke Brandon Farrell
 * @description
 */

import { RestVerbs } from "./rest-verbs";

/**
 * Maps a action type verb to a Rest verb
 *
 * @param verb {"Fetch"|"Update"|"Create"|"Delete"}
 *
 * @param {"Get"|"Patch"|"Post"|"Delete"}
 */
export function getRESTVerb(verb) {
  switch (verb) {
  case "Fetch":
    return RestVerbs.Get;
  case "Update":
    return RestVerbs.Patch;
  case "Create":
    return RestVerbs.Post;
  case "Delete":
    return RestVerbs.Delete;
  }
}