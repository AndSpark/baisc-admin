import { Component, VueComponent } from 'vue3-oop'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import AdminLayout from '../admin-layout/index.vue'
import { Transition, KeepAlive } from 'vue'
import { RouterView } from 'vue-router'
import BasicHearder from './common/basic-header'

@Component()
export default class BasicLayout extends VueComponent {
	isMobile

	constructor() {
		super()
		const breakpoints = useBreakpoints(breakpointsTailwind)
		const isMobile = breakpoints.smaller('sm')
		this.isMobile = isMobile
	}

	render() {
		return (
			<AdminLayout
				isMobile={this.isMobile.value}
				v-slots={{
					header: () => <BasicHearder />,
					tab: () => <div></div>,
					sider: () => <div></div>,
					footer: () => <div></div>,
					default: () => (
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
					),
				}}
			></AdminLayout>
		)
	}
}
