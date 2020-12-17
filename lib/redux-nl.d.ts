/**
 * @author Luke Brandon Farrell
 * @description
 */
import { RestVerbType } from "./rest-verbs";
export declare const ReduxNL: {
    setup: (store: any, sagaMiddleware: any, { delay, defaultUrl, defaultErrorMessage, isDev }: {
        delay: any;
        defaultUrl: string;
        defaultErrorMessage: string;
        isDev: boolean;
    }) => void;
    post: (path: string, { payload, meta, onSuccess, onFailure, onFinal }: {
        payload: object;
        meta: object;
        onSuccess?: ((action: object) => void) | undefined;
        onFailure?: ((action: object) => void) | undefined;
        onFinal?: ((action: object) => void) | undefined;
    }) => void;
    patch: (path: string, { payload, meta, onSuccess, onFailure, onFinal }: {
        payload: object;
        meta: object;
        onSuccess?: ((action: object) => void) | undefined;
        onFailure?: ((action: object) => void) | undefined;
        onFinal?: ((action: object) => void) | undefined;
    }) => void;
    put: (path: string, { payload, meta, onSuccess, onFailure, onFinal }: {
        payload: object;
        meta: object;
        onSuccess?: ((action: object) => void) | undefined;
        onFailure?: ((action: object) => void) | undefined;
        onFinal?: ((action: object) => void) | undefined;
    }) => void;
    get: (path: string, { payload, meta, onSuccess, onFailure, onFinal }: {
        payload: object;
        meta: object;
        onSuccess?: ((action: object) => void) | undefined;
        onFailure?: ((action: object) => void) | undefined;
        onFinal?: ((action: object) => void) | undefined;
    }) => void;
    delete: (path: string, { payload, meta, onSuccess, onFailure, onFinal }: {
        payload: object;
        meta: object;
        onSuccess?: ((action: object) => void) | undefined;
        onFailure?: ((action: object) => void) | undefined;
        onFinal?: ((action: object) => void) | undefined;
    }) => void;
    dispatch: ({ verb, path, payload, meta, onSuccess, onFailure, onFinal }: {
        verb: RestVerbType;
        path: string;
        payload: object;
        meta: object;
        onSuccess?: ((action: object) => void) | undefined;
        onFailure?: ((action: object) => void) | undefined;
        onFinal?: ((action: object) => void) | undefined;
    }) => void;
    promise: {
        post: (path: string, { payload, meta }: {
            payload: object;
            meta: object;
        }) => Promise<unknown>;
        put: (path: string, { payload, meta }: {
            payload: object;
            meta: object;
        }) => Promise<unknown>;
        get: (path: string, { payload, meta }: {
            payload: object;
            meta: object;
        }) => Promise<unknown>;
        patch: (path: string, { payload, meta }: {
            payload: object;
            meta: object;
        }) => Promise<unknown>;
        delete: (path: string, { payload, meta }: {
            payload: object;
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
            get: (path: string) => string;
            post: (path: string) => string;
            put: (path: string) => string;
            patch: (path: string) => string;
            delete: (path: string) => string;
        };
    };
};
