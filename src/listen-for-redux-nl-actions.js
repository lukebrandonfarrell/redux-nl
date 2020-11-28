/**
 * @author Luke Brandon Farrell
 * @description
 */

/* NPM - Node Package Manage */
import { takeLatest } from "redux-saga/effects";
/* Local Modules */
import { ReduxNLNetwork } from "./redux-nl-network";

export function* listenForReduxNLActions(baseUrl) {
  yield takeLatest(
    (action) => action.type.includes("@ReduxNL/") && action.type.includes("Request"), 
    (action) => ReduxNLNetwork(action, baseUrl)
  );
}