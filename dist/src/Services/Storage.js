"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class StorageService {
    set(storage, key, data) {
        return new Promise(resolve => {
            storage.put(key, JSON.stringify(data), (error) => {
                if (error) {
                    resolve(0);
                }
                else {
                    resolve(1);
                }
            });
        });
    }
    get(storage, key) {
        return new Promise(resolve => {
            storage.get(key, (error, value) => {
                if (error) {
                    resolve(0);
                }
                else {
                    resolve(value);
                }
            });
        });
    }
}
exports.default = new StorageService();
//# sourceMappingURL=Storage.js.map