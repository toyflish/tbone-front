<template>
  <div class="container py-16">
    <Avatar :src="node.attachment_url" class="w-48 h-48 mx-auto mb-8" />
    <div class="px-4 container-text">
      <h1>{{ node.name }}</h1>
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div v-html="node.content"></div>
    </div>
    <ChildList :children="node.linked_nodes" />
    <MoreBtn :label="moreBtnLabel" :loading="loading" @hit="loadMore" />
  </div>
</template>

<script>
import MoreBtn from './MoreBtn'
import ChildList from './ChildList'
import Avatar from '@/components/Avatar'
export default {
  name: 'Home',
  components: {
    ChildList,
    MoreBtn,
    Avatar
  },
  props: { node: { type: Object, default: null } },
  data() {
    return {
      loading: false,
      linkedNodeOffest: 0,
      linkedNodeslimit: 10
    }
  },
  computed: {
    moreBtnLabel() {
      return this.loading ? '... Loading ...' : 'Show More'
    }
  },
  methods: {
    loadMore() {
      const thisVue = this
      // this.linkedNodeOffest += 10
      this.linkedNodeslimit += 10
      // prevent double klicks
      if (!this.loading) {
        this.loading = true
        this.$store
          .dispatch('fetchRequestNode', {
            slug: '',
            linked_nodes_level_down: 1,
            linked_nodes_limit: this.linkedNodeslimit
          })
          .then(() => {
            thisVue.loading = false
          })
      }
    }
  }
}
</script>
