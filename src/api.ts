import express, {Express} from 'express'
import Logger from './logger'
import Backend from './backend'
import Database from './database'
import {PastPresentAttributes} from './models/PastPresentDB'
import {UserAttributes} from './models/UserDB'
import {SingleUserData, UserBookInfo, UserBooks} from './models/Models'
import {Book, BookAttributes} from './models/BookDB'

export default class Api {
	public static instance: Api
	private app: Express
	private logger: Logger
	private database: Database

	constructor(logger: Logger, database: Database) {
		this.logger = logger
		this.database = database
		this.app = Backend.app

		this.app.use(express.json())
		this.createRequests()
	}

	public static async initialize() {
		if (!this.instance) {
			const logger = Logger.instance
			const database = Database.instance
			this.instance = new Api(logger, database)
			this.instance.logger.log('info', `API initialized.`)
		}
	}

	createRequests() {
		// DB table creation
		this.app.get('/setup/user', async (req, res) => {
			try {
				await this.database.userTableCreate()
			} catch (error) {
				this.logger.log('error', 'Unable to create user table:' + error)
				res.sendStatus(500)
			}
		})
		this.app.get('/setup/book', async (req, res) => {
			try {
				await this.database.bookTableCreate()
			} catch (error) {
				this.logger.log('error', 'Unable to create book table:' + error)
				res.sendStatus(500)
			}
		})
		this.app.get('/setup/pastpresent', async (req, res) => {
			try {
				await this.database.pastPresentTableCreate()
			} catch (error) {
				this.logger.log('error', 'Unable to create pastpresent table:' + error)
				res.sendStatus(500)
			}
		})

		// Frontend api processes
		this.app.get('/users', async (req, res) => {
			try {
				const users = await this.database.getAllUsers()

				if (users) {
					res.status(200).json(users)
				} else {
					res.status(404).json({error: 'Users not available'})
				}
			} catch (error) {
				this.logger.log('error', 'Unable to get users:' + error)
				res.status(500).json({error: 'Unable to get users' + error})
			}
		})

		this.app.get('/users/:id', async (req, res) => {
			try {
				console.log(req.params.id)
				let user: UserAttributes = await this.database.getUser(req.params.id)
				let pastPresentData: PastPresentAttributes[] = await this.database.getPastPresentDataByUserId(req.params.id)

				let singleUserInfo: SingleUserData = await this.createSingleUserInfo(pastPresentData, user)
				if (user) {
					res.status(200).json(singleUserInfo)
				} else {
					res.status(404).json({error: 'User not found'})
				}
			} catch (error) {
				this.logger.log('error', 'Unable to get user:' + error)
				res.sendStatus(500)
			}
		})

		this.app.get('/books', async (req, res) => {
			try {
				const books = await this.database.getAllBooks()

				if (books) {
					res.status(200).json(books)
				} else {
					res.status(404).json({error: 'Books not available'})
				}
			} catch (error) {
				this.logger.log('error', 'Unable to get books:' + error)
				res.sendStatus(500)
			}
		})

		this.app.get('/books/:id', async (req, res) => {
			try {
				console.log(req.params.id)
				const book = await this.database.getBook(req.params.id)

				if (book) {
					res.status(200).json(book)
				} else {
					res.status(404).json({error: 'Book not found'})
				}
			} catch (error) {
				this.logger.log('error', 'Unable to get book:' + error)
				res.sendStatus(500)
			}
		})

		this.app.post('/users/:userId/borrow/:bookId', async (req, res) => {
			try {
				const userId = parseInt(req.params.userId)
				const bookId = parseInt(req.params.bookId)

				let pastPresentData: PastPresentAttributes = await this.database.getPastPresentDataExist(userId, bookId)
				console.log(pastPresentData)
				if (!pastPresentData) {
					let pastPresentDataNew: PastPresentAttributes = {
						userid: userId,
						bookid: bookId,
						stillpresent: true,
						userscore: 0,
					}

					pastPresentData = await this.database.createPastPresentData(pastPresentDataNew)

					if (!pastPresentData) {
						res.status(404).json({error: 'Information can not be added'})
					} else {
						res.status(200).json(pastPresentData)
					}
				} else {
					let updatedPastPresentData = await this.database.updatePastPresentDataAsReturn(true, 0, userId, bookId)

					let status = updatedPastPresentData == 0 ? false : true

					if (!status) {
						res.status(404).json({error: 'Information can not be updated'})
					} else {
						pastPresentData.stillpresent = true
						pastPresentData.userscore = 0
						res.status(200).json(pastPresentData)
					}
				}
			} catch (error) {
				this.logger.log('error', 'Unable to create information:' + error)
				res.sendStatus(500)
			}
		})

		this.app.post('/users/:userId/return/:bookId', async (req, res) => {
			try {
				const userId = parseInt(req.params.userId)
				const bookId = parseInt(req.params.bookId)
				const {score} = req.body

				let updatedPastPresentData = await this.database.updatePastPresentDataAsReturn(false, score, userId, bookId)
				console.log(updatedPastPresentData)
				res.status(200).json(updatedPastPresentData == 0 ? false : true)
			} catch (error) {
				this.logger.log('error', 'Unable to update information:' + error)
				res.sendStatus(500)
			}
		})
	}

	private async createSingleUserInfo(pastPresentData: PastPresentAttributes[], user: UserAttributes) {
		let pastBooks: UserBookInfo[] = await this.filterReturnedBooksInfo(pastPresentData)

		let presentBooks: UserBookInfo[] = await this.filterBorrowedBooksInfo(pastPresentData)

		let userBooks: UserBooks = {
			past: pastBooks,
			present: presentBooks,
		}

		let singleUserInfo: SingleUserData = {
			user: user,
			books: userBooks,
		}

		return singleUserInfo
	}

	private async filterBorrowedBooksInfo(pastPresentData: PastPresentAttributes[]) {
		let presentData = pastPresentData.filter(data => data.stillpresent)
		let presentBooks: UserBookInfo[] = []
		for (let index = 0; index < presentData.length; index++) {
			const data = presentData[index]
			if (!data) {
				continue
			}
			let book: BookAttributes = await this.database.getBook(data.bookid.toString())
			let userBook: UserBookInfo = {
				name: book.name,
				userscore: data.userscore ? data.userscore : 0,
				writername: book.writername,
				picture: book.picture,
			}
			presentBooks.push(userBook)
		}
		return presentBooks
	}

	private async filterReturnedBooksInfo(pastPresentData: PastPresentAttributes[]) {
		let pastData = pastPresentData.filter(data => !data.stillpresent)
		let pastBooks: UserBookInfo[] = []

		for (let index = 0; index < pastData.length; index++) {
			const data = pastData[index]
			if (!data) {
				continue
			}

			let book: BookAttributes = await this.database.getBook(data.bookid.toString())
			let userBook: UserBookInfo = {
				name: book.name,
				userscore: data.userscore ? data.userscore : 0,
				writername: book.writername,
				picture: book.picture,
			}
			pastBooks.push(userBook)
		}
		return pastBooks
	}
}
