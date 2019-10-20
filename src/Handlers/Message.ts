import * as Level from "level"
import * as Websocket from "ws"

import StorageService from "../Services/Storage"

import { Payload } from "../Interfaces/Payload"

class MessageHandler {
	async processPayload(data: string, storage: Level, ws: Websocket) {
		const payload: Payload = JSON.parse(data)

		if (payload.method === "set") {
			const result = await StorageService.set(
				storage,
				payload.key,
				payload.data
			)
			ws.send(result)
		} else if (payload.method === "get") {
			const result = await StorageService.get(storage, payload.key)
			ws.send(result)
		} else if (payload.method === "delete") {
			const result = await StorageService.delete(storage, payload.key)
			ws.send(result)
		} else {
			return
		}
	}

	callbackGet(result: string, resolve: any) {
		if (+result === 0) {
			resolve(null)
		} else {
			resolve(result)
		}
	}

	callbackSet(result: string, resolve: any) {
		if (+result === 0) {
			resolve(false)
		} else {
			resolve(true)
		}
	}

	callbackDelete(result: string, resolve: any) {
		if (+result === 0) {
			resolve(false)
		} else {
			resolve(true)
		}
	}
}

export default new MessageHandler()
