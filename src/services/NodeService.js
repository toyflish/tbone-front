import axios from 'axios'

const apiUrl = process.env.API_URL

class NodeService {
  nodeData = {}

  fetch (id) {
    console.log(`NodeService.fetch ${id}`)
    let thisService = this
    return axios.get(`${apiUrl}/api/nodes/${id}.json?level_down=2&full_crop=600x`)
    .then(function (response) {
      console.log(response.data)
      thisService.nodeData = response.data
      return thisService.nodeData
    })
  }

  fetchBySlug (slug) {
    console.log(`NodeService.fetchBySlug ${slug}`)
    let thisService = this
    return axios.get(`${apiUrl}/api/nodes/by_slug.json?slug=${slug}&level_down=2&full_crop=600x&grand_children_limit=5`)
    .then(function (response) {
      console.log(response.data)
      thisService.nodeData = response.data
      return thisService.nodeData
    })
  }
}

export default NodeService
