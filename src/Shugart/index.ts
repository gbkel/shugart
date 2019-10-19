import * as http from "http"
import * as WebSocket from "ws"
import { ClientOptions } from "ws"
import * as Level from "level"
import { version } from "../../package.json"
import "dotenv/config"

import ValidationService from "../Services/Validation"
import StorageService from "../Services/Storage"

import { Payload } from "../Interfaces/Payload"

import wsConfig from "../../config/websocket"

class Shugart {
	websocketServer: any = null
	websocketClient: any = null
	storage: Level = null

	async start() {
		this.setupWebSocketServer()
		this.initShugartService()
		console.log("=> Welcome to [ SHUGART ]")
		console.log(`=> Version: ${version}`)
	}

	initShugartService = () => {
		this.storage = Level("shugart")
		this.websocketServer.on("connection", (ws: WebSocket) => {
			ws.on("message", async (payload: string) => {
				const data: Payload = JSON.parse(payload)

				const isPayloadMethodCorrect = ValidationService.validatePayloadMethod(
					data
				)
				if (isPayloadMethodCorrect) {
					if (data.method === "set") {
						const result = await StorageService.set(
							this.storage,
							data.key,
							data.data
						)
						console.log(result)
						ws.send(result ? "1" : 0)
					}
					if (data.method === "get") {
						const value = await StorageService.get(this.storage, data.key)
						ws.send(value)
					}
				}
			})
		})
	}

	setupWebSocketServer() {
		this.websocketServer = new WebSocket.Server(wsConfig)
	}

	async client(host: string) {
		await this.setupWebSocketClient(host)
	}

	async get(key: string) {
		const payload = JSON.stringify({ method: "get", key })
		this.websocketClient.send(payload)
		return new Promise(resolve => {
			this.websocketClient.on("message", (result: string) => {
				resolve(result)
			})
		})
	}

	async set(key: string, data: string) {
		const payload = JSON.stringify({ method: "set", key, data })
		this.websocketClient.send(payload)
		return new Promise(resolve => {
			this.websocketClient.on("message", (data: string) => {
				resolve(data)
			})
		})
	}

	setupWebSocketClient = (host: string) => {
		this.websocketClient = new WebSocket(host)
		return new Promise(resolve =>
			this.websocketClient.on("open", () => resolve())
		)
	}
}

export default new Shugart()
