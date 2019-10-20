class PayloadUtils {
	buildPayload(method: string, key: string, data?: object) {
		return JSON.stringify({ method, key, data })
	}
}

export default new PayloadUtils()
