import Api from './api'
import Backend from './backend'
import Database from './database'
import Logger from './logger'

class App {
	public static async run() {
		await Logger.initialize()
		await Backend.initialize()
		await Database.initialize()
		await Api.initialize()
	}
}

App.run()
