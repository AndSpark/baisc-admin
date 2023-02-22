export function setProps(Props: any) {
	const props: Record<string, any> = {}
	const propsData = new Props()

	Object.entries(propsData).forEach(([key, value]) => {
		if (value) {
			props[key] = {
				default: value,
			}
		} else {
			props[key] = {}
		}
	})
	return props
}
