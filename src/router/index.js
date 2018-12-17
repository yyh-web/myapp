import Vue from 'vue';
import Router from 'vue-router';
import goodList from '@/views/GoodList';
import image from '@/views/Image';
import title from '@/views/Title';
import detail from '@/views/Detail';
import cart from '@/views/Cart';
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/', // 默认进入商品列表页
      name: 'goodList',
	  component: goodList,
      /*components: {
        default:goodList,
        Title: title,
        Image: image
      }*/
      children:[{
        path:'title',
        name:"titleName",
        component: title
      },
       {
        path: 'image', // 商品图片页
        name: 'imageName',
        component: image
      }
      ]
    },
    {
      path: '/detail', // 商品图片页
      name: 'detail',
      component: detail
    },
    {
      path: '/cart', // 商品购物车页
      name: 'cart',
      component: cart
    }

  ]
})
