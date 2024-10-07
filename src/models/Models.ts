import {UserAttributes} from './UserDB'

export interface UserBookInfo {
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
	user: UserAttributes
	books: UserBooks
}
