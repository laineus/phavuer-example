<template>
  <Scene :name="name" :autoStart="true" @create="create" @update="update">
    <Text v-if="showText">aaaaa</Text>
    <Sprite texture="marker" />
  </Scene>
</template>

<script>
import { ref } from 'vue'
import Scene from '../phavuer/components/Scene'
import Text from '../phavuer/components/Text'
import Sprite from '../phavuer/components/Sprite'
export default {
  components: { Scene, Text, Sprite },
  props: {
    name: { type: String, require: true }
  },
  setup (props) {
    const create = (scene) => {
      console.log('created', scene)
    }
    const update = () => {
    }
    const showText = ref(false)
    setInterval(() => {
      showText.value = !showText.value
    }, 5000)
    return {
      name: props.name,
      create,
      update,
      showText
    }
  }
}
</script>
