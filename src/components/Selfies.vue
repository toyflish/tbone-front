<template>
  <div class="selfies">
    <h1>Selfie</h1>
    <div class="selfie" v-for="selfie in selfies">
      <div>{{selfie.name}}</div>
      <img v-bind:src="selfie.attachment_url" />
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'selfies',
    data: function () {
      return {
        selfies: []
      }
    },
    methods: {
      fetchSelfies: function () {
        let thisVue = this
        axios.get('http://toyflish.dev/api/nodes/13940.json?level_down=1&full_crop=600x')
        .then(function (response) {
          console.log(response.data)
          thisVue.selfies = response.data.children
        })
      }
    },
    mounted: function () {
      this.fetchSelfies()
    }
  }
</script>

<style scoped>
.selfies {
  width: 100%;

  .selfie {
    width: 100%;

    img {
      width: 100%;
    }
  }
}
</style>
