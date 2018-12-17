<template>
  <div class="hello">
        这是购物车页面
        {{$route.query.cartId}}
  </div>
</template>

<script>
export default {
  name: 'cart',
  data () {
    return {
      msg: ''
    }
  }
}
</script>

