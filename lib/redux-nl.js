"use strict";
/**
 * @author Luke Brandon Farrell
 * @description
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReduxNL = void 0;
/* NPM - Node Package Manage */
const lodash_castarray_1 = __importDefault(require("lodash.castarray"));
/* Local Modules */
const get_request_type_1 = require("./get-request-type");
const get_response_type_1 = require("./get-response-type");
const config_1 = require("./config");
const rest_verbs_1 = require("./rest-verbs");
const listen_for_redux_nl_actions_1 = require("./listen-for-redux-nl-actions");
/* Constants */
let CurrentStore = null;
const ReduxNLVerb = "@ReduxNL/verb";
const ReduxNLPath = "@ReduxNL/path";
exports.ReduxNL = {
    setup: (store, sagaMiddleware, { delay, defaultUrl, defaultErrorMessage, isDev = false }) => {
        CurrentStore = store;
        // Set lib configuration
        config_1.config.isDev = isDev;
        if (delay)
            config_1.config.networkDelay = delay;
        if (defaultErrorMessage)
            config_1.config.errorMessage = defaultErrorMessage;
        sagaMiddleware.run(listen_for_redux_nl_actions_1.listenForReduxNLActions, defaultUrl);
    },
    post: (path, { payload, meta, onSuccess, onFailure, onFinal }) => {
        exports.ReduxNL.dispatch({
            verb: rest_verbs_1.RestVerbs.Post,
            path,
            payload,
            meta,
            onSuccess,
            onFailure,
            onFinal
        });
    },
    patch: (path, { payload, meta, onSuccess, onFailure, onFinal }) => {
        exports.ReduxNL.dispatch({
            verb: rest_verbs_1.RestVerbs.Patch,
            path,
            payload,
            meta,
            onSuccess,
            onFailure,
            onFinal
        });
    },
    put: (path, { payload, meta, onSuccess, onFailure, onFinal }) => {
        exports.ReduxNL.dispatch({
            verb: rest_verbs_1.RestVerbs.Put,
            path,
            payload,
            meta,
            onSuccess,
            onFailure,
            onFinal
        });
    },
    get: (path, { payload, meta, onSuccess, onFailure, onFinal }) => {
        exports.ReduxNL.dispatch({
            verb: rest_verbs_1.RestVerbs.Get,
            path,
            payload,
            meta,
            onSuccess,
            onFailure,
            onFinal
        });
    },
    delete: (path, { payload, meta, onSuccess, onFailure, onFinal }) => {
        exports.ReduxNL.dispatch({
            verb: rest_verbs_1.RestVerbs.Delete,
            path,
            payload,
            meta,
            onSuccess,
            onFailure,
            onFinal
        });
    },
    dispatch: ({ verb, path, payload, meta, onSuccess, onFailure, onFinal }) => {
        const requestAction = get_request_type_1.getRequestType(verb, path);
        const responseAction = get_response_type_1.getResponseType(verb, path);
        let currentValue = null;
        let unsubscribe = null;
        const handleChange = () => {
            const state = CurrentStore.getState();
            const action = state.action;
            let previousValue = currentValue;
            currentValue = action.type;
            if (previousValue !== action.type &&
                lodash_castarray_1.default(responseAction).includes(action.type)) {
                if (!action.error) {
                    if (typeof onSuccess === "function")
                        onSuccess(action);
                }
                else {
                    if (typeof onFailure === "function")
                        onFailure(action);
                }
                if (typeof onFinal === "function")
                    onFinal(action);
                if (typeof unsubscribe === "function")
                    unsubscribe();
            }
        };
        CurrentStore.dispatch({
            type: requestAction,
            payload: Object.assign(Object.assign({}, payload), { [ReduxNLVerb]: verb, [ReduxNLPath]: path }),
            meta
        });
        unsubscribe = CurrentStore.subscribe(handleChange);
    },
    // Promise support :)
    promise: {
        post: (path, { payload, meta }) => {
            return new Promise((resolve, reject) => {
                exports.ReduxNL.post(path, {
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
        put: (path, { payload, meta }) => {
            return new Promise((resolve, reject) => {
                exports.ReduxNL.put(path, {
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
                exports.ReduxNL.get(path, {
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
                exports.ReduxNL.get(path, {
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
                exports.ReduxNL.get(path, {
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
                return get_request_type_1.getRequestType(rest_verbs_1.RestVerbs.Get, path);
            },
            post: (path) => {
                return get_request_type_1.getRequestType(rest_verbs_1.RestVerbs.Post, path);
            },
            put: (path) => {
                return get_request_type_1.getRequestType(rest_verbs_1.RestVerbs.Put, path);
            },
            patch: (path) => {
                return get_request_type_1.getRequestType(rest_verbs_1.RestVerbs.Patch, path);
            },
            delete: (path) => {
                return get_request_type_1.getRequestType(rest_verbs_1.RestVerbs.Delete, path);
            },
        },
    },
    response: {
        type: {
            get: (path) => {
                return get_response_type_1.getResponseType(rest_verbs_1.RestVerbs.Get, path);
            },
            post: (path) => {
                return get_response_type_1.getResponseType(rest_verbs_1.RestVerbs.Post, path);
            },
            put: (path) => {
                return get_response_type_1.getResponseType(rest_verbs_1.RestVerbs.Put, path);
            },
            patch: (path) => {
                return get_response_type_1.getResponseType(rest_verbs_1.RestVerbs.Patch, path);
            },
            delete: (path) => {
                return get_response_type_1.getResponseType(rest_verbs_1.RestVerbs.Delete, path);
            },
        },
    },
};