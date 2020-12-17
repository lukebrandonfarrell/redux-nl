/**
 * @author Luke Brandon Farrell
 * @description Wraps axios to provide a custom request function
 */
declare const createRequest: {
    request: (base: string, method: string, path: string, options: object | undefined, headers: object) => Promise<import("axios").AxiosResponse<any>>;
    /**
     *
     * Helpful method for get requests.
     *
     * @param base
     * @param path
     * @param options
     * @return {Promise}
     */
    get: (base: string, method: string, path: string, options: object | undefined, headers: object) => Promise<import("axios").AxiosResponse<any>>;
    /**
     *
     * Helpful method for post requests.
     *
     * @param base
     * @param path
     * @param options
     * @return {Promise}
     */
    post: (base: string, method: string, path: string, options: object | undefined, headers: object) => Promise<import("axios").AxiosResponse<any>>;
    /**
     *
     * Helpful method for put requests.
     *
     * @param base
     * @param path
     * @param options
     * @return {Promise}
     */
    put: (base: string, method: string, path: string, options: object | undefined, headers: object) => Promise<import("axios").AxiosResponse<any>>;
    /**
     *
     * Helpful method for get requests.
     *
     * @param base
     * @param path
     * @param options
     * @return {Promise}
     */
    patch: (base: string, method: string, path: string, options: object | undefined, headers: object) => Promise<import("axios").AxiosResponse<any>>;
    /**
     *
     * Helpful method for delete requests.
     *
     * @param base
     * @param path
     * @param options
     * @return {Promise}
     */
    destroy: (base: string, method: string, path: string, options: object | undefined, headers: object) => Promise<import("axios").AxiosResponse<any>>;
    /**
     * Builds a url with query parameters
     *
     * @param url
     * @param params
     *
     * @return string
     */
    build: (url: string, params?: object) => string;
};
export { createRequest };
