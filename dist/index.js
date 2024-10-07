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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = __importDefault(require("./api"));
const backend_1 = __importDefault(require("./backend"));
const database_1 = __importDefault(require("./database"));
const logger_1 = __importDefault(require("./logger"));
class App {
    static run() {
        return __awaiter(this, void 0, void 0, function* () {
            yield logger_1.default.initialize();
            yield backend_1.default.initialize();
            yield database_1.default.initialize();
            yield api_1.default.initialize();
        });
    }
}
App.run();
