<p align="center">
  <img src="https://raw.githubusercontent.com/aspect-apps/redux-ql/master/assets/thumbnail-dark-redux-ql.png" width="190" height="190">
  <br />
  <a href="https://enjoy.gitstore.app/repositories/aspect-apps/redux-nl"><img src="https://enjoy.gitstore.app/repositories/badge-aspect-apps/redux-nl.svg"></a>
  <hr />
</p>

# Redux Network Layer (Redux NL)

Redux Network Layer is a network layer for your application powered by redux and redux-saga heavily inspired by GraphQL clients such as react-relay. This libary follows the [Flux Standard Action](https://github.com/redux-utilities/flux-standard-action) specification for redux actions.

## Prerequisites

This library requires that you have both [redux](https://redux.js.org/) and [redux-saga](https://redux-saga.js.org/) setup in your project.

## Setup

```sh
npm install redux-nl
```

For ReduxNL to work correctly you need to run the `ReduxNL.setup` and add the action reduccer. Redux NL is powered by [redux-saga](https://redux-saga.js.org/), below is a basic setup for redux-saga and your redux store.

```js
import { ReduxNL } from "redux-nl";
import {applyMiddleware, combineReducers, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';

const reducers = combineReducers({
    action: ActionReducer,
    ...
});
const middleware = applyMiddleware(...[sagaMiddleware]);
const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducers, middleware);

ReduxNL.setup(store, sagaMiddleware, {
  delay: 1000, // <--- adds a network delay for testing slow connections
  isDev: false // <--- Things like delay and console.warns will be ignored when this is false
  defaultErrorMessage: ".." // <--- Custom fallback message
});
```

The ReduxNL action reducer records a temporary instance of you latest action fired into the redux store, this allows us to provide the smart ReduxNL callbacks inside our React components. You need to add the following to your `combineReducers` function:

```js
import { ActionReducer } from "../libs/redux-nl";

const reducers = combineReducers({
    action: ActionReducer,
    ...
```

## Usage

ReduxNL allows you to make request from your React components (or outside your react components) and listen to the status of that request... the only difference is that ReduxNL dispatches the request result to the Redux store, allowing you to also update your global state.

The below example allows you to update your component in response to the fired request. You can pass paramters via the `payload` and `meta` properties, these will be used in your network request, more details below.

```js
ReduxNL.post("/user/brands/slug", {
  payload: { slug },
  meta: {
    apiToken: authToken
  },
  onSuccess: (action) => {

  },
  onFailure: (action) => {

  },
  onFinal: (action) => {

  }
});

// -- You can also write the call as a promise --

ReduxNl.promise.post("/user/brands/slug").then(...).catch();

// OR...

try {
  const action = await ReduxNl.promise.post("/user/brands/slug");
} catch(action){
  // Handle error
} finally {
  // Do something
}

```

The above example will dispatch a `CreateUserBrandSlugResponse` to the store once the request has completed (success or failure). You can listen to these actions in your reducer by using the redux-nl utilities:

```js
const CreateBrandResponse = ReduxNL.response.type.post("/user/brands/slug");
const InitialState = {
  data: [],
  updatedAt: null
};

export default (state = InitialState, action) => {
  switch (action.type) {
  case CreateBrandResponse: {
    ...
```

Available methods for fetching the action type string:

```js
const CreateBrandResponse = ReduxNL.response.type.post("/user/brands/{slug}") -> CreateUserBrandsSlugResponse
const UpdateBrandResponse = ReduxNL.response.type.patch("/user/brands/{slug}") -> UpdateUserBrandsSlugResponse
const DeleteBrandResponse = ReduxNL.response.type.delete("/user/brands/{slug}") -> DeleteUserBrandsSlugResponse
const FetchBrandResponse = ReduxNL.response.type.get("/user/brands/{slug}") -> FetchUserBrandsSlugResponse

const CreateBrandRequest = ReduxNL.request.type.post("/user/brands/{slug}") -> CreateUserBrandsSlugRequest
const UpdateBrandRequest = ReduxNL.request.type.patch("/user/brands/{slug}") -> UpdateUserBrandsSlugRequest
const DeleteBrandRequest = ReduxNL.request.type.delete("/user/brands/{slug}") -> DeleteUserBrandsSlugRequest
const FetchBrandRequest = ReduxNL.request.type.get("/user/brands/{slug}") -> FetchUserBrandsSlugRequest
```

### Building URLs

#### Request Parameters

All paramters in `payload` are passed as data to POST, UPDATE and DELETE requests. These are automatically mapped to snake_case. i.e.

```js
ReduxNl.post("/user/brands", {
  payload: {
    hasCredit: false,
  },
  meta: {
    apiToken: "...",
  },
});
```

Will be mapped into the request as such (the case is transformed to snake_case):

```
POST https://my-example-api//user/brands?api_token=...
{
  has_credit: true
}
```

#### Request Headers

You can add headers in the meta object of your request.

```
{
  ...
  meta: {
    headers: {
      ... <---
    }
  }
}
```

#### Query Parameters

Query parameters e.g. `https://my-example-api/user?api_token=..."` are automatically added to the URL via the `meta` key. i.e.

```js
ReduxNl.post("/user/brands", {
  meta: {
    date: "2020-11-21",
    token: "rAHO82BrgJmshpIHJ8mpTVz2vvPyp1c0X1gjsn6UYDx",
  },
});
```

The call above will result in a URL as such `/user/brands?date=2020-11-21&token=rAHO82BrgJmshpIHJ8mpTVz2vvPyp1c0X1gjsn6UYDx`.

#### Route Parameters

Route parameters are dynamically replaced. tTake the following path: `/user/brands/id`, when a value with the key of `id` is passed thorugh the `payload`, then it is automatically replaced in the URL e.g. `/user/brands/id` -> `/user/brands/34`.

### Local Chaining

In some cases, you may want to pass values from a Request through to a response, so it can be used in your reducer. To support this the network saga supports a `chain` method. i.e.

```
ReduxNl.post("/user/brands", {
  meta: {
    chain: {
      ...
    }
  }
})

Any data inside the `chain` object will be passed through to the `CreateUserBrandsResponse`.
```

### Resources

See [extract-your-api-to-a-client-side-library-using-redux-saga](https://medium.com/@lukebrandonfarrell/network-layer-extract-your-api-to-a-client-side-library-using-redux-saga-514fecfe34a7) to learn more about the architecture behind this library.
