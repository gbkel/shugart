import * as WebSocket from "ws"
import * as Level from "level"
import { version } from "../package.json"
import "dotenv/config"

import MessageHandler from "./Handlers/Message"

import PayloadUtils from "./Utils/Payload"

import wsConfig from "../config/websocket"

class Shugart {
	webSocketServer: any = null
	webSocketClient: any = null
	storage: Level = null
	_host: string | null = null

	async start() {
		this.setupWebSocketServer()
		this.initShugartService()
		console.log("=> Welcome to [ SHUGART ]")
		console.log(`=> Version: ${version}`)
	}

	async connect(host: string) {
		await this.setupWebSocketClient(host)
	}

	initShugartService = () => {
		this.storage = Level("shugart")
		this.webSocketServer.on("connection", (ws: WebSocket) => {
			ws.on("message", (data: string) =>
				MessageHandler.processPayload(data, this.storage, ws)
			)
		})
	}

	setupWebSocketServer = () => {
		this.webSocketServer = new WebSocket.Server(wsConfig)
	}

	setupWebSocketClient = (host: string) => {
		this.webSocketClient = new WebSocket(host)

		return new Promise(resolve =>
			this.webSocketClient.on("open", () => {
				this._host = host
				resolve()
			})
		)
	}

	get(key: string) {
		const payload = PayloadUtils.buildPayload("get", key)

		this.webSocketClient.send(payload)

		return new Promise(resolve => {
			this.webSocketClient.on("message", (result: string) =>
				MessageHandler.callbackGet(result, resolve)
			)
		})
	}

	set(key: string, data: object) {
		const payload = PayloadUtils.buildPayload("set", key, data)

		this.webSocketClient.send(payload)

		return new Promise(resolve => {
			this.webSocketClient.on("message", (result: string) =>
				MessageHandler.callbackSet(result, resolve)
			)
		})
	}

	delete(key: string) {
		const payload = PayloadUtils.buildPayload("delete", key)

		this.webSocketClient.send(payload)

		return new Promise(resolve => {
			this.webSocketClient.on("message", (result: string) =>
				MessageHandler.callbackDelete(result, resolve)
			)
		})
	}

	get host() {
		return this._host
	}
}

export default new Shugart()
module.exports = new Shugart()
module.exports.default = new Shugart()
