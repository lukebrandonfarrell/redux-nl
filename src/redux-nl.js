/**
 * @author Luke Brandon Farrell
 * @description
 */

/* NPM - Node Package Manage */
import _castArray from "lodash/castArray";
/* Local Modules */
import { getRequestType } from "./get-request-type";
import { getResponseType } from "./get-response-type";
import { config } from "./config";
/* Constants */
let CurrentStore = null;

export const ReduxNL = {
  setup: ({ store, delay, defaultErrorMessage, isDev = false }) => {
    CurrentStore = store;

    // Set lib configuration
    config.isDev = isDev;
    if(delay) config.networkDelay = delay;
    if(defaultErrorMessage) config.errorMessage = defaultErrorMessage;
  },

  post: (path, { payload, meta, onSuccess, onFailure, onFinal }) => {
    ReduxNL.dispatch({
      verb: "post",
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
      verb: "patch",
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
      verb: "post",
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
      verb: "delete",
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

        if (typeof onFinal === "function") onFinal();
        if (typeof unsubscribe === "function") unsubscribe();
      }
    };

    CurrentStore.dispatch({
      type: requestAction,
      payload,
      meta
    });

    unsubscribe = CurrentStore.subscribe(handleChange);
  },

  request: {
    type: {
      get: (path) => {
        return getRequestType("GET", path);
      },
      post: (path) => {
        return getRequestType("POST", path);
      },
      patch: (path) => {
        return getRequestType("PATCH", path);
      },
      delete: (path) => {
        return getRequestType("DELETE", path);
      },
    },
  },
  response: {
    type: {
      get: (path) => {
        return getResponseType("GET", path);
      },
      post: (path) => {
        return getResponseType("POST", path);
      },
      patch: (path) => {
        return getResponseType("PATCH", path);
      },
      delete: (path) => {
        return getResponseType("DELETE", path);
      },
    },
  },
};