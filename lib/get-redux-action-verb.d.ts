/**
 * @author Luke Brandon Farrell
 * @description
 */
import { RestVerbType } from "./rest-verbs";
declare type verb = "Fetch" | "Update" | "Create" | "Delete" | "Put";
/**
 * Maps a REST verb to our action verb
 *
 * @param verb {"Get"|"Patch"|"Post"|"Delete"|"Put"}
 */
export declare function getReduxActionVerb(verb: RestVerbType): verb;
export {};
