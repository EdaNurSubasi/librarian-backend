import {DataTypes, Model, Optional} from 'sequelize'
import Database from '../database.js'

// Define the User interface
export interface UserAttributes {
	id: number
	name: string
	address?: string
	birthDate?: Date
	picture?: string
}

// Optional attributes for creation (id is generated)
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

export const User = Database.sequelize.define<Model<UserAttributes, UserCreationAttributes>>('User', {
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
	birthDate: {
		type: DataTypes.DATE, // Use DATE for PostgreSQL TIMESTAMP
		allowNull: true,
	},
	picture: {
		type: DataTypes.STRING,
		allowNull: true,
	},
})
