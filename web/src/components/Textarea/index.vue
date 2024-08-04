<template>
  <div class="textarea">
    <el-input
      style="background-image: url(../../../../assets/layouts/comment-bg.png); background-color: transparent"
      type="textarea"
      placeholder="期待能留下足迹~~ ✨ ✨ ✨"
      maxlength="100"
      show-word-limit
      class="content"
      :input-style="'min-height:200px;'"
      :autosize="false"
      resize="none"
      :modelValue="content"
      @update:modelValue="change"
    />
    <div class="emoji">
      <SvgIcon
        @click="openEmoji"
        style="width: 25px; height: 25px; margin-left: 10px"
        name="emoji"
        :style="{ color: showEmoji ? '#3cbff5' : '#999' }"
      />
    </div>
    <Vue3EmojiPicker
      @select="selectEmoji"
      v-if="showEmoji"
      ref="emojiPicker"
      class="emojiPicker emoji animate__animated animate__zoomIn"
      :native="true"
    />
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref, watch } from "vue"
import { onClickOutside } from "@vueuse/core"

const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits(["update:modelValue"])

const content = ref<string>(props.modelValue)

watch(
  () => props.modelValue,
  () => {
    content.value = props.modelValue
  }
)

const change = (value: string) => {
  content.value = value
  emit("update:modelValue", content.value)
}

const showEmoji = ref(false)

const selectEmoji = (emoji: string) => {
  content.value += emoji.i
  change(content.value)
}

const openEmoji = () => {
  showEmoji.value = !showEmoji.value
}

const emojiPicker = ref(null)

onClickOutside(emojiPicker, () => {
  showEmoji.value = false
})
</script>

<style lang="scss" scoped>
.textarea {
  width: 100%;
  position: relative;
}
::v-deep(.content textarea) {
  width: 100%;
  min-height: 150px !important;
  background-image: url(../../assets/layouts/comment-bg.png);
  background-size: 70px auto;
  background-repeat: no-repeat;
  background-position: bottom right;
}
.emoji {
  position: absolute;
  bottom: 0;
}
.emojiPicker {
  position: absolute;
  bottom: -67px;
  right: 0;
  z-index: 100;
}
</style>
