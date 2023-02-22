import { setProps } from '@/app/utils/helper/oop'
import { NLayout } from 'naive-ui'
import { KeepAlive, Transition, VNode } from 'vue'
import { RouteLocationNormalizedLoaded, RouterView } from 'vue-router'
import { Component, injectService, VueComponent } from 'vue3-oop'

class BlankLayoutProps {
	showPadding?: boolean = true
}

@Component()
export default class BlankLayout extends VueComponent<BlankLayoutProps> {
	static defaultProps = setProps(BlankLayoutProps)

	render() {
		return (
			<NLayout
				class={[this.$props.showPadding ? 'p-4' : '', 'h-full transition duration-300 ease-in-out']}
			>
				<RouterView
					v-slots={{
						default: (e: any) => {
							if (e.Component)
								return (
									<Transition>
										<KeepAlive>
											<e.Component key={e.route.fullPath}></e.Component>
										</KeepAlive>
									</Transition>
								)
						},
					}}
				></RouterView>
			</NLayout>
		)
	}
}
