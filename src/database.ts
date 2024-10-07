import {createBookTableDB, createPastPresentTableDB, createUserTableDB} from './configuration/db_create_config'
import Logger from './logger'
import {Sequelize} from 'sequelize'
import {createUserDBObject, User} from './models/UserDB'
import config from './configuration/config'
import {Book, createBookDBObject} from './models/BookDB'
import {createPastPresentDBObject, PastPresent} from './models/PastPresentDB'

export default class Database {
	public static instance: Database
	private logger: Logger

	private _pool!: Sequelize

	private constructor(logger: Logger) {
		this.logger = logger

		this.logger.log('info', 'Database initialization started...')
	}

	public static async initialize() {
		if (!this.instance) {
			const logger = Logger.instance
			this.instance = new Database(logger)

			await this.instance.createDatabaseConnection()

			createUserDBObject()
			createBookDBObject()
			createPastPresentDBObject()
		}

		return this.instance
	}

	async createDatabaseConnection() {
		if (!sequelizeObject) {
			sequelizeObject = new Sequelize(config.db!, config.db_user!, config.db_password!, {
				host: config.db_host,
				dialect: 'postgres',
			})
		}

		try {
			await sequelizeObject.authenticate()
			this.logger.log('info', 'Connection has been established successfully.')
		} catch (error) {
			this.logger.log('error', 'Unable to connect to the database:' + error)
		}

		return sequelizeObject
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

	async getAllUsers() {
		return await User.findAll()
	}

	async getUser(id: string) {
		const user = await User.findOne({where: {id: id}})
		return user
	}

	async getPastPresentDataByUserId(userId: string) {
		return await PastPresent.findAll({where: {userid: userId}})
	}

	async getAllBooks() {
		return await Book.findAll()
	}

	async getBook(id: string) {
		return await Book.findOne({where: {id: id}})
	}

	public get pool(): Sequelize {
		return this._pool
	}
	public set pool(value: Sequelize) {
		this._pool = value
	}
}

export let sequelizeObject: Sequelize
