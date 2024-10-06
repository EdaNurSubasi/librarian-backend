var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import config from './configuration/config.js';
import { createBookTableDB, createPastPresentTableDB, createUserTableDB } from './configuration/db_create_config.js';
import Logger from './logger.js';
import { Sequelize } from 'sequelize';
export default class Database {
    constructor(logger) {
        this.logger = logger;
        this.logger.log('info', 'Database initialization started...');
    }
    static initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.instance) {
                const logger = Logger.instance;
                this.instance = new Database(logger);
                yield this.instance.getDatabase();
            }
            return this.instance;
        });
    }
    getDatabase() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.pool) {
                this.pool = new Sequelize(config.db, config.db_user, config.db_password, {
                    host: 'localhost',
                    dialect: 'postgres',
                });
                Database.sequelize = this.pool;
            }
            try {
                yield this.pool.authenticate();
                this.logger.log('info', 'Connection has been established successfully.');
            }
            catch (error) {
                this.logger.log('error', 'Unable to connect to the database:' + error);
            }
        });
    }
    userTableCreate() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.pool.query(createUserTableDB.toString());
        });
    }
    bookTableCreate() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.pool.query(createBookTableDB.toString());
        });
    }
    pastPresentTableCreate() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.pool.query(createPastPresentTableDB.toString());
        });
    }
}
//# sourceMappingURL=database.js.map