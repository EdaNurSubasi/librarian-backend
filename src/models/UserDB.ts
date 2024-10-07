import {DataTypes, Model, Optional} from 'sequelize'

import {sequelizeObject} from './../database'

// Define the User interface
export interface UserAttributes {
	id: number
	name: string
	address?: string
	birthdate?: Date
	picture?: string
}

// Optional attributes for creation (id is generated)
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

export let User: any = null

export function createUserDBObject() {
	if (!sequelizeObject) {
		return null
	}
	User = sequelizeObject.define<Model<UserAttributes, UserCreationAttributes>>(
		'users',
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
			address: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			birthdate: {
				type: DataTypes.DATE, // Use DATE for PostgreSQL TIMESTAMP
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
