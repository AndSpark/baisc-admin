import CssRender, { CNodeChildren, CProperties, CSelector } from 'css-render'

export function createCss(selector: CSelector, props: CProperties, children: CNodeChildren = []) {
	const { c } = CssRender()
	const cStyle = c(selector, props, children)
	cStyle.render()
	cStyle.mount()
}
