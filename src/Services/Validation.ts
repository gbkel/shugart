class ValidationService {
	validatePayloadMethod(payload: any) {
		if (!payload.method) {
			return false
		} else if (payload.method === "set") {
			return this.validateSetPayload(payload)
		} else if (payload.method === "get") {
			return this.validateGetPayload(payload)
		}
	}

	validateSetPayload = ({ data, key }) => {
		if (!data || !key) {
			return false
		} else {
			return true
		}
	}

	validateGetPayload = ({ key }) => {
		if (!key) {
			return false
		} else {
			return true
		}
	}
}

export default new ValidationService()
