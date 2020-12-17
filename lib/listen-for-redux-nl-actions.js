"use strict";
/**
 * @author Luke Brandon Farrell
 * @description
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.listenForReduxNLActions = void 0;
const effects_1 = require("redux-saga/effects");
/* Local Modules */
const redux_nl_network_1 = require("./redux-nl-network");
function* listenForReduxNLActions(baseUrl) {
    yield effects_1.takeLatest((action) => action.type.includes("@ReduxNL/") && action.type.includes("Request"), (action) => redux_nl_network_1.ReduxNLNetwork(action, baseUrl));
}
exports.listenForReduxNLActions = listenForReduxNLActions;
