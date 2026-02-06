interface Options {
  selector?: string
  enter?: number
  leave?: number
  once?: boolean
  duration?: number
}

export function useScrollMotion(containerRef: Ref<HTMLElement | null>, options: Options = {}) {
  const { selector = '.fade-up', enter = 0.3, leave = 0.05, once = false } = options

  const { y } = useWindowScroll()

  // 🌊 Scroll Direction
  let scrollDir: 'down' | 'up' = 'down'
  let lastY = y.value

  watch(y, (newY) => {
    scrollDir = newY > lastY ? 'down' : 'up'
    lastY = newY
  })

  const stateMap = new WeakMap<Element, boolean>()
  let observer: IntersectionObserver

  onMounted(() => {
    const elements = containerRef.value?.querySelectorAll(selector)
    if (!elements?.length) return

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement
          const ratio = entry.intersectionRatio
          const isShown = stateMap.get(el) ?? false

          // 📥 ENTER
          if (!isShown && ratio >= enter) {
            // el.classList.remove('from-top', 'from-bottom')
            stateMap.set(el, true)

            if (scrollDir === 'down') {
              el.classList.add('from-bottom')
            } else {
              el.classList.add('from-top')
            }

            requestAnimationFrame(() => {
              el.classList.add('show')
              el.classList.remove('from-top', 'from-bottom')
            })

            if (once) observer.unobserve(el)
          }

          // 📤 LEAVE
          if (!once && isShown && ratio <= leave) {
            stateMap.set(el, false)
            el.classList.remove('show')
          }
        })
      },
      {
        threshold: [0, leave, enter, 1]
      }
    )

    elements.forEach((el) => observer.observe(el))
  })

  onBeforeUnmount(() => observer?.disconnect())
}
