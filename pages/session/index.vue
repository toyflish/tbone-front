<template>
  <div class="container main">

    <NavBar/>

    <div class="logo-wrapper">
      <Logo />
    </div>

    <div v-if="!currentUser.signedIn">
      <h1>Login</h1>
      <p>You are currently not logged in!</p>
      <form v-on:submit.prevent="signIn">
        <p>
          <input v-model="email" placeholder="email">
        </p>
        <p>
          <input type="password" v-model="password">
        </p>
        <button type="submit">Login</button>
      </form>
    </div>
    <div v-else >
      <div v-if="this.$store.state.currentUser.signedIn">
        <h2>logged in as <br />{{currentUser.email}}</h2>
        <p>id: {{currentUser.id}}</p>
        <p>email: {{currentUser.email}}</p>
        <button @click="signOut">SignOut</button>
      </div>
      <div v-else>
        <h2>logged out!</h2>
      </div>
    </div>


  </div>
</template>

<script>
  import NavBar from '../../components/NavBar'
  import Logo from '../../components/Logo'

  import NodeService from '../../services/NodeService'

  export default {
    name: 'Session',
    components: {
      NavBar,
      Logo
    },
    data: function () {
      return {
        email: 'mail@kairautenberg.de',
        password: ''
      }
    },
    computed: {
      currentUser () {
        return this.$store.state.currentUser
      }
    },
    methods: {
      signIn: function () {
        let promise = this.$sessionService.signIn(this.$store, this.email, this.password)
        promise.then((data) => console.log(data))
      },
      signOut: function () {
        let promise = this.$sessionService.signOut(this.$store)
        promise.then((data) => console.log(data))
      }
    },
    fetch: function ({ store, params }) {
      let ns = new NodeService()
      return ns.fetchMenu().then(function (items) {
        store.commit('setMenuItems', items)
      })
    }
  }
</script>
