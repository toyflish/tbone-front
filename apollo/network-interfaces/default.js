import { createNetworkInterface } from 'apollo-client'

export default (ctx) => {
  const networkInterface = createNetworkInterface({
    // uri: 'https://api.graph.cool/simple/v1/cj1dqiyvqqnmj0113yuqamkuu'
    uri: 'http://toyflish.dev/graphql'
  })
  // here you can place your middleware. ctx has the context forwarded from Nuxt

  // you can return the networkInterface directly or return an object with additional
  // apollo-client options
  // return networkInterface

  // alternative return a object with constructor options of apollo-client
  return {
    networkInterface,
    dataIdFromObject: o => o.id
  }
}
