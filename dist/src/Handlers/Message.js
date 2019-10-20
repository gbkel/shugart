"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Storage_1 = require("../Services/Storage");
class MessageHandler {
    processPayload(data, storage, ws) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = JSON.parse(data);
            if (payload.method === "set") {
                const result = yield Storage_1.default.set(storage, payload.key, payload.data);
                ws.send(result);
            }
            else if (payload.method === "get") {
                const result = yield Storage_1.default.get(storage, payload.key);
                ws.send(result);
            }
            else if (payload.method === "delete") {
                const result = yield Storage_1.default.delete(storage, payload.key);
                ws.send(result);
            }
            else {
                return;
            }
        });
    }
    callbackGet(result, resolve) {
        if (+result === 0) {
            resolve(null);
        }
        else {
            resolve(result);
        }
    }
    callbackSet(result, resolve) {
        if (+result === 0) {
            resolve(false);
        }
        else {
            resolve(true);
        }
    }
    callbackDelete(result, resolve) {
        if (+result === 0) {
            resolve(false);
        }
        else {
            resolve(true);
        }
    }
}
exports.default = new MessageHandler();
//# sourceMappingURL=Message.js.map