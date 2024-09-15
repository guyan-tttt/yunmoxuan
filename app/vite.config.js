import { defineConfig } from "vite"
import uni from "@dcloudio/vite-plugin-uni"
import path from "path"
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        uni(),
    ],
    // 路径配置
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        // 其他别名配置
        },
    },
})
