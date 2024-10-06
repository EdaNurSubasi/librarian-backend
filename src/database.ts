import config from './config.js'
import Logger from './logger.js'
import {Pool} from 'pg'

export default class Database {
	public static instance: Database

	logger: Logger

	public static pool: Pool

	private constructor(logger: Logger) {
		this.logger = logger

		this.logger.log('info', 'Database initialization started...')
	}

	public static async initialize() {
		if (!this.instance) {
			const logger = Logger.instance
			this.instance = new Database(logger)

			await this.instance.getDatabase()
		}

		return this.instance
	}

	async getDatabase() {
		if (!Database.pool) {
			Database.pool = new Pool({
				host: config.db_host,
				port: config.db_port,
				user: config.db_user,
				password: config.db_password,
				database: config.db,
			})
		}

		return Database.pool
	}
}
