import * as WebSocket from "ws"
import * as Level from "level"
import { version } from "../package.json"
import "dotenv/config"

import StorageService from "./Services/Storage"

import { Payload } from "./Interfaces/Payload"

import wsConfig from "../config/websocket"

class Shugart {
	websocketServer: any = null
	websocketClient: any = null
	_host: any = null
	queue: [] = []
	clientStatus: boolean = false
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
			ws.on("message", async (data: string) => {
				const payload: Payload = JSON.parse(data)

				if (payload.method === "set") {
					const result = await StorageService.set(
						this.storage,
						payload.key,
						payload.data
					)
					ws.send(result)
				}
				if (payload.method === "get") {
					const result = await StorageService.get(this.storage, payload.key)
					ws.send(result)
				}
			})
		})
	}

	setupWebSocketServer() {
		this.websocketServer = new WebSocket.Server(wsConfig)
	}

	setupWebSocketClient = (host: string) => {
		this.websocketClient = new WebSocket(host)

		return new Promise(resolve =>
			this.websocketClient.on("open", () => {
				this._host = host
				resolve()
			})
		)
	}

	async connect(host: string) {
		await this.setupWebSocketClient(host)
	}

	async get(key: string) {
		const payload = JSON.stringify({ method: "get", key })

		this.websocketClient.send(payload)

		return new Promise(resolve => {
			this.websocketClient.on("message", (result: string) => {
				if (+result === 0) {
					resolve(null)
				} else {
					resolve(result)
				}
			})
		})
	}

	async set(key: string, data: object) {
		const payload = JSON.stringify({ method: "set", key, data })

		this.websocketClient.send(payload)

		return new Promise(resolve => {
			this.websocketClient.on("message", (result: string) => {
				if (+result === 0) {
					resolve(false)
				} else {
					resolve(true)
				}
			})
		})
	}

	get host() {
		return this._host
	}
}

export default new Shugart()
module.exports = new Shugart()
module.exports.default = new Shugart()
