export enum EnumContentType {
	json = 'application/json',
	formUrlencoded = 'application/x-www-form-urlencoded',
	formData = 'multipart/form-data',
}

/** 数据类型 */
export enum EnumDataType {
	number = '[object Number]',
	string = '[object String]',
	boolean = '[object Boolean]',
	null = '[object Null]',
	undefined = '[object Undefined]',
	object = '[object Object]',
	array = '[object Array]',
	function = '[object Function]',
	date = '[object Date]',
	regexp = '[object RegExp]',
	promise = '[object Promise]',
	set = '[object Set]',
	map = '[object Map]',
	file = '[object File]',
}

export function isDefine<T extends any>(data: T) {
	return !isNull(data) && !isUndefined(data)
}

export function isNumber<T extends number>(data: T | unknown): data is T {
	return Object.prototype.toString.call(data) === EnumDataType.number
}

export function isString<T extends string>(data: T | unknown): data is T {
	return Object.prototype.toString.call(data) === EnumDataType.string
}

export function isBoolean<T extends boolean>(data: T | unknown): data is T {
	return Object.prototype.toString.call(data) === EnumDataType.boolean
}

export function isNull<T extends null>(data: T | unknown): data is T {
	return Object.prototype.toString.call(data) === EnumDataType.null
}

export function isUndefined<T extends undefined>(data: T | unknown): data is T {
	return Object.prototype.toString.call(data) === EnumDataType.undefined
}

export function isObject<T extends Record<string, any>>(data: T | unknown): data is T {
	return Object.prototype.toString.call(data) === EnumDataType.object
}

export function isArray<T extends any[]>(data: T | unknown): data is T {
	return Object.prototype.toString.call(data) === EnumDataType.array
}

export function isFunction<T extends (...args: any[]) => any | void | never>(
	data: T | unknown
): data is T {
	return Object.prototype.toString.call(data) === EnumDataType.function
}

export function isDate<T extends Date>(data: T | unknown): data is T {
	return Object.prototype.toString.call(data) === EnumDataType.date
}

export function isRegExp<T extends RegExp>(data: T | unknown): data is T {
	return Object.prototype.toString.call(data) === EnumDataType.regexp
}

export function isPromise<T extends Promise<any>>(data: T | unknown): data is T {
	return Object.prototype.toString.call(data) === EnumDataType.promise
}

export function isSet<T extends Set<any>>(data: T | unknown): data is T {
	return Object.prototype.toString.call(data) === EnumDataType.set
}

export function isMap<T extends Map<any, any>>(data: T | unknown): data is T {
	return Object.prototype.toString.call(data) === EnumDataType.map
}

export function isFile<T extends File>(data: T | unknown): data is T {
	return Object.prototype.toString.call(data) === EnumDataType.file
}
