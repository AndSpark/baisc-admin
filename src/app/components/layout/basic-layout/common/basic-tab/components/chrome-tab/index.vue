<template>
  <div
    class="admin-tab__chrome-tab"
    :class="{
      'admin-tab__chrome-tab--active': isActive,
      'admin-tab__chrome-tab--hover': isHover,
    }"
    @mouseenter="setTrue"
    @mouseleave="setFalse"
  >
    <div class="admin-tab__chrome-tab__bg">
      <svg-radius-bg
        :dark-mode="darkMode"
        :is-active="isActive"
        :is-hover="isHover"
        :primary-color="primaryColor"
        :bg-color="bgColor"
        :hover-bg-color="hoverBgColor"
        :mix-color="mixColor"
        :mix-ratio="mixRatio"
      />
    </div>
    <span class="admin-tab__chrome-tab__slot">
      <slot></slot>
    </span>
    <div v-if="closable" class="admin-tab__chrome-tab__icon">
      <icon-close
        :is-active="isActive"
        :active-color="primaryColor"
        @click="handleClose"
      />
    </div>
    <div
      class="admin-tab__chrome-tab__divider"
      :class="{
        'admin-tab__chrome-tab__divider--hide': isHover || isActive,
        'admin-tab__chrome-tab__divider--dark': darkMode,
      }"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { CssRender } from 'css-render'
import { IconClose, SvgRadiusBg } from './components'
import { ref } from 'vue'

function useBoolean(initValue = false) {
  const bool = ref(initValue)

  function setBool(value: boolean) {
    bool.value = value
  }
  function setTrue() {
    setBool(true)
  }
  function setFalse() {
    setBool(false)
  }
  function toggle() {
    setBool(!bool.value)
  }

  return {
    bool,
    setBool,
    setTrue,
    setFalse,
    toggle,
  }
}

/** 填充颜色： [默认颜色, 暗黑主题颜色] */
type FillColor = [string, string]

/** 混合比例：[默认, 暗黑] */
type MixRatio = [number, number]

interface Props {
  /** 暗黑模式 */
  darkMode?: boolean
  /** 激活状态 */
  isActive?: boolean
  /** 主题颜色 */
  primaryColor?: string
  /** 是否显示关闭图标 */
  closable?: boolean
  /** 背景颜色 */
  bgColor?: FillColor
  /** 悬浮时的背景颜色 */
  hoverBgColor?: FillColor
  /** 激活状态时的混合颜色 */
  mixColor?: FillColor
  /** 混合比例(主题颜色的占比) */
  mixRatio?: MixRatio
}

withDefaults(defineProps<Props>(), {
  darkMode: false,
  isActive: false,
  primaryColor: '#1890ff',
  closable: true,
  bgColor: () => ['#ffffff', '#18181c'],
  hoverBgColor: () => ['#dee1e6', 'rgb(50,50,50)'],
  mixColor: () => ['#ffffff', '#000'],
  mixRatio: () => [0.13, 0.35],
})

interface Emits {
  /** 点击关闭图标 */
  (e: 'close'): void
}

const emit = defineEmits<Emits>()

const { bool: isHover, setTrue, setFalse } = useBoolean()

function handleClose(e: MouseEvent) {
  e.stopPropagation()
  emit('close')
}

const { c } = CssRender()
const style = c(
  '.admin-tab__chrome-tab',
  {
    width: '300px',
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    height: '34px',
    paddingLeft: '24px',
    paddingRight: '24px',
    marginRight: '-18px',
    cursor: 'pointer',
    overflow: 'hidden',
  },
  [
    c('&--active', {
      zIndex: 10,
    }),
    c('&--hover', {
      zIndex: 9,
    }),
    c('&__bg', {
      position: 'absolute',
      left: 0,
      bottom: 0,
      width: '100%',
      height: '100%',
      overflow: 'hidden',
    }),
    c('&__slot', {
      position: 'relative',
      zIndex: 2,
      whiteSpace: 'nowrap',
      width: 'calc(100% - 10px )',
      minWidth: '16px',
      overflow: 'hidden',
    }),
    c('&__icon', {
      position: 'absolute',
      right: '16px',
    }),
    c(
      '&__divider',
      {
        position: 'absolute',
        right: '7.5px',
        zIndex: 2,
        width: '1px',
        height: '16px',
        backgroundColor: '#1f2225',
        opacity: 1,
        transition: 'opacity 0.3s ease-in-out',
      },
      [
        c('&--hide', {
          opacity: 0,
        }),
        c('&--dark', {
          backgroundColor: 'rgba(255,255,255,0.4) !important',
        }),
      ]
    ),
  ]
)
style.render()
style.mount()
</script>
<style scoped></style>
