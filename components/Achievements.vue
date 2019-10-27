<template>
  <div class="achievements">
    <h1>Achievments</h1>
    <ul>
      <li v-for="achievement in goals" :key="achievement">
        {{ achievement.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Achievements',
  // eslint-disable-next-line vue/require-prop-types
  props: ['goals']
}
</script>
