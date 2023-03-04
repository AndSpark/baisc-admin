import { Component, injectService, Link, VueComponent } from 'vue3-oop'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import AdminLayout from '../admin-layout/index.vue'
import { Transition, KeepAlive } from 'vue'
import { RouterView } from 'vue-router'
import BasicHearder from './common/basic-header'
import ThemeService from '@/app/core/theme/theme.service'
import BasicSider from './common/basic-sider'
import BasicTab from './common/basic-tab'
import { RouterService } from '@/app/core/router/router.service'

@Component()
export default class BasicLayout extends VueComponent {
	isMobile
	themeService = injectService(ThemeService)!
	routerService = injectService(RouterService)!

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
				siderVisible={false}
				v-slots={{
					header: () => <BasicHearder />,
					tab: () => <BasicTab></BasicTab>,
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
												<KeepAlive exclude={this.routerService.excludes}>
													{this.routerService.reloadFlag && (
														<e.Component key={e.route.fullPath}></e.Component>
													)}
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
