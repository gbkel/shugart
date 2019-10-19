"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Shugart_1 = require("../src/Shugart");
function boot() {
    return __awaiter(this, void 0, void 0, function* () {
        yield Shugart_1.default.client("http://localhost:8888");
        let i = 0;
        setInterval(() => __awaiter(this, void 0, void 0, function* () {
            const data = JSON.stringify({ eae: `MOTA-${i}` });
            yield Shugart_1.default.set(`mota`, data);
            console.log(yield Shugart_1.default.get(`mota`));
            i++;
        }), 500);
    });
}
boot();
//# sourceMappingURL=index.js.map