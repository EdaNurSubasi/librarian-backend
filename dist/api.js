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
import Database from './database.js';
export default class Api {
    constructor(logger, database) {
        this.logger = logger;
        this.database = database;
        this.app = Backend.app;
        this.app.use(express.json());
        // DB table creation
        this.app.get('/setup/user', (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.database.userTableCreate();
            }
            catch (error) {
                logger.log('error', 'Unable to create user table:' + error);
                res.sendStatus(500);
            }
        }));
        this.app.get('/setup/book', (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.database.bookTableCreate();
            }
            catch (error) {
                logger.log('error', 'Unable to create book table:' + error);
                res.sendStatus(500);
            }
        }));
        this.app.get('/setup/pastpresent', (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.database.pastPresentTableCreate();
            }
            catch (error) {
                logger.log('error', 'Unable to create pastpresent table:' + error);
                res.sendStatus(500);
            }
        }));
        this.app.get('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
            res.sendStatus(200);
        }));
    }
    static initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.instance) {
                const logger = Logger.instance;
                const database = Database.instance;
                this.instance = new Api(logger, database);
                this.instance.logger.log('info', `API initialized.`);
            }
            return this.instance;
        });
    }
}
//# sourceMappingURL=api.js.map