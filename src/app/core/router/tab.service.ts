import { Injectable } from 'injection-js'
import { RouteLocationNormalized } from 'vue-router'
import { injectService, Mut, VueService } from 'vue3-oop'
import { RouterService } from './router.service'

type Tab = Pick<RouteLocationNormalized, 'name' | 'fullPath' | 'meta'>

@Injectable()
export default class TabService extends VueService {
	routerService = injectService(RouterService)!

	@Mut() tabs: Tab[] = []
	@Mut() activeTabPath: string | null = null

	setActiveTab(path: string) {
		this.activeTabPath = path
	}

	handleTabClick(path: string) {
		this.routerService.router.push({ path })
	}

	addTab(route: RouteLocationNormalized) {
		const tab: Tab = {
			name: route.name,
			fullPath: route.fullPath,
			meta: route.meta,
		}
		const existTab = this.tabs.find(t => t.name === tab.name)
		if (existTab && !tab.meta.multiple) return
		this.tabs.push(tab)
	}

	removeTab(path: string) {
		const index = this.tabs.findIndex(tab => tab.fullPath === path)
		if (index === -1) return
		const isActive = path === this.activeTabPath
		if (isActive) {
			const nextIndex = index === this.tabs.length - 1 ? index - 1 : index + 1
			this.setActiveTab(this.tabs[nextIndex].fullPath)
			this.routerService.router.push({ path: this.activeTabPath! })
		}
		this.tabs.splice(index, 1)
	}
}
