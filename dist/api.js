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
import Backend from './backend.js';
export default class Api {
    constructor(logger) {
        this.logger = logger;
        this.app = Backend.app;
        this.app.use(express.json(), (err, req, res, next) => {
            //res.status(err.status || 500).json({error: err.message})
        });
        this.app.get('/control', (req, res) => __awaiter(this, void 0, void 0, function* () {
            res.sendStatus(200);
        }));
        this.app.get('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
            res.sendStatus(200);
        }));
    }
    static initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.instance) {
                const logger = Logger.instance;
                this.instance = new Api(logger);
                this.instance.logger.log('info', `API initialized.`);
            }
            return this.instance;
        });
    }
}
//# sourceMappingURL=api.js.map