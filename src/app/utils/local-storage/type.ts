import { Token } from 'szpt-driver-api/auth'

export type localStorageItem<T> = {
	value: T
	expire: number
}

export type StorageData = {
	token: Token
	user: 'user'
	[x: string]: any
}

export type StorageKey = keyof StorageData
