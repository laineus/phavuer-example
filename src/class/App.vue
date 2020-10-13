<template>
  <div>
    <TitleScene />
    <MainScene />
  </div>
</template>

<script>
import { inject } from 'vue'
import TitleScene from './TitleScene'
import MainScene from './MainScene'
export default {
  components: { TitleScene, MainScene },
  setup () {
    return {
    }
  }
}
</script>
