import { Injectable } from 'injection-js'
import { darkTheme, useOsTheme } from 'naive-ui'
import { watch } from 'vue'
import { Computed, Mut, VueService } from 'vue3-oop'
import { getNaiveThemeOverrides, initThemeSettings, addThemeCssVarsToHtml } from './theme.util'

@Injectable()
export default class ThemeService extends VueService {
	@Mut() theme = initThemeSettings()

	@Computed()
	get naiveThemeOverrides() {
		return getNaiveThemeOverrides({ primary: this.theme.themeColor, ...this.theme.otherColor })
	}

	@Computed()
	get naiveTheme() {
		return this.theme.darkMode ? darkTheme : undefined
	}

	constructor() {
		super()
		this.watchTheme()
	}

	setDarkMode() {
		this.theme.darkMode = !this.theme.darkMode
	}

	private watchTheme() {
		const osTheme = useOsTheme()

		// 监听naiveUI themeOverrides
		watch(
			() => this.naiveThemeOverrides,
			newValue => {
				if (newValue.common) {
					addThemeCssVarsToHtml(newValue.common)
				}
			},
			{ immediate: true }
		)

		watch(
			() => this.theme.darkMode,
			isDark => {
				const DARK_CLASS = 'dark'
				if (isDark) {
					document.documentElement.classList.add(DARK_CLASS)
				} else {
					document.documentElement.classList.remove(DARK_CLASS)
				}
			}
		)

		watch(
			osTheme,
			newValue => {
				const isDark = newValue === 'dark'
				if (this.theme.followSystemTheme) {
					this.theme.darkMode = isDark
				}
			},
			{ immediate: true }
		)
	}
}
