import Api from './api.js'
import Backend from './backend.js'
import Logger from './logger.js'

class App {
	public static async run() {
		await Logger.initialize()
		await Backend.initialize()
		await Api.initialize()
	}
}

App.run()
