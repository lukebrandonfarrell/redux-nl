"use strict";
/**
 * @author Luke Brandon Farrell
 * @description
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractNetworkSaga = void 0;
/* NPM - Node Package Manage */
const effects_1 = require("redux-saga/effects");
const config_1 = require("./config");
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
function* AbstractNetworkSaga(action, baseUrl, api, type, key = "requestTimestamp") {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    const payloadChain = (_b = (_a = action.payload) === null || _a === void 0 ? void 0 : _a.chain) !== null && _b !== void 0 ? _b : {};
    const metaChain = (_d = (_c = action.meta) === null || _c === void 0 ? void 0 : _c.chain) !== null && _d !== void 0 ? _d : {};
    try {
        const payload = (_e = action.payload) !== null && _e !== void 0 ? _e : {};
        const meta = (_f = action.meta) !== null && _f !== void 0 ? _f : {};
        // In development we can add a delay to successful network requests
        if (config_1.config.isDev)
            yield effects_1.delay(config_1.config.networkDelay);
        const data = yield effects_1.call(api, baseUrl, payload, meta);
        console.log({ data, payload });
        yield effects_1.put({
            type,
            payload: Object.assign({ data, [key]: new Date().toISOString() }, payloadChain),
            meta: Object.assign({}, metaChain),
            error: false
        });
    }
    catch (e) {
        if (config_1.config.isDev)
            console.warn(e); // eslint-disable-line no-console
        const status = (_g = e === null || e === void 0 ? void 0 : e.response) === null || _g === void 0 ? void 0 : _g.status;
        const data = (_j = (_h = e === null || e === void 0 ? void 0 : e.response) === null || _h === void 0 ? void 0 : _h.data) !== null && _j !== void 0 ? _j : {};
        const message = (_k = data === null || data === void 0 ? void 0 : data.message) !== null && _k !== void 0 ? _k : config_1.config.errorMessage;
        yield effects_1.put({
            type,
            payload: Object.assign(Object.assign({ status, message }, data), payloadChain),
            meta: Object.assign({}, metaChain),
            error: true
        });
    }
}
exports.AbstractNetworkSaga = AbstractNetworkSaga;
