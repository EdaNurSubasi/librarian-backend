import {DataTypes, Model, Optional} from 'sequelize'
import {sequelizeObject} from '../database'

// Define the Book interface
export interface BookAttributes {
	id: number
	name: string
	score?: number
	publisheddate?: Date
	writername?: string
	picture?: string
}

// Optional attributes for creation
interface BookCreationAttributes extends Optional<BookAttributes, 'id'> {}

// Book Model
export let Book: any = null
export function createBookDBObject() {
	if (!sequelizeObject) {
		return null
	}
	Book = sequelizeObject.define<Model<BookAttributes, BookCreationAttributes>>(
		'books',
		{
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
			publisheddate: {
				type: DataTypes.DATE, // Use DATE for PostgreSQL TIMESTAMP
				allowNull: true,
			},
			writername: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			picture: {
				type: DataTypes.STRING,
				allowNull: true,
			},
		},
		{
			// don't add the timestamp attributes (updatedAt, createdAt)
			timestamps: false,

			// If don't want createdAt
			createdAt: false,

			// If don't want updatedAt
			updatedAt: false,
		}
	)
}
