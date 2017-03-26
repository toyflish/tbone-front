import axios from 'axios'

const apiUrl = process.env.API_URL

class NodeService {
  nodeData = {}

  fetch (id) {
    console.log(`NodeService.fetch ${id}`)
    let thisService = this
    return axios.get(`${apiUrl}/api/nodes/${id}.json?level_down=2&full_crop=600x`)
    .then(function (response) {
      return thisService.nodify(response.data)
    })
  }

  fetchBySlug (slug) {
    console.log(`NodeService.fetchBySlug ${slug}`)
    let thisService = this
    let params = {
      slug: slug,
      level_down: 2,
      full_crop: '600x',
      grand_children_limit: 5,
      linked_nodes_level_down: 1
    }
    return axios.get(`${apiUrl}/api/nodes/by_slug.json`, { params })
    .then(function (response) {
      return thisService.nodify(response.data)
    })
  }

  // create Node Object with Node functionality from json
  nodify (data) {
    return Object.assign(data, this.nodeFactory())
  }

  nodeFactory () {
    let thisService = this
    return {
      breadcrumb () {
        let bcShifted = this.parentsArray()
        bcShifted.shift()
        return bcShifted
      },
      parentsArray () {
        let parents = []
        if (this.parent !== null && typeof this.parent === 'object') {
          parents = thisService.nodify(this.parent).parentsArray()
        }
        parents.unshift(this)
        return parents
      }

    }
  }
}

export default NodeService
