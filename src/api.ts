import express, {Express} from 'express'
import Logger from './logger.js'
import Backend from './backend.js'

export default class Api {
	public static instance: Api
	app: Express
	logger: Logger

	constructor(logger: Logger) {
		this.logger = logger
		this.app = Backend.app

		this.app.use(express.json())

		this.app.get('/control', async (req, res) => {
			res.sendStatus(200)
		})

		this.app.get('/', async (req, res) => {
			res.sendStatus(200)
		})
	}

	public static async initialize() {
		if (!this.instance) {
			const logger = Logger.instance
			this.instance = new Api(logger)
			this.instance.logger.log('info', `API initialized.`)
		}
		return this.instance
	}
}
