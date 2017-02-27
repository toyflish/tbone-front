<template>
  <div class="goals">
    <h1>Goals</h1>
    <ul>
      <li v-for="goal in goals()">{{goal.name}}</li>
    </ul>
    <input v-model="newGoal">
    <button @click="addGoal">Add</button>
  </div>
</template>

<script>
  export default {
    name: 'goals',
    data: function () {
      return {
        newGoal: 'add me'
      }
    },
    methods: {
      goals: function () {
        return this.$root.goals
      },
      addGoal: function () {
        this.$root.addGoal(this.newGoal)
      }
    }
  }
</script>