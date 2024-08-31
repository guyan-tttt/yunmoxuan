<template>
  <div>
    <p>{{ content }} <span class="line">|</span></p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"

// 诗词数组
const textData = [
  "折得一枝杨柳，归来插向谁家？",
  "衣带渐宽终不悔，为伊消得人憔悴。",
  "泪眼问花花不语，乱红飞过秋千去。",
  "一壶酒，一竿身，快活如侬有几人。",
  "风不定，人初静，明日落红应满径。",
  "从别後，忆相逢，几回魂梦与君同。",
  "滴不尽相思血泪抛红豆，开不完春柳春花满画楼。",
  "若问闲情都几许？一川烟草，满城风絮，梅子黄时雨。"
]

const content = ref("")

// 逐个添加文字
const addText = () => {
  //   随机抽取一句诗
  const arr = textData[Math.floor(Math.random() * textData.length)].split("")
  let i = 0
  const timer = setInterval(() => {
    if (i === arr.length) {
      clearInterval(timer)
      return setTimeout(() => {
        delText()
      }, 2000)
    }
    content.value += arr[i]
    i++
  }, 200)
}

// 逐个删减文字
const delText = () => {
  const timer = setInterval(() => {
    if (content.value === "") {
      // 删除完毕后，重新添加文字
      addText()
      clearInterval(timer)
      return
    }
    content.value = content.value.slice(0, -1)
  }, 200)
}

onMounted(() => {
  setTimeout(() => {
    addText()
  }, 1000)
})
</script>

<style scoped lang="scss">
p {
  font-size: 1.5em;
  margin-top: 15px;
  font-family: "STKaiti";
  position: relative;
  display: flex;
  align-items: center;
  text-align: center;
  .line {
    padding: 0;
    margin: 0;
    height: 43px;
    animation: cursor 400ms steps(44) infinite normal;
  }
  @keyframes cursor {
    0% {
      color: #fff;
    }

    100% {
      color: transparent;
    }
  }
}
</style>
