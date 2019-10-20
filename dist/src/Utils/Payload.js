"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PayloadUtils {
    buildPayload(method, key, data) {
        return JSON.stringify({ method, key, data });
    }
}
exports.default = new PayloadUtils();
//# sourceMappingURL=Payload.js.map