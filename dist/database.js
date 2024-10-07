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
exports.sequelizeObject = void 0;
const db_create_config_1 = require("./configuration/db_create_config");
const logger_1 = __importDefault(require("./logger"));
const sequelize_1 = require("sequelize");
const UserDB_1 = require("./models/UserDB");
const config_1 = __importDefault(require("./configuration/config"));
const BookDB_1 = require("./models/BookDB");
const PastPresentDB_1 = require("./models/PastPresentDB");
class Database {
    constructor(logger) {
        this.logger = logger;
        this.logger.log('info', 'Database initialization started...');
    }
    static initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.instance) {
                const logger = logger_1.default.instance;
                this.instance = new Database(logger);
                yield this.instance.createDatabaseConnection();
                (0, UserDB_1.createUserDBObject)();
                (0, BookDB_1.createBookDBObject)();
                (0, PastPresentDB_1.createPastPresentDBObject)();
            }
            return this.instance;
        });
    }
    createDatabaseConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!exports.sequelizeObject) {
                exports.sequelizeObject = new sequelize_1.Sequelize(config_1.default.db, config_1.default.db_user, config_1.default.db_password, {
                    host: config_1.default.db_host,
                    dialect: 'postgres',
                });
            }
            try {
                yield exports.sequelizeObject.authenticate();
                this.logger.log('info', 'Connection has been established successfully.');
            }
            catch (error) {
                this.logger.log('error', 'Unable to connect to the database:' + error);
            }
            return exports.sequelizeObject;
        });
    }
    userTableCreate() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.pool.query(db_create_config_1.createUserTableDB.toString());
        });
    }
    bookTableCreate() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.pool.query(db_create_config_1.createBookTableDB.toString());
        });
    }
    pastPresentTableCreate() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.pool.query(db_create_config_1.createPastPresentTableDB.toString());
        });
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield UserDB_1.User.findAll();
        });
    }
    getUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield UserDB_1.User.findOne({ where: { id: id } });
            return user;
        });
    }
    getPastPresentDataByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield PastPresentDB_1.PastPresent.findAll({ where: { userid: userId } });
        });
    }
    getAllBooks() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield BookDB_1.Book.findAll();
        });
    }
    getBook(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield BookDB_1.Book.findOne({ where: { id: id } });
        });
    }
    get pool() {
        return this._pool;
    }
    set pool(value) {
        this._pool = value;
    }
}
exports.default = Database;
