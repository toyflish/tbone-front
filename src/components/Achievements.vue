<template>
  <div class="achievements">
    <h1>Achievments</h1>
    <ul>
      <li v-for="achievement in goals">{{achievement.name}}</li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'achievements',
    props: ['goals']
  }
</script>