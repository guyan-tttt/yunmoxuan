import hljs from "highlight.js/lib/core"
import javascript from "highlight.js/lib/languages/javascript"
hljs.registerLanguage("javascript", javascript)
import "highlight.js/styles/atom-one-dark.css"

export const highlight = {
  mounted: (el: any) => {
    console.log(el)

    const codes = el.querySelectorAll("code")
    codes.forEach((code: any) => {
      console.log(code, el, "sas")

      hljs.highlightBlock(code)
    })
    const pres = el.querySelectorAll("pre")
    pres.forEach((pre: any) => {
      hljs.highlightBlock(pre)
    })
  },
  updated: (el: any) => {
    const codes = el.querySelectorAll("code")
    codes.forEach((code: any) => {
      console.log(code, el, "sas")

      hljs.highlightBlock(code)
    })
    const pres = el.querySelectorAll("pre")
    pres.forEach((pre: any) => {
      hljs.highlightBlock(pre)
    })
  }
}
