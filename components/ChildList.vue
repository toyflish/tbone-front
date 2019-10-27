<template>
  <section class="children">
    <article
      v-for="child in children"
      :key="child.id"
      :class="child.view.toLowerCase()"
    >
      <router-link
        v-if="child.attachment_url"
        :to="{ path: child.href }"
        style="display:block"
      >
        <img
          :src="child.attachment_url"
          :alt="child.name"
          class="w-full mx-auto"
        />
      </router-link>
      <div class="container-text px-4">
        <h2 class="subtitled">
          <router-link :to="{ path: child.href }">{{ child.name }}</router-link>
        </h2>
        <div class="captured-at">{{ child.captured_at | date }}</div>
        <span class="subtitle">{{ child.teaser }}</span>
      </div>
      <div v-if="child.children !== undefined" class="grand-children">
        <div
          v-for="grandChild in child.children.slice(0, 4)"
          :key="grandChild.id"
          class="grand-child"
        >
          <router-link
            :to="{ path: `${child.href}#${grandChild.slug}` }"
            style="display:block"
          >
            <img
              v-if="grandChild.preview_url"
              :src="grandChild.preview_url"
              :alt="grandChild.name"
            />
          </router-link>
        </div>
      </div>
    </article>
  </section>
</template>

<script>
export default {
  name: 'ChildList',
  props: { children: { type: Array, default: null } }
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
