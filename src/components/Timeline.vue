<template>
  <div class="timeline">
    <h1>{{node.name}}</h1>
    <img v-bind:src="node.attachment_url" />
    <div v-html="node.content"></div>
    <section class="children">
      <article v-for="child in node.linked_nodes">
        <router-link :to="{ path: child.slug }" style="display:block">
          <img v-if="child.attachment_url" v-bind:src="child.attachment_url" v-bind:alt="child.name"/>
        </router-link>
        <div class="container-text">
          <h2 class="subtitled"><router-link :to="{ path: child.slug }">{{child.name}}</router-link></h2>
          <span class="subtitle">{{child.teaser}}</span>
          <span class="captured-at">{{child.captured_at | date}}</span>
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
  </div>
</template>

<script>
  export default {
    name: 'Timeline',
    props: ['node']
  }
</script>


<style lang="scss">
.timeline {
  .children {
    article {
      margin-top: 40px;
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
    }
  }
}
</style>