<template>
  <section class="children">
    <article
      v-for="child in children"
      :key="child.id"
      :class="child.view.toLowerCase()"
    >
      <nuxt-link
        v-if="child.attachment_url"
        :to="{ path: child.href }"
        style="display:block"
      >
        <VImg
          :src="child.attachment_url"
          :placeholder="child.preview_url"
          :alt="child.name"
          :classes="{
            root: 'w-full mx-auto',
            placeholder: 'w-full',
            img: 'w-full'
          }"
          class="w-full mx-auto"
        />
      </nuxt-link>
      <div class="container-text px-4">
        <h2 class="subtitled">
          <nuxt-link :to="{ path: child.href }">{{ child.name }}</nuxt-link>
        </h2>
        <div class="captured-at">{{ child.captured_at | date }}</div>
        <span class="subtitle">{{ child.teaser }}</span>
      </div>
      <ThumbGrid
        v-if="child.children !== undefined"
        :nodes="child.children.slice(0, 3)"
        @click="() => routerPush(child)"
      />
    </article>
  </section>
</template>

<script>
import VImg from '@/components/VImg'
import ThumbGrid from '@/components/ThumbGrid'

export default {
  name: 'ChildList',
  components: {
    ThumbGrid,
    VImg
  },
  props: { children: { type: Array, default: null } },
  methods: {
    routerPush(node) {
      this.$router.push({ path: node.slug })
    }
  }
}
</script>

<style lang="scss">
.children {
  article {
    margin-top: 40px;
    .captured-at {
      font-family: Georgia, serif;
      font-style: italic;
      font-size: smaller;
      color: #aaa;
    }
    .grand-children {
      margin-bottom: 3px;
      display: flex;
      flex-wrap: wrap;
      .grand-child {
        width: 24.7%;
        margin-right: 0.4%;
        * {
          display: block;
        }
      }
      .grand-child:nth-child(4) {
        margin-right: 0;
      }
    }
    &.quote {
      h2 {
        font-family: Georgia, serif;
        font-style: italic;
        quotes: '“' '”' '‘' '’';
        &:before {
          color: #bbb;
          font-family: Georgia, serif;
          content: open-quote;
          margin-right: 0.4rem;
        }
        &:after {
          color: #bbb;
          content: close-quote;
          margin-left: 0.4rem;
        }
      }
    }
  }
}
</style>
