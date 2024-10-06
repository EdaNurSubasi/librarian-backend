var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from 'express';
import Logger from './logger.js';
import config from './configuration/config.js';
export default class Backend {
    constructor(logger) {
        this.logger = logger;
        Backend.app = express();
        Backend.app.listen(config.port);
        this.logger.log('info', `Backend started to run in port ${config.port}`);
    }
    static initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.instance) {
                const logger = Logger.instance;
                this.instance = new Backend(logger);
            }
            return this.instance;
        });
    }
}
//# sourceMappingURL=backend.js.map