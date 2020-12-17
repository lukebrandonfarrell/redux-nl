/**
 * @author Luke Brandon Farrell
 * @description Object with our HTTP Verbs
 * for better typing and strict usage instead
 * of stings
 */
export declare type RestVerbType = "Get" | "Post" | "Patch" | "Delete" | "Put";
declare type RestVerbsTypes = {
    Get: RestVerbType;
    Post: RestVerbType;
    Patch: RestVerbType;
    Delete: RestVerbType;
    Put: RestVerbType;
};
export declare const RestVerbs: RestVerbsTypes;
export {};
