<template>
  <div class="content-menu" ref="contextMenuRef">
    <slot />
    <Teleport to="body">
      <Transition @enter="handleEnter">
        <div class="menu" ref="menuRef" v-if="contextInfo.visible" :style="{ top: contextInfo.y + 'px', left: contextInfo.x + 'px' }">
          <ul>
            <li v-for="item in props.options" :key="item.label" @click="item.handle">{{ item.label }}</li>
          </ul>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, defineProps } from "vue"
import { useContextMenu } from "./hooks/useContextMenu"

const props = defineProps<{
  options: {
    label: string
    handle: () => void
  }[]
}>()

const contextMenuRef = ref<any>()
const menuRef = ref<any>()
const contextInfo = ref({
  x: 0,
  y: 0,
  visible: false
})

const menuHeight = ref(0)

const handleEnter = (el: any) => {
  el.style.height = "auto"
  menuHeight.value = el.clientHeight
  el.style.height = "0"
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      el.style.height = menuHeight.value + "px"
    })
  })
}
// 计算鼠标是否越界
const isOut = (x: number, y: number, menu: any) => {
  const position = {
    x,
    y
  }
  if (x + menu.clientWidth > window.innerWidth) {
    position.x = window.innerWidth - 150
  }
  if (y + menu.clientHeight > window.innerHeight) {
    position.y = window.innerHeight - 150
  }
  return position
}

onMounted(() => {
  const { x, y, visible } = useContextMenu(contextMenuRef.value)
  contextInfo.value.x = x.value
  contextInfo.value.y = y.value
  contextInfo.value.visible = visible.value
  watch(visible, () => {
    contextInfo.value.visible = visible.value
    const position = isOut(x.value, y.value, {
      clientWidth: 150,
      clientHeight: menuHeight.value || 150
    })
    contextInfo.value.x = position.x
    contextInfo.value.y = position.y
  })
  watch(x, () => {
    contextInfo.value.visible = false
    setTimeout(() => {
      contextInfo.value.visible = visible.value
      const position = isOut(x.value, y.value, {
        clientWidth: 150,
        clientHeight: menuHeight.value || 150
      })
      contextInfo.value.x = position.x
      contextInfo.value.y = position.y
    }, 0)
  })
})
</script>

<style scoped lang="scss">
.content-menu {
  width: 100%;
  height: 100%;
}
.menu {
  position: fixed;
  background-color: #fff;
  width: 150px;
  color: #000;
  border-radius: 20px;
  padding: 0;
  box-shadow: 0 1px 3px #ccc;
  border: 1px solid #ccc;
  transition: 0.5s ease-in;
  overflow: hidden;
  padding: 0 10px;
  ul {
    width: 100%;
    margin: 10px 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    li {
      margin: 0 5px;
      height: 30px;
      width: 100%;
      line-height: 30px;
      text-align: center;
      border-bottom: 1px solid #efefef;
      cursor: pointer;
      transition: all 0.3s ease-in;

      &:hover {
        background-color: #efefef;
        transform: translateY(-10px);
        box-shadow: 0 0 10px #ccc;
        border: 1px solid #fff;
        color: #46bff0;
        border-radius: 10px;
      }
      &:last-child {
        border-bottom: none;
      }
    }
  }
}
</style>
