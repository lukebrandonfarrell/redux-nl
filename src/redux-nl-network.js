/**
 * @author Luke Brandon Farrell
 * @description
 */

/* NPM - Node Package Manage */
import { call } from "redux-saga/effects";
import _snakeCase from "lodash.snakecase";
import _mapKeys from "lodash.mapkeys";
import _omit from "lodash.omit";
import _hasIn from "lodash.hasin";
/* Local Modules */
import { AbstractNetworkSaga } from "./abstract-network-saga";
import { createRequest } from "./create-request";
import { getResponseType } from "./get-response-type";

const ReduxNLVerb = "@ReduxNL/verb";
const ReduxNLPath = "@ReduxNL/path";

export function* ReduxNLNetwork(action, baseUrl){
  const requestVerb = action.payload[ReduxNLVerb];
  const requestPath = action.payload[ReduxNLPath];
  const responseAction = getResponseType(requestVerb, requestPath);

  const requestPromise = (baseUrl, payload = {}, meta = {}) => {
    return new Promise((resolve, reject) => {
      // Maps our payload and meta to snake case e.g. firstName -> first_name
      const payloadInSnakeCase = _mapKeys(payload, (_, key) => _snakeCase(key));
      const metaInSnakeCase = _omit(_mapKeys(meta, (_, key) => _snakeCase(key)), ["headers"]);
      const actionPathsWithVariables = requestPath.split("/").map((path) => {
        const pathAsSnakeCase = _snakeCase(path);
        // i.e. would replace /facts/id with /facts/34 (where id, is passed in payload as { id: 34 })
        if(_hasIn(payloadInSnakeCase, pathAsSnakeCase)){
          return payloadInSnakeCase[pathAsSnakeCase];
        }

        return path;
      });
      const pathWithParams = actionPathsWithVariables.join("/").toLowerCase();
      // Build the URL for the request
      const url = createRequest.build(pathWithParams, metaInSnakeCase);

      createRequest
        .request(baseUrl, requestVerb.toLowerCase(), url, payloadInSnakeCase, meta?.headers)
        .then(response => {
          resolve(response);
        })
        .catch(error => reject(error));
    });
  };

  yield call(AbstractNetworkSaga, action, baseUrl, requestPromise, responseAction)
}