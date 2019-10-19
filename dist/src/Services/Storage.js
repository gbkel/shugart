"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class StorageService {
    set(storage, key, data) {
        return new Promise((resolve, reject) => {
            storage.put(key, JSON.stringify(data), (error) => {
                if (error) {
                    console.error(error);
                    reject(false);
                }
                else {
                    resolve(true);
                }
            });
        });
    }
    get(storage, key) {
        return new Promise((resolve, reject) => {
            storage.get(key, (error, value) => {
                if (error) {
                    console.error(error);
                    reject(null);
                }
                else if (!value) {
                    resolve(null);
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