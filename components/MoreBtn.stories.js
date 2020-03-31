// import Vue from 'vue'
import { storiesOf } from '@storybook/vue'
import MoreBtn from './MoreBtn'
storiesOf('MoreBtn', module)
  .add('As Text Button', () => ({
    components: { MoreBtn },
    template: '<MoreBtn label="Some more" />'
  }))
  .add('Loading', () => ({
    components: { MoreBtn },
    template: '<MoreBtn label="Some more" :loading="true" />'
  }))
