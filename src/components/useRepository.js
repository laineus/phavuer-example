import { ref, onBeforeUpdate } from 'vue'
export default () => {
  const seeds = ref([])
  const list = ref([])
  const find = id => {
    return list.value.find(v => v.id === id)
  }
  const add = data => {
    seeds.value.push({ id: Symbol('id'), ...data })
  }
  const remove = id => {
    const i = seeds.value.findIndex(v => v.id === id)
    seeds.value.splice(i, 1)
  }
  const register = instance => {
    if (!instance) return
    list.value.push(instance)
  }
  const clear = () => {
    seeds.value.splice(0)
    list.value.splice(0)
  }
  onBeforeUpdate(() => list.value.splice(0))
  return {
    get seeds () { return seeds.value },
    get list () { return list.value },
    find,
    add,
    remove,
    register,
    clear
  }
}
