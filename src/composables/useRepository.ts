import { proxyRefs, reactive } from 'vue'
import type { Entity } from './useEntity'

export const useRepository = <T extends Entity>() => {
  const list = reactive([]) as Array<T>

  const remove = (id: symbol) => {
    const index = list.findIndex(value => value.id === id)
    list.splice(index, 1)
  }

  const add = (instance: T) => {
    list.push(instance)
    instance.on('destroy', () => remove(instance.id))
  }

  const clear = () => {
    list.splice(0)
  }

  const find = (id: symbol) => list.find(value => value.id === id)

  return proxyRefs({
    list,
    add,
    remove,
    clear,
    find
  })
}

export type Repository<T extends Entity> = ReturnType<typeof useRepository<T>>
