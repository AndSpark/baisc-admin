import { Token } from 'szpt-driver-api/auth'

export type localStorageItem<T> = {
	value: T
	expire: number
}

export type StorageData = {
	token: Token
	user: 'user'
}

export type StorageKey = keyof StorageData
