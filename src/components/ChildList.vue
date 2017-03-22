<template>
  <section class="children">
    <article v-for="child in children" v-bind:class="child.view.toLowerCase()">
      <router-link :to="{ path: child.slug }" style="display:block">
        <img v-if="child.attachment_url" v-bind:src="child.attachment_url" v-bind:alt="child.name"/>
      </router-link>
      <div class="container-text">
        <h2 class="subtitled"><router-link :to="{ path: child.slug }">{{child.name}}</router-link></h2>
        <div class="captured-at">{{child.captured_at | date}}</div>
        <span class="subtitle">{{child.teaser}}</span>
      </div>
      <div class="grand-children">
        <div class="grand-child" v-for="grandChild in child.children.slice(0,4)">
          <router-link :to="{ path: grandChild.slug }" style="display:block">
            <img v-if="grandChild.preview_url" v-bind:src="grandChild.preview_url" v-bind:alt="grandChild.name"/>
          </router-link>
        </div>
      </div>
    </article>
  </section>
</template>

<script>
  export default {
    name: 'ChildList',
    props: ['children']
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
        quotes: "“" "”" "‘" "’";
        &:before {
          color: #bbb;
          font-family: Georgia, serif;
          content: open-quote;
          margin-right: .4rem;
        }
        &:after {
          color: #bbb;
          content: close-quote;
          margin-left: .4rem;
        }
      }
    }
  }
}
</style>