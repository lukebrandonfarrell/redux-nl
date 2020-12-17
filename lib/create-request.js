"use strict";
/**
 * @author Luke Brandon Farrell
 * @description Wraps axios to provide a custom request function
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRequest = void 0;
/* NPM - Node Package Manage */
const axios_1 = __importDefault(require("axios"));
/**
 * Sends a request to the API using Axios
 *
 * @param base
 * @param method
 * @param path
 * @param options
 * @param headers
 * @return {Promise}
 */
const axios = (base, method, path, options = {}, headers) => {
    const params = Object.assign({ method, url: `${base}${path}`, headers: Object.assign({}, headers) }, options);
    // In iOS 13, a GET request is not allowed to have any request body
    if (method === "get") {
        delete params.data;
    }
    return axios_1.default(params)
        .then(response => {
        return response;
    })
        .catch(error => {
        throw error;
    });
};
const createRequest = {
    request: (base, method, path, options = {}, headers) => {
        return axios(base, method, path, { data: Object.assign({}, options) }, headers);
    },
    /**
     *
     * Helpful method for get requests.
     *
     * @param base
     * @param path
     * @param options
     * @return {Promise}
     */
    get: (base, method, path, options = {}, headers) => {
        return axios(base, "get", path, options, headers);
    },
    /**
     *
     * Helpful method for post requests.
     *
     * @param base
     * @param path
     * @param options
     * @return {Promise}
     */
    post: (base, method, path, options = {}, headers) => {
        return axios(base, "post", path, { data: Object.assign({}, options) }, headers);
    },
    /**
     *
     * Helpful method for put requests.
     *
     * @param base
     * @param path
     * @param options
     * @return {Promise}
     */
    put: (base, method, path, options = {}, headers) => {
        return axios(base, "put", path, { data: Object.assign({}, options) }, headers);
    },
    /**
     *
     * Helpful method for get requests.
     *
     * @param base
     * @param path
     * @param options
     * @return {Promise}
     */
    patch: (base, method, path, options = {}, headers) => {
        return axios(base, "patch", path, { data: Object.assign({}, options) }, headers);
    },
    /**
     *
     * Helpful method for delete requests.
     *
     * @param base
     * @param path
     * @param options
     * @return {Promise}
     */
    destroy: (base, method, path, options = {}, headers) => {
        return axios(base, "delete", path, options, headers);
    },
    /**
     * Builds a url with query parameters
     *
     * @param url
     * @param params
     *
     * @return string
     */
    build: (url, params = {}) => {
        if (!params)
            return url;
        /* Loop through parameter objects and
         * build a query string.
         */
        const query = Object.entries(params).reduce((acc, current) => {
            const [key, value] = current;
            // If value is empty, don't add to query
            if (!value)
                return acc;
            // Build query
            return `${acc}&${key}=${value}`;
        }, "");
        return `${url}${query.replace("&", "?")}`;
    },
};
exports.createRequest = createRequest;
