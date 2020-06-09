/**
 * @author Luke Brandon Farrell
 * @description
 */

/* NPM - Node Package Manage */
import _mapKeys from "lodash.mapkeys";
// import _mapValues from "lodash/mapValues";
import _camelCase from "lodash.camelcase";

const initialState = Object.assign(
  {},
  // Maps all the types from the library to make an initial states for request statuses
  // _mapValues(_mapKeys(types, item => getRequestKeyFromType(item)), () => {
  //   return {
  //     status: null,
  //     loading: false,
  //     error: false
  //   };
  // })
);

export const RequestStatusReducer = (state = initialState, action) => {
  // Transforms e.g. GET_USER_BRANDS_ALL -> userBrandsAll
  const key = _camelCase(action.type.replace(/\_REQUEST|_RESPONSE/g, "").replace(/\GET_|UPDATE_|CREATE_|DELETE_/g, ""));

  if (action.type.includes("REQUEST")) {
    return {
      ...state,
      [key]: {
        ...state[key],
        status: null,
        loading: true,
        error: false
      }
    };
  } else if (action.type.includes("RESPONSE")) {
    return {
      ...state,
      [key]: {
        ...state[key],
        status: action.payload?.status,
        loading: false,
        error: action.error ?? false,
      }
    };
  }

  return state;
};