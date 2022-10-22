<script setup lang="ts">
defineProps({
  overallProgress: {
    type: Number,
    required: true
  },
})

const emits = defineEmits<{ (event: 'registerClick'): void }>()
const onRegisterClick = () => emits("registerClick")
</script>

<template>
  <div class="item">
    <div class="text">進捗率</div>
    <div class="progress-bar">
      <progress max="100" :value="overallProgress"></progress>
    </div>
    <div class="progress">@</div>
    <div class="weight">@</div>
    <div class="proration">{{overallProgress}} %</div>
    <div class="delete">
      <button @click="onRegisterClick">保存</button>
    </div>
    <div class="sorting">@</div>
    <div class="sorting">@</div>
  </div>
</template>

<style lang="scss" scoped>

</style>
