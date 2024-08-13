import { useLogMessageStore } from "@/store/modules/logmessage"

const ws = new WebSocket("ws://localhost:3001")
ws.onopen = () => {}

ws.onmessage = function (event) {
  //   解析数据
  const data = JSON.parse(event.data)
  // 判断数据类型
  if (data.type === "newLog") {
    // 触发组件中日志数据更新的方法
    useLogMessageStore().getLogData()
  } else if (data.type === "newMessage") {
    // 触发组件中消息数据更新的方法
    useLogMessageStore().getMessage()
  }
}

ws.onclose = function () {
  console.log("Disconnected from the WebSocket server")
}

ws.onerror = function (error) {
  console.error("WebSocket error: " + error)
}
