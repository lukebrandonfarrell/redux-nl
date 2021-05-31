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

export function* ReduxNLNetwork(action: any, baseUrl: string){
  const requestVerb = action.payload[ReduxNLVerb];
  const requestPath = action.payload[ReduxNLPath];
  const responseAction = !action.replaceType ? getResponseType(requestVerb, requestPath) : getResponseType(requestVerb, action.replaceType);

  const requestPromise = (baseUrl: string, payload: any = {}, meta: any = {}) => {
    return new Promise((resolve, reject) => {
      // Maps our payload and meta to snake case e.g. firstName -> first_name
      const metaInSnakeCase = _omit(meta, ["headers"]);
      const actionPathsWithVariables = requestPath.split("/").map((path: string): any => {
        const pathAsSnakeCase = _snakeCase(path);
        // i.e. would replace /facts/id with /facts/34 (where id, is passed in payload as { id: 34 })
        if(_hasIn(payload, pathAsSnakeCase)){
          return payload[pathAsSnakeCase];
        }

        return path;
      });
      const pathWithParams = actionPathsWithVariables.join("/").toLowerCase();
      // Build the URL for the request
      const url = createRequest.build(pathWithParams, metaInSnakeCase);

      createRequest
        .request(baseUrl, requestVerb.toLowerCase(), url, payload, meta?.headers)
        .then(response => {
          resolve(response);
        })
        .catch(error => reject(error));
    });
  };

  yield call(AbstractNetworkSaga, action, baseUrl, requestPromise, responseAction)
}