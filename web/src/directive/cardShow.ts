import { useIntersectionObserver } from "@vueuse/core"

export const cardShow = {
  scaleLoad: {
    mounted(el, binding) {
      el.style.transform = "scale(0)"
      el.style.transition = "transform 0.5s"
      const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
        if (isIntersecting) {
          el.style.transform = "scale(1)"
          //   stop()
        }
      })
    }
  }
}
