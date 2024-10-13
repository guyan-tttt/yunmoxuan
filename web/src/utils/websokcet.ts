import { useLogMessageStore } from "@/store/modules/logmessage"
import { ElNotification } from "element-plus"
const ws = new WebSocket("ws://localhost:3001")
ws.onopen = () => {}

ws.onmessage = function (event) {
  //   解析数据
  const data = JSON.parse(event.data)
  // 判断数据类型
  if (data.type === "newLog") {
    // 触发组件中日志数据更新的方法
    useLogMessageStore().getLogData()
    // 弹出提示框提示有新通知
    ElNotification.success({
      title: "有新通知",
      message: "已发布新通知，请及时查看！",
      showClose: true
    })
  } else if (data.type === "newMessage") {
    // 触发组件中消息数据更新的方法
    // 弹出提示框提示有新通知
    ElNotification.success({
      title: "有新消息",
      message: "有新的消息了，请及时查看！",
      showClose: true
    })
  }
}

ws.onclose = function () {
  console.log("Disconnected from the WebSocket server")
}

ws.onerror = function (error) {
  console.error("WebSocket error: " + error)
}

// location / {
//   root   C:\Users\Administrator\Desktop\jeek-space\dist;
//   index  index.html index.htm;
//   try_files $uri $uri/ /index.html; # 解决刷新404
// }
// location /api
// {
// proxy_pass https://118.31.237.92:3000;
// }
// location /nginx_status {
// allow 127.0.0.1;
//   deny all;
//   stub_status on;
//   access_log  off;
// }
