/**
 * @author Luke Brandon Farrell
 * @description
 */
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
declare function AbstractNetworkSaga(action: any, baseUrl: string, api: any, type: string, key?: string): Generator<import("redux-saga/effects").CallEffect<unknown> | import("redux-saga/effects").PutEffect<{
    type: string;
    payload: any;
    meta: any;
    error: boolean;
}>, void, unknown>;
export { AbstractNetworkSaga };
