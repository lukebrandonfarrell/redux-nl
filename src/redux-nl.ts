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
import { RestVerbs, RestVerbType } from "./rest-verbs";
import { listenForReduxNLActions } from "./listen-for-redux-nl-actions";
import { SagaMiddleware, Unsubscribe } from "redux-saga";
import { Store } from "redux";
/* Constants */
let CurrentStore: Store|null = null;

const ReduxNLVerb = "@ReduxNL/verb";
const ReduxNLPath = "@ReduxNL/path";

export const ReduxNL = {
  /**
   * It sets up ReduxNL with redux-saga
   * and update the global configuration
   * 
   * @param {Store} store your redux store
   * @param {SagaMiddleware} sagaMiddleware the created saga middleware  
   */
  setup: (store: Store, sagaMiddleware: SagaMiddleware, { delay, defaultUrl, defaultErrorMessage, isDev = false }: {
    /**
     * Adds a network delay for testing slow network connections
     */
    delay: number,
    defaultUrl: string,
    defaultErrorMessage: string,
    /**
     * Things like delay and console.warns will be ignored when this is false
     */
    isDev: boolean
  }) => {
    CurrentStore = store;

    // Set lib configuration
    config.isDev = isDev;
    if (delay) config.networkDelay = delay;
    if (defaultErrorMessage) config.errorMessage = defaultErrorMessage;

    sagaMiddleware.run(listenForReduxNLActions, defaultUrl);
  },

  /**
   * Makes a POST HTTP call to the endpoint
   * and then trigger an action
   * with the response of this call
   * 
   * @param {string} path the endpoint to call
   */
  post: (path: string, { payload, meta, onSuccess, onFailure, onFinal }: { payload: object, meta: object, onSuccess?: (action: object) => void, onFailure?: (action: object) => void, onFinal?: (action: object) => void }) => {
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

    /**
   * Makes a PATCH HTTP call to the endpoint
   * and then trigger an action
   * with the response of this call
   * 
   * @param {string} path the endpoint to call
   */
  patch: (path: string, { payload, meta, onSuccess, onFailure, onFinal }: { payload: object, meta: object, onSuccess?: (action: object) => void, onFailure?: (action: object) => void, onFinal?: (action: object) => void }) => {
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

    /**
   * Makes a PUT HTTP call to the endpoint
   * and then trigger an action
   * with the response of this call
   * 
   * @param {string} path the endpoint to call
   */
  put: (path: string, { payload, meta, onSuccess, onFailure, onFinal }: { payload: object, meta: object, onSuccess?: (action: object) => void, onFailure?: (action: object) => void, onFinal?: (action: object) => void }) => {
    ReduxNL.dispatch({
      verb: RestVerbs.Put,
      path,
      payload,
      meta,
      onSuccess,
      onFailure,
      onFinal
    });
  },

    /**
   * Makes a GET HTTP call to the endpoint
   * and then trigger an action
   * with the response of this call
   * 
   * @param {string} path the endpoint to call
   */
  get: (path: string, { payload, meta, onSuccess, onFailure, onFinal }: { payload: object, meta: object, onSuccess?: (action: object) => void, onFailure?: (action: object) => void, onFinal?: (action: object) => void }) => {
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

    /**
   * Makes a DELETE HTTP call to the endpoint
   * and then trigger an action
   * with the response of this call
   * 
   * @param {string} path the endpoint to call
   */
  delete: (path: string, { payload, meta, onSuccess, onFailure, onFinal }: { payload: object, meta: object, onSuccess?: (action: object) => void, onFailure?: (action: object) => void, onFinal?: (action: object) => void }) => {
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
  }: {
    verb: RestVerbType,
    path: string,
    payload: object,
    meta: object,
    onSuccess?: (action: object) => void,
    onFailure?: (action: object) => void,
    onFinal?: (action: object) => void,
  }) => {
    const requestAction = getRequestType(verb, path);
    const responseAction = getResponseType(verb, path);

    let currentValue: object | undefined;
    let unsubscribe: Unsubscribe | undefined;
    const handleChange = () => {
      const state = CurrentStore?.getState();
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

    CurrentStore?.dispatch({
      type: requestAction,
      payload: {
        ...payload,
        [ReduxNLVerb]: verb,
        [ReduxNLPath]: path,
      },
      meta
    });

    unsubscribe = CurrentStore?.subscribe(handleChange);
  },

  // Promise support :)
  promise: {
    post: (path: string, { payload, meta }: {
      payload: object,
      meta: object
    }) => {
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
    put: (path: string, { payload, meta }: {
      payload: object,
      meta: object
    }) => {
      return new Promise((resolve, reject) => {
        ReduxNL.put(path, {
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
    get: (path: string, { payload, meta }: {
      payload: object,
      meta: object
    }) => {
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
    patch: (path: string, { payload, meta }: {
      payload: object,
      meta: object
    }) => {
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
    delete: (path: string, { payload, meta }: {
      payload: object,
      meta: object
    }) => {
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
      get: (path: string) => {
        return getRequestType(RestVerbs.Get, path);
      },
      post: (path: string) => {
        return getRequestType(RestVerbs.Post, path);
      },
      put: (path: string) => {
        return getRequestType(RestVerbs.Put, path);
      },
      patch: (path: string) => {
        return getRequestType(RestVerbs.Patch, path);
      },
      delete: (path: string) => {
        return getRequestType(RestVerbs.Delete, path);
      },
    },
  },
  response: {
    type: {
      /**
       * Generates an action for this HTTP method and path
       * that matches the action generated internally by ReduxNL
       * 
       * @param {string} path the endpoint you specified in the HTTP call
       */
      get: (path: string) => {
        return getResponseType(RestVerbs.Get, path);
      },
      /**
       * Generates an action for this HTTP method and path
       * that matches the action generated internally by ReduxNL
       * 
       * @param {string} path the endpoint you specified in the HTTP call
       */
      post: (path: string) => {
        return getResponseType(RestVerbs.Post, path);
      },
      /**
       * Generates an action for this HTTP method and path
       * that matches the action generated internally by ReduxNL
       * 
       * @param {string} path the endpoint you specified in the HTTP call
       */
      put: (path: string) => {
        return getResponseType(RestVerbs.Put, path);
      },
      /**
       * Generates an action for this HTTP method and path
       * that matches the action generated internally by ReduxNL
       * 
       * @param {string} path the endpoint you specified in the HTTP call
       */
      patch: (path: string) => {
        return getResponseType(RestVerbs.Patch, path);
      },
      /**
       * Generates an action for this HTTP method and path
       * that matches the action generated internally by ReduxNL
       * 
       * @param {string} path the endpoint you specified in the HTTP call
       */
      delete: (path: string) => {
        return getResponseType(RestVerbs.Delete, path);
      },
    },
  },
};