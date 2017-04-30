import axios from 'axios'

axios.defaults.withCredentials = true

const apiUrl = process.env.API_URL

class SessionService {

  signIn ($store, email, password) {
    if (!$store.state.currentUser.signedIn) {
      return axios.post(`${apiUrl}/users/sign_in.json`,
        {user: {email: email, password: password}},
        {responseType: 'json'}
      )
      .then((response) => {
        console.log('response.data', response.data)
        $store.commit('currentUserSignedIn', response.data)
        return $store.state.currentUser
      })
      .catch(() => {
        console.log('error response')
        $store.commit('currentUserSignedOut')
        return $store.state.currentUser
      })
    } else {
      console.log('user allready signed in')
      return Promise.resolve($store.state.currentUser)
    }
  }

  loadSignedInUser ($store) {
    if (!$store.state.currentUser.signedIn && !$store.state.pendingSessionCheck) {
      $store.commit('setPendingSessionCheck', true)
      return axios.get(`${apiUrl}/api/users/current.json`,
        {responseType: 'json'}
      )
      .then((response) => {
        console.log('response.data', response.data)
        $store.commit('currentUserSignedIn', response.data)
        return $store.state.currentUser
      })
      .catch(() => {
        console.log('error response')
        $store.commit('currentUserSignedOut')
        return $store.state.currentUser
      })
    } else {
      console.log('user allready signed in')
      return Promise.resolve($store.state.currentUser)
    }
  }

  signOut ($store) {
    return axios.delete(`${apiUrl}/users/sign_out.json`, {responseType: 'json'})
      .then(() => $store.commit('currentUserSignedOut'))
  }
}

export default SessionService
