import { StorageData, StorageKey } from './type'

export function localGet<T extends StorageKey>(key: T): StorageData[T] | null {
	const item = localStorage.getItem(key)
	if (item) {
		const val = JSON.parse(item)
		if (val.expire < Date.now()) {
			return val.value
		}
		localStorage.removeItem(key)
		return null
	}
	return null
}

export function localSet<T extends StorageKey>(key: T, value: StorageData[T], expire = 0): boolean {
	const data = JSON.stringify({
		value,
		expire: expire ? Date.now() + expire : 0,
	})
	localStorage.setItem(key, data)

	return true
}

export function Localhas<T extends StorageKey>(key: T): boolean {
	return !!localGet(key)
}

export function localRemove<T extends StorageKey>(key: T) {
	localStorage.removeItem(key)
}

export function localClear() {
	localStorage.clear()
}
