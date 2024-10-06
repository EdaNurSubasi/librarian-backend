import config from './configuration/config.js'
import {createBookTableDB, createPastPresentTableDB, createUserTableDB} from './configuration/db_create_config.js'
import Logger from './logger.js'
import {Sequelize} from 'sequelize'

export default class Database {
	public static instance: Database
	public static sequelize: Sequelize
	private logger: Logger
	private pool: Sequelize

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
		if (!this.pool) {
			this.pool = new Sequelize(config.db, config.db_user, config.db_password, {
				host: 'localhost',
				dialect: 'postgres',
			})
			Database.sequelize = this.pool
		}

		try {
			await this.pool.authenticate()
			this.logger.log('info', 'Connection has been established successfully.')
		} catch (error) {
			this.logger.log('error', 'Unable to connect to the database:' + error)
		}
	}

	async userTableCreate() {
		await this.pool.query(createUserTableDB.toString())
	}

	async bookTableCreate() {
		await this.pool.query(createBookTableDB.toString())
	}

	async pastPresentTableCreate() {
		await this.pool.query(createPastPresentTableDB.toString())
	}
}
