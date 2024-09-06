import { useIntersectionObserver } from "@vueuse/core"

export const cardShow = {
  scaleLoad: {
    mounted(el: any, binding: any) {
      el.style.width = "0px"
      el.style.height = "0px"

      el.style.transition = "all 0.5s"
      const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
        if (isIntersecting) {
          el.style.width = "210px"
          el.style.height = "110px"
          stop()
        }
      })
    }
  },
  scaleLoad2: {
    mounted(el: any, binding: any) {
      el.style.transform = "scale(0)"

      el.style.transition = "all 0.5s"
      const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
        if (isIntersecting) {
          el.style.transform = "scale(1)"
          stop()
        }
      })
    }
  }
}
