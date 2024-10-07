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
const express_1 = __importDefault(require("express"));
const logger_1 = __importDefault(require("./logger"));
const backend_1 = __importDefault(require("./backend"));
const database_1 = __importDefault(require("./database"));
class Api {
    constructor(logger, database) {
        this.logger = logger;
        this.database = database;
        this.app = backend_1.default.app;
        this.app.use(express_1.default.json());
        this.createRequests();
    }
    static initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.instance) {
                const logger = logger_1.default.instance;
                const database = database_1.default.instance;
                this.instance = new Api(logger, database);
                this.instance.logger.log('info', `API initialized.`);
            }
        });
    }
    createRequests() {
        // DB table creation
        this.app.get('/setup/user', (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.database.userTableCreate();
            }
            catch (error) {
                this.logger.log('error', 'Unable to create user table:' + error);
                res.sendStatus(500);
            }
        }));
        this.app.get('/setup/book', (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.database.bookTableCreate();
            }
            catch (error) {
                this.logger.log('error', 'Unable to create book table:' + error);
                res.sendStatus(500);
            }
        }));
        this.app.get('/setup/pastpresent', (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.database.pastPresentTableCreate();
            }
            catch (error) {
                this.logger.log('error', 'Unable to create pastpresent table:' + error);
                res.sendStatus(500);
            }
        }));
        // Frontend api processes
        this.app.get('/users', (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.database.getAllUsers();
                if (users) {
                    res.status(200).json(users);
                }
                else {
                    res.status(404).json({ error: 'Users not available' });
                }
            }
            catch (error) {
                this.logger.log('error', 'Unable to get users:' + error);
                res.status(500).json({ error: 'Unable to get users' + error });
            }
        }));
        this.app.get('/users/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.params.id);
                let user = yield this.database.getUser(req.params.id);
                let pastPresentData = yield this.database.getPastPresentDataByUserId(req.params.id);
                let pastData = pastPresentData.filter(data => !data.stillpresent);
                let presentData = pastPresentData.filter(data => data.stillpresent);
                let pastBooks = [];
                let presentBooks = [];
                for (let index = 0; index < pastData.length; index++) {
                    const data = pastData[index];
                    if (!data) {
                        continue;
                    }
                    let book = yield this.database.getBook(data.bookid.toString());
                    let userBook = {
                        name: book.name,
                        userscore: data.userscore ? data.userscore : 0,
                        writername: book.writername,
                        picture: book.picture,
                    };
                    pastBooks.push(userBook);
                }
                for (let index = 0; index < presentData.length; index++) {
                    const data = presentData[index];
                    if (!data) {
                        continue;
                    }
                    let book = yield this.database.getBook(data.bookid.toString());
                    let userBook = {
                        name: book.name,
                        userscore: data.userscore ? data.userscore : 0,
                        writername: book.writername,
                        picture: book.picture,
                    };
                    presentBooks.push(userBook);
                }
                console.log(pastBooks);
                let userBooks = {
                    past: pastBooks,
                    present: presentBooks,
                };
                let singleUserInfo = {
                    user: user,
                    books: userBooks,
                };
                if (user) {
                    res.status(200).json(singleUserInfo);
                }
                else {
                    res.status(404).json({ error: 'User not found' });
                }
            }
            catch (error) {
                this.logger.log('error', 'Unable to get user:' + error);
                res.sendStatus(500);
            }
        }));
        this.app.get('/books', (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const books = yield this.database.getAllBooks();
                if (books) {
                    res.status(200).json(books);
                }
                else {
                    res.status(404).json({ error: 'Books not available' });
                }
            }
            catch (error) {
                this.logger.log('error', 'Unable to get books:' + error);
                res.sendStatus(500);
            }
        }));
        this.app.get('/books/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.params.id);
                const book = yield this.database.getBook(req.params.id);
                if (book) {
                    res.status(200).json(book);
                }
                else {
                    res.status(404).json({ error: 'Book not found' });
                }
            }
            catch (error) {
                this.logger.log('error', 'Unable to get book:' + error);
                res.sendStatus(500);
            }
        }));
    }
}
exports.default = Api;
