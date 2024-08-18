export const cursor = {
  default: {
    mounted: (el: HTMLElement) => {
      el.style.cursor = "var(--cursor-default) 50 50 , default"
    }
  },
  pointer: {
    mounted: (el: HTMLElement) => {
      el.style.cursor = "var(--cursor-pointer) 50 50 ,pointer"
    }
  },
  text: (el: HTMLElement) => {
    el.style.cursor = "var(--cursor-text) 50 50 , text"
  }
}
