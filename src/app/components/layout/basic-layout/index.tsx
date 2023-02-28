import { Component, injectService, VueComponent } from 'vue3-oop'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import AdminLayout from '../admin-layout/index.vue'
import { Transition, KeepAlive } from 'vue'
import { RouterView } from 'vue-router'
import BasicHearder from './common/basic-header'
import ThemeService from '@/app/core/theme/theme.service'
import BasicSider from './common/basic-sider'

@Component()
export default class BasicLayout extends VueComponent {
	isMobile
	themeService = injectService(ThemeService)!

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
				mode={'horizontal'}
				v-slots={{
					header: () => <BasicHearder />,
					tab: () => <div></div>,
					sider: () => <BasicSider></BasicSider>,
					footer: () => <div></div>,
					default: () => (
						<RouterView
							v-slots={{
								default: (e: any) => {
									if (e.Component)
										return (
											<Transition
												name={this.themeService.theme.page.animateMode}
												mode={'out-in'}
												appear
											>
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
