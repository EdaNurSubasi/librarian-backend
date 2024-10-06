import {DataTypes, Model, Optional} from 'sequelize'
import Database from '../database.js'
import {User} from './UserDB.js'
import {Book} from './BookDB.js'

// Define the PastPresent interface
interface PastPresentAttributes {
	id: number
	userId: number
	bookId: number
	userScore?: number
	stillPresent?: boolean
}

// Optional attributes for creation
interface PastPresentCreationAttributes extends Optional<PastPresentAttributes, 'id'> {}

// PastPresent Model
export const PastPresent = Database.sequelize.define<Model<PastPresentAttributes, PastPresentCreationAttributes>>('PastPresent', {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true,
		allowNull: false,
	},
	userId: {
		type: DataTypes.INTEGER,
		allowNull: false,
		references: {
			model: User, // Assuming User is defined earlier
			key: 'id',
		},
	},
	bookId: {
		type: DataTypes.INTEGER,
		allowNull: false,
		references: {
			model: Book, // Assuming Book is defined earlier
			key: 'id',
		},
	},
	userScore: {
		type: DataTypes.INTEGER,
		allowNull: true,
	},
	stillPresent: {
		type: DataTypes.BOOLEAN,
		allowNull: true,
	},
})
