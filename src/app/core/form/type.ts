import { FormItemProps } from 'naive-ui'

export type FormItemOption = FormItemProps & {
	component: any
	componentProps: any
	componentSlot?: any
}
