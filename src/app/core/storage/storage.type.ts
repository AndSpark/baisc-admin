import { Token } from 'szpt-driver-api/auth'
import { Theme } from '../theme/theme.service'

export type localStorageItem<T> = {
	value: T
	expire: number
}

export type StorageData = {
	token: Token
	user: 'user'
	theme: Theme
}

export type StorageKey = keyof StorageData
