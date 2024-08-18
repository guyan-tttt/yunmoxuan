//鼠标移动特效

const colors = ["#F8F8FF", "#FFFFFF", "#ADD8E6", "#7BF2EA", "#C0C0C0", "#E0E0E0"]
// const characters = ["✺", "❆", "❄", "❄", "❄", "✺", "❉", "✹", "✵", "❁", "❆"]
const characters = ["❆", "❄", "❄", "❄", "❉", "❆"]
const elementGroup = []
//定义元素类
class Element {
  //构造函数
  constructor() {
    const num = Math.floor(Math.random() * characters.length)
    this.character = characters[num]
    this.lifeSpan = 120
    this.initialStyles = {
      position: "fixed",
      top: "0",
      display: "block",
      pointerEvents: "none",
      "z-index": "10000000",
      fontSize: "25px",
      "will-change": "transform",
      color: "#000000"
    }
    //初始化
    this.init = function (x, y, color) {
      this.velocity = { x: (Math.random() < 0.5 ? -1 : 1) * (Math.random() / 2), y: 1 }
      this.position = { x: x - 10, y: y - 20 }
      this.initialStyles.color = color
      this.element = document.createElement("span")
      this.element.innerHTML = this.character
      ApplyStyle(this.element, this.initialStyles)
      this.update()
      document.body.appendChild(this.element)
    }
    //更新
    this.update = function () {
      //移动，缩放
      this.position.x += this.velocity.x
      this.position.y += this.velocity.y
      this.lifeSpan--
      this.element.style.transform = "translate3d(" + this.position.x + "px," + this.position.y + "px,0) scale(" + this.lifeSpan / 120 + ")"
    }
    //销毁
    this.die = function () {
      this.element.parentNode.removeChild(this.element)
    }
  }
}

//循环
setInterval(function () {
  Rander()
}, 1000 / 60)
//添加事件监听器
export function mouseTrail() {
  //当前事件对象会作为第一个参数传入函数
  document.addEventListener("mousemove", onMouseMove)
  // document.addEventListener("touchmove", Touch)
  // document.addEventListener("touchstart", Touch)
}
//逐个渲染
function Rander() {
  for (let i = 0; i < elementGroup.length; i++) {
    elementGroup[i].update()
    if (elementGroup[i].lifeSpan < 0) {
      elementGroup[i].die()
      elementGroup.splice(i, 1)
    }
  }
}
//鼠标移动事件函数
function onMouseMove(t) {
  const num = Math.floor(Math.random() * colors.length)
  CreateElement(t.clientX, t.clientY, colors[num])
}
//添加元素
function CreateElement(x, y, color) {
  const e = new Element()
  e.init(x, y, color)
  elementGroup.push(e)
}
//调整元素属性
function ApplyStyle(element, style) {
  for (const i in style) {
    element.style[i] = style[i]
  }
}
//触摸事件函数
//   function Touch(t) {
//     if (t.touches.length > 0) {
//       for (let i = 0; i < t.touches.length; i++) {
//         const num = Math.floor(Math.random() * r.length)
//         s(t.touches[i].clientX, t.touches[i].clientY, r[num])
//       }
//     }
//   }

// 移除事件监听器

export function removeMouseTrail() {
  document.removeEventListener("mousemove", onMouseMove)
}
