/**
 * @author Luke Brandon Farrell
 * @description
 */
/**
 * Maps a action type verb to a Rest verb
 *
 * @param verb {"Fetch"|"Update"|"Create"|"Delete"}
 *
 * @param {"Get"|"Patch"|"Post"|"Delete"}
 */
export declare function getRESTVerb(verb: string): "Get" | "Post" | "Patch" | "Delete" | "Put" | undefined;
