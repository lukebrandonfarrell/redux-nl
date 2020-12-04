/**
 * @author Luke Brandon Farrell
 * @description Wraps axios to provide a custom request function
 */

/* NPM - Node Package Manage */
import Axios from "axios";

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
  const params = {
    method,
    url: `${base}${path}`,
    headers: {
      ...headers
    },
    ...options
  };

  // In iOS 13, a GET request is not allowed to have any request body
  if (method === "get") {
    delete params.data;
  }

  return Axios(params)
    .then(response => {
      return response;
    })
    .catch(error => {
      throw error;
    });
};

const createRequest = {
  request: (base, method, path, options, headers) => {
    return axios(base, method, path, { data: { ...options } }, headers);
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
  get: (base, path, options, headers) => {
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
  post: (base, path, options, headers) => {
    return axios(base, "post", path, { data: { ...options } }, headers);
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
  post: (base, path, options, headers) => {
    return axios(base, "put", path, { data: { ...options } }, headers);
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
  patch: (base, path, options, headers) => {
    return axios(base, "patch", path, { data: { ...options } }, headers);
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
  destroy: (base, path, options, headers) => {
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
  build: (url, params) => {
    if (!params) return url;

    /* Loop through parameter objects and
     * build a query string.
     */
    const query = Object.entries(params).reduce((acc, current) => {
      const [key, value] = current;

      // If value is empty, don't add to query
      if (!value) return acc;

      // Build query
      return `${acc}&${key}=${value}`;
    }, "");

    return `${url}${query.replace("&", "?")}`;
  },
};

export { createRequest };
