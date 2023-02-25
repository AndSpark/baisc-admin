import { GlobalThemeOverrides } from 'naive-ui'
import { addColorAlpha, getColorPalette } from './color'
import themeSetting from './theme.setting'
import { kebabCase } from 'lodash-es'

type ColorType = 'primary' | 'info' | 'success' | 'warning' | 'error'
type ColorScene = '' | 'Suppl' | 'Hover' | 'Pressed' | 'Active'
type ColorKey = `${ColorType}Color${ColorScene}`
type ThemeColor = Partial<Record<ColorKey, string>>
interface ColorAction {
	scene: ColorScene
	handler: (color: string) => string
}

export function initThemeSettings() {
	const themeColor = themeSetting.themeColor
	const info = themeSetting.isCustomizeInfoColor
		? themeSetting.otherColor.info
		: getColorPalette(themeColor, 7)
	const otherColor = { ...themeSetting.otherColor, info }
	const setting = { ...themeSetting, themeColor, otherColor }
	return setting
}

/** 获取主题颜色的各种场景对应的颜色 */
function getThemeColors(colors: [ColorType, string][]) {
	const colorActions: ColorAction[] = [
		{ scene: '', handler: color => color },
		{ scene: 'Suppl', handler: color => color },
		{ scene: 'Hover', handler: color => getColorPalette(color, 5) },
		{ scene: 'Pressed', handler: color => getColorPalette(color, 7) },
		{ scene: 'Active', handler: color => addColorAlpha(color, 0.1) },
	]

	const themeColor: ThemeColor = {}

	colors.forEach(color => {
		colorActions.forEach(action => {
			const [colorType, colorValue] = color
			const colorKey: ColorKey = `${colorType}Color${action.scene}`
			themeColor[colorKey] = action.handler(colorValue)
		})
	})

	return themeColor
}

/** 获取naive的主题颜色 */
export function getNaiveThemeOverrides(colors: Record<ColorType, string>): GlobalThemeOverrides {
	const { primary, success, warning, error } = colors

	const info = themeSetting.isCustomizeInfoColor ? colors.info : getColorPalette(primary, 7)

	const themeColors = getThemeColors([
		['primary', primary],
		['info', info],
		['success', success],
		['warning', warning],
		['error', error],
	])

	const colorLoading = primary

	return {
		common: {
			...themeColors,
		},
		LoadingBar: {
			colorLoading,
		},
	}
}

type ThemeVars = Exclude<GlobalThemeOverrides['common'], undefined>
type ThemeVarsKeys = keyof ThemeVars

export function addThemeCssVarsToHtml(themeVars: ThemeVars) {
	const keys = Object.keys(themeVars) as ThemeVarsKeys[]
	const style: string[] = []
	keys.forEach(key => {
		style.push(`--${kebabCase(key)}: ${themeVars[key]}`)
	})
	const styleStr = style.join(';')
	document.documentElement.style.cssText += styleStr
}
