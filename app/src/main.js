import {
    createSSRApp
} from "vue"
import App from "./App.vue"
import pinia from "./store"
import hljs from "highlight.js"
import "highlight.js/styles/atom-one-dark.css"
export function createApp() {
    const app = createSSRApp(App)
    app.use(pinia)

    return {
        app,
    }
}
