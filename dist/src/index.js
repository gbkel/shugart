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
const WebSocket = require("ws");
const Level = require("level");
const package_json_1 = require("../package.json");
require("dotenv/config");
const Message_1 = require("./Handlers/Message");
const Payload_1 = require("./Utils/Payload");
const websocket_1 = require("../config/websocket");
class Shugart {
    constructor() {
        this.webSocketServer = null;
        this.webSocketClient = null;
        this.storage = null;
        this._host = null;
        this.initShugartService = () => {
            this.storage = Level("shugart");
            this.webSocketServer.on("connection", (ws) => {
                ws.on("message", (data) => Message_1.default.processPayload(data, this.storage, ws));
            });
        };
        this.setupWebSocketServer = () => {
            this.webSocketServer = new WebSocket.Server(websocket_1.default);
        };
        this.setupWebSocketClient = (host) => {
            this.webSocketClient = new WebSocket(host);
            return new Promise(resolve => this.webSocketClient.on("open", () => {
                this._host = host;
                resolve();
            }));
        };
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            this.setupWebSocketServer();
            this.initShugartService();
            console.log("=> Welcome to [ SHUGART ]");
            console.log(`=> Version: ${package_json_1.version}`);
        });
    }
    connect(host) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.setupWebSocketClient(host);
        });
    }
    get(key) {
        const payload = Payload_1.default.buildPayload("get", key);
        this.webSocketClient.send(payload);
        return new Promise(resolve => {
            this.webSocketClient.on("message", (result) => Message_1.default.callbackGet(result, resolve));
        });
    }
    set(key, data) {
        const payload = Payload_1.default.buildPayload("set", key, data);
        this.webSocketClient.send(payload);
        return new Promise(resolve => {
            this.webSocketClient.on("message", (result) => Message_1.default.callbackSet(result, resolve));
        });
    }
    delete(key) {
        const payload = Payload_1.default.buildPayload("delete", key);
        this.webSocketClient.send(payload);
        return new Promise(resolve => {
            this.webSocketClient.on("message", (result) => Message_1.default.callbackDelete(result, resolve));
        });
    }
    get host() {
        return this._host;
    }
}
exports.default = new Shugart();
module.exports = new Shugart();
module.exports.default = new Shugart();
//# sourceMappingURL=index.js.map