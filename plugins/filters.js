import Vue from 'vue'

Vue.filter('date', function (value) {
  return (value === null || value === undefined || value === '') ? '' : (new Date(value)).toLocaleDateString()
})
