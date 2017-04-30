<template>
  <div class="container main">

    <NavBar/>

    <div class="logo-wrapper">
      <Logo />
    </div>

    <div>
      <h1>Login</h1>
      <p>
        <input v-model="email" placeholder="email">
      </p>
      <p>
        <input type="password" v-model="password">
      </p>
      <button @click="signIn">Login</button>

      <div v-if="this.$store.state.currentUser.signedIn">
        <h2>logged in</h2>
        <p>id: {{$store.state.currentUser.id}}</p>
        <p>email: {{$store.state.currentUser.email}}</p>
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
    methods: {
      signIn: function () {
        let promise = this.$sessionService.signIn(this.$store, this.email, this.password)
        promise.then((data) => console.log(data))
      },
      signOut: function () {
        let promise = this.$sessionService.signOut(this.$store)
        promise.then((data) => console.log(data))
      }
    }
  }
</script>
