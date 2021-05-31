/**
 * @author Luke Brandon Farrell
 * @description
 */

/* NPM - Node Package Manage */
import { call, put, delay } from "redux-saga/effects";
import { config } from "./config";

/**
 * Network Saga Abstraction
 *
 * @param action
 * @param baseUrl
 * @param api
 * @param type
 * @param key - key for the timestamp, in the case that it overrides a value from the API
 *
 * @return {IterableIterator<*>}
 */
function* AbstractNetworkSaga(
  action: any,
  baseUrl: string,
  api: any,
  type: string,
  key = "requestTimestamp"
) {
  const payloadChain = action.payload?.chain ?? {};
  const metaChain = action.meta?.chain ?? {};
  
  const replaceType = action.replaceType ?? {};

  try {
    const payload = action.payload ?? {};
    const meta = action.meta ?? {};

    // In development we can add a delay to successful network requests
    if(config.isDev) yield delay(config.networkDelay);

    const data = yield call(api, baseUrl, payload, meta);
    console.log({ data, payload });

    yield put({
      type,
      payload: {
        data,
        [key]: new Date().toISOString(),
        ...payloadChain
      },
      replaceType: replaceType,
      meta: { ...metaChain },
      error: false
    });
  } catch (e) {
    if (config.isDev) console.warn(e); // eslint-disable-line no-console

    const status = e?.response?.status;
    const data = e?.response?.data ?? {};
    const message = data?.message ?? config.errorMessage;

    yield put({
      type,
      payload: { status, message, ...data, ...payloadChain },
      replaceType: replaceType,
      meta: { ...metaChain },
      error: true
    });
  }
}

export { AbstractNetworkSaga };
