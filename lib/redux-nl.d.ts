/**
 * @author Luke Brandon Farrell
 * @description
 */
import { RestVerbType } from "./rest-verbs";
import { SagaMiddleware } from "redux-saga";
import { Store } from "redux";
export declare const ReduxNL: {
    /**
     * It sets up ReduxNL with redux-saga
     * and update the global configuration
     *
     * @param {Store} store your redux store
     * @param {SagaMiddleware} sagaMiddleware the created saga middleware
     */
    setup: (store: Store, sagaMiddleware: SagaMiddleware, { delay, defaultUrl, defaultErrorMessage, isDev }: {
        /**
         * Adds a network delay for testing slow network connections
         */
        delay: number;
        defaultUrl: string;
        defaultErrorMessage: string;
        /**
         * Things like delay and console.warns will be ignored when this is false
         */
        isDev: boolean;
    }) => void;
    /**
     * Makes a POST HTTP call to the endpoint
     * and then trigger an action
     * with the response of this call
     *
     * @param {string} path the endpoint to call
     */
    post: (path: string, { payload, replaceType, meta, onSuccess, onFailure, onFinal }: {
        payload: object;
        replaceType?: string | undefined;
        meta: object;
        onSuccess?: ((action: object) => void) | undefined;
        onFailure?: ((action: object) => void) | undefined;
        onFinal?: ((action: object) => void) | undefined;
    }) => void;
    /**
   * Makes a PATCH HTTP call to the endpoint
   * and then trigger an action
   * with the response of this call
   *
   * @param {string} path the endpoint to call
   */
    patch: (path: string, { payload, replaceType, meta, onSuccess, onFailure, onFinal }: {
        payload: object;
        replaceType?: string | undefined;
        meta: object;
        onSuccess?: ((action: object) => void) | undefined;
        onFailure?: ((action: object) => void) | undefined;
        onFinal?: ((action: object) => void) | undefined;
    }) => void;
    /**
   * Makes a PUT HTTP call to the endpoint
   * and then trigger an action
   * with the response of this call
   *
   * @param {string} path the endpoint to call
   */
    put: (path: string, { payload, replaceType, meta, onSuccess, onFailure, onFinal }: {
        payload: object;
        replaceType?: string | undefined;
        meta: object;
        onSuccess?: ((action: object) => void) | undefined;
        onFailure?: ((action: object) => void) | undefined;
        onFinal?: ((action: object) => void) | undefined;
    }) => void;
    /**
   * Makes a GET HTTP call to the endpoint
   * and then trigger an action
   * with the response of this call
   *
   * @param {string} path the endpoint to call
   */
    get: (path: string, { payload, replaceType, meta, onSuccess, onFailure, onFinal }: {
        payload: object;
        replaceType?: string | undefined;
        meta: object;
        onSuccess?: ((action: object) => void) | undefined;
        onFailure?: ((action: object) => void) | undefined;
        onFinal?: ((action: object) => void) | undefined;
    }) => void;
    /**
   * Makes a DELETE HTTP call to the endpoint
   * and then trigger an action
   * with the response of this call
   *
   * @param {string} path the endpoint to call
   */
    delete: (path: string, { payload, replaceType, meta, onSuccess, onFailure, onFinal }: {
        payload: object;
        replaceType?: string | undefined;
        meta: object;
        onSuccess?: ((action: object) => void) | undefined;
        onFailure?: ((action: object) => void) | undefined;
        onFinal?: ((action: object) => void) | undefined;
    }) => void;
    dispatch: ({ verb, path, payload, replaceType, meta, onSuccess, onFailure, onFinal }: {
        verb: RestVerbType;
        path: string;
        payload: object;
        meta: object;
        replaceType?: string | undefined;
        onSuccess?: ((action: object) => void) | undefined;
        onFailure?: ((action: object) => void) | undefined;
        onFinal?: ((action: object) => void) | undefined;
    }) => void;
    promise: {
        post: (path: string, { payload, replaceType, meta }: {
            payload: object;
            replaceType: string;
            meta: object;
        }) => Promise<unknown>;
        put: (path: string, { payload, replaceType, meta }: {
            payload: object;
            replaceType: string;
            meta: object;
        }) => Promise<unknown>;
        get: (path: string, { payload, replaceType, meta }: {
            payload: object;
            replaceType: string;
            meta: object;
        }) => Promise<unknown>;
        patch: (path: string, { payload, replaceType, meta }: {
            payload: object;
            replaceType: string;
            meta: object;
        }) => Promise<unknown>;
        delete: (path: string, { payload, replaceType, meta }: {
            payload: object;
            replaceType: string;
            meta: object;
        }) => Promise<unknown>;
    };
    request: {
        type: {
            get: (path: string) => string;
            post: (path: string) => string;
            put: (path: string) => string;
            patch: (path: string) => string;
            delete: (path: string) => string;
        };
    };
    response: {
        type: {
            /**
             * Generates an action for this HTTP method and path
             * that matches the action generated internally by ReduxNL
             *
             * @param {string} path the endpoint you specified in the HTTP call
             */
            get: (path: string) => string;
            /**
             * Generates an action for this HTTP method and path
             * that matches the action generated internally by ReduxNL
             *
             * @param {string} path the endpoint you specified in the HTTP call
             */
            post: (path: string) => string;
            /**
             * Generates an action for this HTTP method and path
             * that matches the action generated internally by ReduxNL
             *
             * @param {string} path the endpoint you specified in the HTTP call
             */
            put: (path: string) => string;
            /**
             * Generates an action for this HTTP method and path
             * that matches the action generated internally by ReduxNL
             *
             * @param {string} path the endpoint you specified in the HTTP call
             */
            patch: (path: string) => string;
            /**
             * Generates an action for this HTTP method and path
             * that matches the action generated internally by ReduxNL
             *
             * @param {string} path the endpoint you specified in the HTTP call
             */
            delete: (path: string) => string;
        };
    };
};
