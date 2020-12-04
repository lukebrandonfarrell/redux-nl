/**
 * @author Luke Brandon Farrell
 * @description
 */

/* NPM - Node Package Manage */
import _castArray from "lodash.castarray";
/* Local Modules */
import { getRequestType } from "./get-request-type";
import { getResponseType } from "./get-response-type";
import { config } from "./config";
import { RestVerbs } from "./rest-verbs";
import { listenForReduxNLActions } from "./listen-for-redux-nl-actions";
/* Constants */
let CurrentStore = null;

const ReduxNLVerb = "@ReduxNL/verb";
const ReduxNLPath = "@ReduxNL/path";

export const ReduxNL = {
  setup: (store, sagaMiddleware, { delay, defaultUrl, defaultErrorMessage, isDev = false }) => {
    CurrentStore = store;

    // Set lib configuration
    config.isDev = isDev;
    if(delay) config.networkDelay = delay;
    if(defaultErrorMessage) config.errorMessage = defaultErrorMessage;

    sagaMiddleware.run(listenForReduxNLActions, defaultUrl);
  },

  post: (path, { payload, meta, onSuccess, onFailure, onFinal }) => {
    ReduxNL.dispatch({
      verb: RestVerbs.Post,
      path,
      payload,
      meta,
      onSuccess,
      onFailure,
      onFinal
    });
  },

  patch: (path, { payload, meta, onSuccess, onFailure, onFinal }) => {
    ReduxNL.dispatch({
      verb: RestVerbs.Patch,
      path,
      payload,
      meta,
      onSuccess,
      onFailure,
      onFinal
    });
  },

  put: (path, { payload, meta, onSuccess, onFailure, onFinal }) => {
    ReduxNL.dispatch({
      verb: RestVerbs.Patch,
      path,
      payload,
      meta,
      onSuccess,
      onFailure,
      onFinal
    });
  },

  get: (path, { payload, meta, onSuccess, onFailure, onFinal }) => {
    ReduxNL.dispatch({
      verb: RestVerbs.Get,
      path,
      payload,
      meta,
      onSuccess,
      onFailure,
      onFinal
    });
  },

  delete: (path, { payload, meta, onSuccess, onFailure, onFinal }) => {
    ReduxNL.dispatch({
      verb: RestVerbs.Delete,
      path,
      payload,
      meta,
      onSuccess,
      onFailure,
      onFinal
    });
  },

  dispatch: ({
    verb,
    path,
    payload,
    meta,
    onSuccess,
    onFailure,
    onFinal
  }) => {
    const requestAction = getRequestType(verb, path);
    const responseAction = getResponseType(verb, path);
    
    let currentValue = null;
    let unsubscribe = null;
    const handleChange = () => {
      const state = CurrentStore.getState();
      const action = state.action;
      let previousValue = currentValue;
      currentValue = action.type;

      if (
        previousValue !== action.type &&
        _castArray(responseAction).includes(action.type)
      ) {
        if (!action.error) {
          if (typeof onSuccess === "function") onSuccess(action);
        } else {
          if (typeof onFailure === "function") onFailure(action);
        }

        if (typeof onFinal === "function") onFinal(action);
        if (typeof unsubscribe === "function") unsubscribe();
      }
    };

    CurrentStore.dispatch({
      type: requestAction,
      payload: {
        ...payload,
        [ReduxNLVerb]: verb,
        [ReduxNLPath]: path,
      },
      meta
    });

    unsubscribe = CurrentStore.subscribe(handleChange);
  },

  // Promise support :)
  promise: {
    post: (path, { payload, meta }) => {
      return new Promise((resolve, reject) => {
          ReduxNL.post(path, {
              payload,
              meta,
              onSuccess: action => {
                  resolve(action);
              },
              onFailure: action => {
                  reject(action);
              }
          });
      });
    },
    get: (path, { payload, meta }) => {
        return new Promise((resolve, reject) => {
            ReduxNL.get(path, {
                payload,
                meta,
                onSuccess: action => {
                    resolve(action);
                },
                onFailure: action => {
                    reject(action);
                }
            });
        });
    },
    patch: (path, { payload, meta }) => {
      return new Promise((resolve, reject) => {
          ReduxNL.get(path, {
              payload,
              meta,
              onSuccess: action => {
                  resolve(action);
              },
              onFailure: action => {
                  reject(action);
              }
          });
      });
    },
    delete: (path, { payload, meta }) => {
      return new Promise((resolve, reject) => {
          ReduxNL.get(path, {
              payload,
              meta,
              onSuccess: action => {
                  resolve(action);
              },
              onFailure: action => {
                  reject(action);
              }
          });
      });
    },
  },

  request: {
    type: {
      get: (path) => {
        return getRequestType(RestVerbs.Get, path);
      },
      post: (path) => {
        return getRequestType(RestVerbs.Post, path);
      },
      patch: (path) => {
        return getRequestType(RestVerbs.Patch, path);
      },
      delete: (path) => {
        return getRequestType(RestVerbs.Delete, path);
      },
    },
  },
  response: {
    type: {
      get: (path) => {
        return getResponseType(RestVerbs.Get, path);
      },
      post: (path) => {
        return getResponseType(RestVerbs.Post, path);
      },
      patch: (path) => {
        return getResponseType(RestVerbs.Patch, path);
      },
      delete: (path) => {
        return getResponseType(RestVerbs.Delete, path);
      },
    },
  },
};