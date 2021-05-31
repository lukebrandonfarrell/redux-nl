"use strict";
/**
 * @author Luke Brandon Farrell
 * @description Application reducer.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionReducer = void 0;
/**
 * Initial data.
 */
const initialState = {
    type: null,
    payload: null,
    meta: null,
    error: false
};
/**
 * Calculates the application state.
 *
 * @param state
 * @param action
 * @return {*}
 */
const ActionReducer = (state = initialState, action) => {
    return Object.assign(Object.assign({}, state), action);
};
exports.ActionReducer = ActionReducer;
