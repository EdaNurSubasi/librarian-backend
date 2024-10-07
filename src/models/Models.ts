import {UserAttributes} from './UserDB'

export interface UserBookInfo {
	id: number
	name: string
	userscore: number
	writername?: string
	picture?: string
}

export interface UserBooks {
	past: UserBookInfo[]
	present: UserBookInfo[]
}

export interface SingleUserData {
	id: number
	name: string
	address?: string
	birthdate?: Date
	picture?: string
	books: UserBooks
}
