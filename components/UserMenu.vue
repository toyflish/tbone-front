<template>
  <ul>
    <li v-if="!this.currentUser.signedIn">
      <a v-on:click="signIn">login</a>
    </li>
    <li v-if="this.currentUser.signedIn">
      <a v-on:click="signOut">logout</a>
    </li>
  </ul>
</template>

<script>
  export default {
    name: 'UserMenu',
    methods: {
      signIn () {
        this.$router.push({name: 'session'})
        this.$root.$emit('closeMainMenu')
      },
      signOut () {
        this.$sessionService.signOut(this.$store).then(() => {
          this.$router.push({name: 'session'})
          this.$root.$emit('closeMainMenu')
        })
      }
    },
    computed: {
      currentUser () {
        return this.$store.state.currentUser
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

<style>
  a { cursor: pointer; }
</style>
