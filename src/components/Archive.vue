<template>
  <div class="archive">
    <h1>{{node.name}}</h1>
    <img v-bind:src="node.attachment_url" />
    <div v-html="node.content"></div>
    <div class="children">
      <div class="square" v-for="child in node.children">
        <div class="content" v-on:click="$router.push({ path: child.slug })">
          <div class="name">
            <router-link :to="{ path: child.slug }" style="display:block">
              <span>{{child.name}}</span>
            </router-link>
          </div>
          <div class="descendants" :id="child.id">-</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import CountUp from 'countup'

  export default {
    name: 'archive',
    props: ['node'],
    methods: {
      countUp: function (id, max) {
        let options = {
          useEasing: true,
          useGrouping: false,
          separator: '',
          decimal: '',
          prefix: '',
          suffix: ''
        };
        (new CountUp(String(id), 0, max, 0, 2.5, options)).start()
      }
    },
    mounted: function () {
      this.node.children.forEach((child) => this.countUp(child.id, child.descendant_count))
    }
  }
</script>


<style lang="scss">
.archive {
  .children {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    .square {
      border: 1px solid #fff;
      position: relative;
      height: 0;
      width: 33.33%;
      padding-bottom: 33.33%;
      .content {
        cursor: pointer;
        background: #000;
        position:  absolute;
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
          font-size:1.2em;
          a {
            color: #fff;
          }

        }
        .descendants {
          margin:5px;
          color: #aaa;
          font-size: smaller;
          font-weight: 400;
        }
        &:hover {
          background: #fff;
          .name a{
            color: #000;
          }
        }
      }
    }
  }
}
</style>