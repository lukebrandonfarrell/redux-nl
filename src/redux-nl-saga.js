/**
 * @author Luke Brandon Farrell
 * @description
 */

/* NPM - Node Package Manage */
import { take, all, call } from "redux-saga/effects";
import _snakeCase from "lodash.snakecase";
import _mapKeys from "lodash.mapkeys";
import _omit from "lodash.omit";
/* Local Modules */
import { AbstractNetworkSaga } from "./abstract-network-saga";
import { getRequestType } from "./get-request-type";
import { getResponseType } from "./get-response-type";
import { createRequest } from "./create-request";

export function* ReduxNLSaga(baseUrl) {
  while (true){
    const action = yield take(action => /@ReduxNL$/.test(action.type));
    // const path = // get path from action;
    // const method = // get method from action;
    // const responseAction = // invert request action

    const requestPromise = (baseUrl, payload = {}, meta = {}) => {
      new Promise((resolve, reject) => {
        // Maps our payload and meta to snake case e.g. firstName -> first_name
        const payloadInSnakeCase = _mapKeys(payload, (_, key) =>
          _snakeCase(key)
        );
        const metaInSnakeCase = _omit(_mapKeys(meta, (_, key) => _snakeCase(key)), ["headers"]);
        // Can optionally include parameters in the path
        let pathWithParams = path;

        // If there are brackets in the request, we need to replace it with a variable in the payload
        if (path.match(/\{(.+?)\}/g) !== null) {
          // Extracts parameters from brackets e.g. "/user/orders/{id}" -> id (only supports a single query parameter)
          const extractedPathParameter = path
            .match(/\{(.+?)\}/g)?.[0]
            ?.replace(/\{|}/g, "");
          // This replaces path parameters with a variable from our 'payload' -> "/user/orders/{id}" -> "/user/orders/35"
          pathWithParams = path.replace(
            /\{(.+?)\}/g,
            payloadInSnakeCase[extractedPathParameter]
          );
        }
        // Build the URL for the request
        const url = createRequest.build(pathWithParams, metaInSnakeCase);
          
        createRequest
          .request(baseUrl, method.toLowerCase(), url, payloadInSnakeCase, meta?.headers)
          .then(response => resolve(response))
          .catch(error => reject(error));
      });
    };

    yield call(AbstractNetworkSaga, action, baseUrl, requestPromise, responseAction)
  }
}

function getPathURLFromReduxType(type){
  const actionVerb = getActionVerb(verb);
  const pathAsActionType = _snakeCase(type.replace(/\//g, "_")).toUpperCase();

  return `${actionVerb}_${pathAsActionType}_${suffix}`;
}

function getPathVerb(){
  switch (verb.toUpperCase()) {
    case "GET":
      return "FETCH";
    case "PATCH":
      return "UPDATE";
    case "POST":
      return "CREATE";
    case "DELETE":
      return "DELETE";
    }
}
