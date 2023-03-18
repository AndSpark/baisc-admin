import dayjs from 'dayjs'

export const getNow = () => Date.now()

export const toTime = (time: number = getNow(), format = 'YYYY-MM-DD HH:mm') =>
	dayjs(time).format(format)

export const toTimeUntilDay = (time: number = getNow(), format = 'YYYY-MM-DD') =>
	toTime(time, format)

export const toTimeCN = (time: number = getNow(), format = 'YYYY年MM月DD日 HH时mm分') =>
	toTime(time, format)

export const toTimeCNUntilDay = (time: number = getNow(), format = 'YYYY年MM月DD日') =>
	toTime(time, format)
