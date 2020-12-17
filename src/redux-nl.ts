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
/* Constants */
let CurrentStore: any = null;

const ReduxNLVerb = "@ReduxNL/verb";
const ReduxNLPath = "@ReduxNL/path";

export const ReduxNL = {
  setup: (store: any, sagaMiddleware: any, { delay, defaultUrl, defaultErrorMessage, isDev = false }: { delay: any, defaultUrl: string, defaultErrorMessage: string, isDev: boolean }) => {
    CurrentStore = store;

    // Set lib configuration
    config.isDev = isDev;
    if (delay) config.networkDelay = delay;
    if (defaultErrorMessage) config.errorMessage = defaultErrorMessage;

    sagaMiddleware.run(listenForReduxNLActions, defaultUrl);
  },

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

    let currentValue: object | null = null;
    let unsubscribe: object | null = null;
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
      get: (path: string) => {
        return getResponseType(RestVerbs.Get, path);
      },
      post: (path: string) => {
        return getResponseType(RestVerbs.Post, path);
      },
      put: (path: string) => {
        return getResponseType(RestVerbs.Put, path);
      },
      patch: (path: string) => {
        return getResponseType(RestVerbs.Patch, path);
      },
      delete: (path: string) => {
        return getResponseType(RestVerbs.Delete, path);
      },
    },
  },
};