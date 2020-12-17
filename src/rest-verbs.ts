/**
 * @author Luke Brandon Farrell
 * @description Object with our HTTP Verbs
 * for better typing and strict usage instead
 * of stings
 */

export type RestVerbType = "Get" | "Post" | "Patch" | "Delete" | "Put";

type RestVerbsTypes = {
     Get: RestVerbType,
     Post: RestVerbType,
     Patch: RestVerbType,
     Delete: RestVerbType,
     Put: RestVerbType,
 };

export const RestVerbs: RestVerbsTypes = {
    Get: "Get",
    Post: "Post",
    Patch: "Patch",
    Delete: "Delete",
    Put: "Put"
}