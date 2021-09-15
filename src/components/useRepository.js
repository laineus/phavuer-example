import { ref, onBeforeUpdate } from 'vue'
export default () => {
  const seeds = ref([])
  const list = ref([])
  const add = data => seeds.value.push({ id: Symbol('id'), ...data })
  const remove = seed => seeds.value.splice(seeds.value.indexOf(seed), 1)
  const register = instance => list.value.push(instance)
  const clear = () => {
    seeds.value.splice(0)
    list.value.splice(0)
  }
  onBeforeUpdate(() => list.value.splice(0))
  return { seeds, list, add, remove, register, clear }
}
