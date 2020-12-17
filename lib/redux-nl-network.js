"use strict";
/**
 * @author Luke Brandon Farrell
 * @description
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReduxNLNetwork = void 0;
/* NPM - Node Package Manage */
const effects_1 = require("redux-saga/effects");
const lodash_snakecase_1 = __importDefault(require("lodash.snakecase"));
const lodash_omit_1 = __importDefault(require("lodash.omit"));
const lodash_hasin_1 = __importDefault(require("lodash.hasin"));
/* Local Modules */
const abstract_network_saga_1 = require("./abstract-network-saga");
const create_request_1 = require("./create-request");
const get_response_type_1 = require("./get-response-type");
const ReduxNLVerb = "@ReduxNL/verb";
const ReduxNLPath = "@ReduxNL/path";
function* ReduxNLNetwork(action, baseUrl) {
    const requestVerb = action.payload[ReduxNLVerb];
    const requestPath = action.payload[ReduxNLPath];
    const responseAction = get_response_type_1.getResponseType(requestVerb, requestPath);
    const requestPromise = (baseUrl, payload = {}, meta = {}) => {
        return new Promise((resolve, reject) => {
            // Maps our payload and meta to snake case e.g. firstName -> first_name
            const metaInSnakeCase = lodash_omit_1.default(meta, ["headers"]);
            const actionPathsWithVariables = requestPath.split("/").map((path) => {
                const pathAsSnakeCase = lodash_snakecase_1.default(path);
                // i.e. would replace /facts/id with /facts/34 (where id, is passed in payload as { id: 34 })
                if (lodash_hasin_1.default(payload, pathAsSnakeCase)) {
                    return payload[pathAsSnakeCase];
                }
                return path;
            });
            const pathWithParams = actionPathsWithVariables.join("/").toLowerCase();
            // Build the URL for the request
            const url = create_request_1.createRequest.build(pathWithParams, metaInSnakeCase);
            create_request_1.createRequest
                .request(baseUrl, requestVerb.toLowerCase(), url, payload, meta === null || meta === void 0 ? void 0 : meta.headers)
                .then(response => {
                resolve(response);
            })
                .catch(error => reject(error));
        });
    };
    yield effects_1.call(abstract_network_saga_1.AbstractNetworkSaga, action, baseUrl, requestPromise, responseAction);
}
exports.ReduxNLNetwork = ReduxNLNetwork;
