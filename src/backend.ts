import express, {Express} from 'express'
import Logger from './logger'
import config from './configuration/config'

export default class Backend {
	public static instance: Backend
	logger: Logger
	public static app: Express

	private constructor(logger: Logger) {
		this.logger = logger
		Backend.app = express()
		Backend.app.listen(config.port)
		this.logger.log('info', `Backend started to run in port ${config.port}`)
	}

	public static async initialize() {
		if (!this.instance) {
			const logger = Logger.instance
			this.instance = new Backend(logger)
		}
		return this.instance
	}
}
