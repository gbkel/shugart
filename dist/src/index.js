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
const Validation_1 = require("./Services/Validation");
const Storage_1 = require("./Services/Storage");
const websocket_1 = require("../config/websocket");
class Shugart {
    constructor() {
        this.websocketServer = null;
        this.websocketClient = null;
        this._host = null;
        this.storage = null;
        this.initShugartService = () => {
            this.storage = Level("shugart");
            this.websocketServer.on("connection", (ws) => {
                ws.on("message", (payload) => __awaiter(this, void 0, void 0, function* () {
                    const data = JSON.parse(payload);
                    const isPayloadMethodCorrect = Validation_1.default.validatePayloadMethod(data);
                    if (isPayloadMethodCorrect) {
                        if (data.method === "set") {
                            const result = yield Storage_1.default.set(this.storage, data.key, data.data);
                            ws.send(result);
                        }
                        if (data.method === "get") {
                            const result = yield Storage_1.default.get(this.storage, data.key);
                            ws.send(result);
                        }
                    }
                }));
            });
        };
        this.setupWebSocketClient = (host) => {
            this.websocketClient = new WebSocket(host);
            return new Promise(resolve => this.websocketClient.on("open", () => {
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
    setupWebSocketServer() {
        this.websocketServer = new WebSocket.Server(websocket_1.default);
    }
    connect(host) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.setupWebSocketClient(host);
        });
    }
    get(key) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = JSON.stringify({ method: "get", key });
            this.websocketClient.send(payload);
            return new Promise(resolve => {
                this.websocketClient.on("message", (result) => {
                    if (+result === 0) {
                        resolve(null);
                    }
                    else {
                        resolve(JSON.parse(result));
                    }
                });
            });
        });
    }
    set(key, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = JSON.stringify({ method: "set", key, data });
            this.websocketClient.send(payload);
            return new Promise(resolve => {
                this.websocketClient.on("message", (result) => {
                    if (+result === 0) {
                        resolve(false);
                    }
                    else {
                        resolve(true);
                    }
                });
            });
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