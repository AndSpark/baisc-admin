declare type DeepPartial<T> = T extends Function
	? T
	: T extends object
	? { [P in keyof T]?: DeepPartial<T[P]> }
	: T

declare type Override<P, S> = Omit<P, keyof S> & S
