import axios from 'axios'

class NodeService {
  nodeData = {}

  fetch (id) {
    console.log(`NodeService.fetch ${id}`)
    let thisService = this
    return axios.get(`http://toyflish.dev/api/nodes/${id}.json?level_down=2&full_crop=600x`)
    .then(function (response) {
      console.log(response.data)
      thisService.nodeData = response.data
      return thisService.nodeData
    })
  }

  fetchBySlug (slug) {
    console.log(`NodeService.fetchBySlug ${slug}`)
    let thisService = this
    return axios.get(`http://toyflish.dev/api/nodes/by_slug.json?slug=${slug}&level_down=2&full_crop=600x`)
    .then(function (response) {
      console.log(response.data)
      thisService.nodeData = response.data
      return thisService.nodeData
    })
  }
}

export default NodeService
