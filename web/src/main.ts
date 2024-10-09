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
import "@/styles/index.scss"
// 代码高亮
// import hljs from "highlight.js/lib/core"
// import javascript from "highlight.js/lib/languages/javascript"
import hljsVuePlugin from "@highlightjs/vue-plugin"

// 瀑布流组件
import V3waterfall from "v3-waterfall"
import "v3-waterfall/dist/style.css"
// 表情插件
import Vue3EmojiPicker from "vue3-emoji-picker"
import "vue3-emoji-picker/css"
// Then register the languages you need
import Textarea from "@/components/Textarea/index.vue"
import vue3SeamlessScroll from "vue3-seamless-scroll"
// hljs.registerLanguage("javascript", javascript)
// 导入websocket
import "@/utils/websokcet"

// 导入自定义指令
import initDirective from "@/directive/index"

import VueMarkdownEditor from "@kangc/v-md-editor"
import "@kangc/v-md-editor/lib/style/base-editor.css"
import vuepressTheme from "@kangc/v-md-editor/lib/theme/vuepress.js"
import "@kangc/v-md-editor/lib/theme/style/vuepress.css"

import Prism from "prismjs"

VueMarkdownEditor.use(vuepressTheme, {
  Prism
})

const app = createApp(App)

/** 加载插件 */
loadPlugins(app)
/** 加载全局 SVG */
loadSvg(app)
/** 加载自定义指令 */
initDirective(app)

app.use(store).use(router).use(hljsVuePlugin).use(V3waterfall).use(vue3SeamlessScroll, { name: "scroll" })
app.component("Vue3EmojiPicker", Vue3EmojiPicker)
app.component("my-textarea", Textarea)
app.use(VueMarkdownEditor)
router.isReady().then(() => {
  app.mount("#app")
})
