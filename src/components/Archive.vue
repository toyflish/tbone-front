<template>
  <div class="archive">
    <h1>{{node.name}}</h1>
    <img v-bind:src="node.attachment_url" />
    <div v-html="node.content"></div>
    <div class="children">
      <div class="child" v-for="child in node.children">
        <router-link :to="{ path: child.slug }" style="display:block">
          <img v-if="child.attachment_url" v-bind:src="child.attachment_url" v-bind:alt="child.name"/>
          <span v-else class="primer">{{child.name}}</span>
        </router-link>
        <div class="grand-children">
          <div class="grand-child" v-for="grandChild in child.children.slice(0,4)">
            <router-link :to="{ path: grandChild.slug }" style="display:block">
              <img v-if="grandChild.preview_url" v-bind:src="grandChild.preview_url" v-bind:alt="grandChild.name"/>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'archive',
    props: ['node']
  }
</script>


<style lang="scss">
.archive {
  .children {
    .child {
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