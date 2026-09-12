import { proxyRefs, ref } from 'vue'

export const useEntity = () => {
  const id = Symbol('id')
  const event = new EventTarget()
  const x = ref(NaN)
  const y = ref(NaN)

  const entity = proxyRefs({
    id,
    event,
    x,
    y,
    on: (name: string, callback: EventListenerOrEventListenerObject) => {
      event.addEventListener(name, callback)
      return entity
    },
    off: (name: string, callback: EventListenerOrEventListenerObject) => {
      event.removeEventListener(name, callback)
      return entity
    },
    emit: (name: string, detail?: unknown) => {
      event.dispatchEvent(new CustomEvent(name, { detail }))
      return entity
    }
  })

  return entity
}

export type Entity = ReturnType<typeof useEntity>
