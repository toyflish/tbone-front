<template>
  <div class="container py-16">
    <Avatar :src="node.attachment_url" :alt="node.name" class="w-48 h-48 mx-auto mb-8" />
    <div class="px-4 container-text">
      <h1>{{ node.name }}</h1>
    </div>
    <div class="p-4 container-text">
      <Highlight> Just for #Fans </Highlight>
      <Highlight> Selfie first? </Highlight>
      <Highlight>
        <nuxt-link :to="'/selfies'" class="text-black hover:text-white" style="text-shadow: none; color: #000"
          >Yes!</nuxt-link
        >
      </Highlight>
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div v-html="node.content"></div>
    </div>
    <ChildList :children="node.linked_nodes" />
    <MoreBtn :label="moreBtnLabel" :loading="loading" @hit="loadMore" />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Avatar from '@/components/Avatar'
import MoreBtn from '@/components/MoreBtn'
import ChildList from '@/components/ChildList'
import Highlight from '@/components/Highlight'
export default {
  name: 'Home',
  components: {
    ChildList,
    MoreBtn,
    Avatar,
    Highlight,
  },
  props: { node: { type: Object, default: null } },
  data() {
    return {
      loading: false,
      linkedNodeOffest: 0,
      linkedNodeslimit: 10,
    }
  },
  computed: {
    moreBtnLabel() {
      return this.loading ? '... Loading ...' : 'Show More'
    },
  },
  methods: {
    ...mapActions('node', ['fetchCurrent']),
    loadMore() {
      const thisVue = this
      // this.linkedNodeOffest += 10
      this.linkedNodeslimit += 10
      const linkedNodeslimit = this.linkedNodeslimit
      // prevent double klicks
      if (!this.loading) {
        this.loading = true

        this.fetchCurrent({
          slug: '',
          linked_nodes_level_down: 1,
          linked_nodes_limit: linkedNodeslimit,
        })
          .then(() => {
            // thisVue.loading = false
            thisVue.$gtm.push({
              event: 'nuxtRoute',
              routeName: `home (${linkedNodeslimit})`,
              pageType: 'PageView',
              pageUrl: '/',
              pageTitle: `home (${linkedNodeslimit})`,
            })
          })
          // eslint-disable-next-line no-console
          .catch((e) => console.log({ e }))
          .finally(() => (thisVue.loading = false))
      }
    },
  },
}
</script>
