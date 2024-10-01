<script>
import { useSettingStore } from "@/store"
import { useSearchStore } from "@/store"


export default {
    onLaunch: function () {
        console.log("App Launch")
    },
    onShow: function () {
        const settingStore = useSettingStore()
        const searchStore = useSearchStore()
        // 判断是否需要保存搜索历史记录
        if(!settingStore.setting.history) {
            searchStore.clearHistory()
        }
        console.log("dadad")
    },
    onHide: function () {
        console.log("App Hide")
    },
    onUnload: function() {

    },
    onBackPress: function() {

    }
}
</script>

<style>
/*每个页面公共css */
@import './styles/iconfont.css';

page {
    background-color: #F8F8F8;
}
</style>
