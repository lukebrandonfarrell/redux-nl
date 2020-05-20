/**
 * @author Luke Brandon Farrell
 * @description
 */

/**
 * Maps a HTTP verb to our action  verb
 *
 * @param {*} verb
 */
export function getActionVerb(verb) {
  switch (verb.toUpperCase()) {
  case "GET":
    return "FETCH";
  case "PATCH":
    return "UPDATE";
  case "POST":
    return "CREATE";
  case "DELETE":
    return "DELETE";
  }
}
