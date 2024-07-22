// core
import { createApp } from "vue"
import App from "@/App.vue"
import store from "@/store"
import router from "@/router"
import "@/router/permission"
// load
import { loadSvg } from "@/icons"
import { loadPlugins } from "@/plugins"
// import { loadDirectives } from "@/directives"
// css
import "highlight.js/styles/atom-one-dark.css"
import "uno.css"
import "normalize.css"
import "element-plus/dist/index.css"
import "element-plus/theme-chalk/dark/css-vars.css"
import "vxe-table/lib/style.css"
import "vxe-table-plugin-element/dist/style.css"
import "@/styles/index.scss"
import hljs from "highlight.js/lib/core"
import javascript from "highlight.js/lib/languages/javascript"
import hljsVuePlugin from "@highlightjs/vue-plugin"
import "animate.css"

import V3waterfall from "v3-waterfall"
import "v3-waterfall/dist/style.css"
import Vue3EmojiPicker from "vue3-emoji-picker"
import "vue3-emoji-picker/css"
// Then register the languages you need

hljs.registerLanguage("javascript", javascript)

const app = createApp(App)

/** 加载插件 */
loadPlugins(app)
/** 加载全局 SVG */
loadSvg(app)
/** 加载自定义指令 */

app.use(store).use(router).use(hljsVuePlugin).use(V3waterfall)
app.component("Vue3EmojiPicker", Vue3EmojiPicker)
router.isReady().then(() => {
  app.mount("#app")
})
