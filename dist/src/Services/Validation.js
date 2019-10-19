"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ValidationService {
    constructor() {
        this.validateSetPayload = ({ data, key }) => {
            if (!data || !key) {
                return false;
            }
            else {
                return true;
            }
        };
        this.validateGetPayload = ({ key }) => {
            if (!key) {
                return false;
            }
            else {
                return true;
            }
        };
    }
    validatePayloadMethod(payload) {
        if (!payload.method) {
            return false;
        }
        else if (payload.method === "set") {
            return this.validateSetPayload(payload);
        }
        else if (payload.method === "get") {
            return this.validateGetPayload(payload);
        }
    }
}
exports.default = new ValidationService();
//# sourceMappingURL=Validation.js.map