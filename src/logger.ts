import {pino} from 'pino'

export default class Logger {
	public static instance: Logger

	private logInstance = pino({
		transport: {
			target: 'pino-pretty',
			options: {
				colorize: true,
			},
		},
		base: {
			pid: false,
		},
	})

	private constructor() {
		this.log('info', 'Logger Initialized.')
	}

	public static async initialize() {
		if (!this.instance) {
			this.instance = new Logger()
		}
		return this.instance
	}

	public log(level: string, message: string, code: number = 200) {
		switch (level) {
			case 'info':
				this.logInstance.info(message)
				break
			case 'debug':
				this.logInstance.debug(message)
				break
			case 'error':
				this.logInstance.error(message)
				break
			default:
				break
		}
	}
}
