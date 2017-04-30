<template>
  <a v-on:click="click">{{title}}</a>
</template>

<script>
  export default {
    name: 'AccountLink',
    methods: {
      click () {
        if (this.currentUser.signedIn) {
          this.$sessionService.signOut(this.$store)
        } else {
          this.$router.push({name: 'session'})
        }
        console.log('click')
      }
    },
    computed: {
      currentUser () {
        return this.$store.state.currentUser
      },
      title () {
        if (this.currentUser.signedIn) {
          return `logout ${this.currentUser.email}`
        } else {
          return 'login'
        }
      }
    },
    mounted () {
      // look for pending session on first mount
      if (!this.$store.state.pendingSessionCheck) {
        this.$sessionService.loadSignedInUser(this.$store)
      }
    }
  }
</script>
