import express, {Express} from 'express'
import Logger from './logger.js'
import Backend from './backend.js'
import Database from './database.js'

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

		// DB table creation
		this.app.get('/setup/user', async (req, res) => {
			try {
				await this.database.userTableCreate()
			} catch (error) {
				logger.log('error', 'Unable to create user table:' + error)
				res.sendStatus(500)
			}
		})
		this.app.get('/setup/book', async (req, res) => {
			try {
				await this.database.bookTableCreate()
			} catch (error) {
				logger.log('error', 'Unable to create book table:' + error)
				res.sendStatus(500)
			}
		})
		this.app.get('/setup/pastpresent', async (req, res) => {
			try {
				await this.database.pastPresentTableCreate()
			} catch (error) {
				logger.log('error', 'Unable to create pastpresent table:' + error)
				res.sendStatus(500)
			}
		})

		this.app.get('/', async (req, res) => {
			res.sendStatus(200)
		})
	}

	public static async initialize() {
		if (!this.instance) {
			const logger = Logger.instance
			const database = Database.instance
			this.instance = new Api(logger, database)
			this.instance.logger.log('info', `API initialized.`)
		}
		return this.instance
	}
}
