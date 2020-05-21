/**
 * @author Luke Brandon Farrell
 * @description Wraps axios to provide a custom request function
 */

/* NPM - Node Package Manage */
import Axios from "axios";

// Optional headers.
const headers = {};

/**
 * Sends a request to the API using Axios
 *
 * @param base
 * @param method
 * @param path
 * @param options
 * @return {Promise}
 */
const axios = (base, method, path, options = {}) => {
  const params = {
    method,
    url: `${base}${path}`,
    headers: {
      ...headers
    },
    ...options
  };

  return Axios(params)
    .then(response => {
      return response;
    })
    .catch(error => {
      throw error;
    });
};

const createRequest = {
  /**
   * Add headers to this request instance.
   *
   * @param key
   * @param value
   */
  addHeader: (key, value) => {
    headers[key] = value;
  },

  request: (base, method, path, options) => {
    return axios(base, method, path, { data: { ...options } });
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
  get: (base, path, options) => {
    return axios(base, "get", path, options);
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
  post: (base, path, options) => {
    return axios(base, "post", path, { data: { ...options } });
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
  patch: (base, path, options) => {
    return axios(base, "patch", path, { data: { ...options } });
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
  destroy: (base, path, options) => {
    return axios(base, "delete", path, options);
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

  /**
   * Normalises a successful response.
   *
   * @return {*[]}
   */
  normlzDataResponse: response => {
    return response.data.data || [];
  }
};

export { createRequest };
