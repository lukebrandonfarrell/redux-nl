/**
 * @author Luke Brandon Farrell
 * @description
 */

/* NPM - Node Package Manage */
import { ActionMatchingPattern } from "@redux-saga/types";
import { takeLatest } from "redux-saga/effects";
/* Local Modules */
import { ReduxNLNetwork } from "./redux-nl-network";

export function* listenForReduxNLActions(baseUrl: string) {
  yield takeLatest(
    (action: any) => action.type.includes("@ReduxNL/") && action.type.includes("Request"), 
    (action) => ReduxNLNetwork(action, baseUrl)
  );
}