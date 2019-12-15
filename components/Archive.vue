<template>
  <div class="container archive">
    <h1>{{ node.name }}</h1>
    <img v-if="node.attachment_url" :src="node.attachment_url" />
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div v-html="node.content"></div>
    <div class="children">
      <div v-for="child in childrenReverse()" :key="child.id" class="square">
        <div @click="$router.push({ path: child.href })" class="content">
          <div class="name">
            <router-link :to="{ path: child.href }" style="display:block">
              <span>{{ child.name }}</span>
            </router-link>
          </div>
          <div :id="child.id" class="descendants">
            {{ child.descendant_count }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Archive',
  props: { node: { type: Object, default: null } },
  mounted() {
    // trigger countUp effect
    // if (this.node.children !== undefined) {
    //   this.node.children.forEach((child) =>
    //     this.countUp(child.id, child.descendant_count)
    //   )
    // }
  },
  methods: {
    countUp(id, max) {
      // const options = {
      //   useEasing: true,
      //   useGrouping: false,
      //   separator: '',
      //   decimal: '',
      //   prefix: '',
      //   suffix: ''
      // }
      // new CountUp(String(id), 0, max, 0, (max / 1000) * 0.5, options).start()
    },
    // child nodes in reverse order without mutation outside Vuex
    childrenReverse() {
      const arr = []
      if (this.node.children !== undefined) {
        this.node.children.forEach((child) => arr.unshift(child))
      }
      return arr
    }
  }
}
</script>

<style lang="scss">
.archive {
  .children {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    .square {
      border: 1px solid #fff;
      position: relative;
      height: 0;
      width: 33.33%;
      padding-bottom: 33.33%;
      .content {
        cursor: pointer;
        background: #000;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;

        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        .name {
          width: 70%;
          font-weight: bold;
          font-size: 1.2em;
          a {
            color: #fff;
          }
        }
        .descendants {
          margin: 5px;
          color: #aaa;
          font-size: smaller;
          font-weight: 400;
        }
        &:hover {
          background: #fff;
          .name a {
            color: #000;
          }
        }
      }
    }
  }
}
</style>
