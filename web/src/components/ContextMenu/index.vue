<template>
  <div class="content-menu" ref="contextMenuRef">
    {{ x }}{{ y }}
    <slot />
    <Teleport to="body">
      <div class="menu" ref="menuRef" v-if="contextInfo.visible" :style="{ top: contextInfo.y + 'px', left: contextInfo.x + 'px' }">
        <ul>
          <li>个人信息</li>
          <li>个人信息</li>
          <li>个人信息</li>
          <li>个人信息</li>
          <li>个人信息</li>
          <li>个人信息</li>
        </ul>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue"
import { useContextMenu } from "./hooks/useContextMenu"
import { onClickOutside } from "@vueuse/core"

const contextMenuRef = ref<any>()
const menuRef = ref<any>()
const contextInfo = ref({
  x: 0,
  y: 0,
  visible: false
})
onMounted(() => {
  const { x, y, visible } = useContextMenu(contextMenuRef.value)
  contextInfo.value.x = x.value
  contextInfo.value.y = y.value
  contextInfo.value.visible = visible.value
  watch(visible, (val) => {
    console.log(val)

    contextInfo.value.x = x.value
    contextInfo.value.y = y.value
    contextInfo.value.visible = visible.value
  })
  watch(x, (val) => {
    console.log(val)

    contextInfo.value.x = x.value
    contextInfo.value.y = y.value
    contextInfo.value.visible = visible.value
  })
})
</script>

<style scoped>
.content-menu {
  width: 100%;
  height: 100%;
}
.menu {
  position: fixed;
}
</style>
