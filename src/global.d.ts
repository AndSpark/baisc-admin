import 'vue-router'
export type RouterLayout = 'basic' | 'blank'

declare module 'vue-router' {
	interface RouteMeta {
		title?: string
		icon?: string
		layout?: RouterLayout
		hide?: boolean
		multiple?: boolean
		index?: number
	}
}

declare type DeepPartial<T> = T extends Function
	? T
	: T extends object
	? { [P in keyof T]?: DeepPartial<T[P]> }
	: T

declare type Override<P, S> = Omit<P, keyof S> & S
