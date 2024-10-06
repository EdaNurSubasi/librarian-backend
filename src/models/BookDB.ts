import {DataTypes, Model, Optional} from 'sequelize'
import Database from '../database.js'

// Define the Book interface
interface BookAttributes {
	id: number
	name: string
	score?: number
	publishedDate?: Date
	writerName?: string
	picture?: string
}

// Optional attributes for creation
interface BookCreationAttributes extends Optional<BookAttributes, 'id'> {}

// Book Model
export const Book = Database.sequelize.define<Model<BookAttributes, BookCreationAttributes>>('Book', {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true,
		allowNull: false,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	score: {
		type: DataTypes.FLOAT,
		allowNull: true,
	},
	publishedDate: {
		type: DataTypes.DATE, // Use DATE for PostgreSQL TIMESTAMP
		allowNull: true,
	},
	writerName: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	picture: {
		type: DataTypes.STRING,
		allowNull: true,
	},
})
