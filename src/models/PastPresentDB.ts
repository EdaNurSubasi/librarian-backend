import {DataTypes, Model, Optional} from 'sequelize'
import {User, UserAttributes} from './UserDB'
import {Book} from './BookDB'
import {sequelizeObject} from '../database'

// Define the PastPresent interface
export interface PastPresentAttributes {
	id: number
	userid: UserAttributes
	bookid: number
	userscore?: number
	stillpresent?: boolean
}

// Optional attributes for creation
interface PastPresentCreationAttributes extends Optional<PastPresentAttributes, 'id'> {}

// PastPresent Model
export let PastPresent: any = null
export function createPastPresentDBObject() {
	if (!sequelizeObject) {
		return null
	}

	PastPresent = sequelizeObject.define<Model<PastPresentAttributes, PastPresentCreationAttributes>>(
		'pastpresentdata',
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
				allowNull: false,
			},
			userid: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: User, // Assuming User is defined earlier
					key: 'id',
				},
			},
			bookid: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: Book, // Assuming Book is defined earlier
					key: 'id',
				},
			},
			userscore: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			stillpresent: {
				type: DataTypes.BOOLEAN,
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
