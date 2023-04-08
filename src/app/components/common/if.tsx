import { SetupContext } from 'vue'

export interface IfProps {
	if: boolean
}

export default function If(props: IfProps, ctx: SetupContext) {
	if (props.if) return <>{ctx.slots.default?.()}</>
	return null
}
