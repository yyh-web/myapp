<!--
    作者：闫耀辉
    时间：2018/5/18.
    描述：商品列表界面
-->
<template>
  <div class="goodList">
    <nav-header></nav-header>
    <div class="nav-breadcrumb-wrap">
      <div class="container">
        <nav class="nav-breadcrumb">
          <a href="/">Home</a>
          <span>Goods</span>
        </nav>
      </div>
    </div>
    <div class="accessory-result-page accessory-page">
      <div class="container">
        <div class="filter-nav">
          <span class="sortby">Sort by:</span>
          <a href="javascript:void(0)" @click="sortBtn(sortFlag ='default')" class="default cur">Default</a>
          <a href="javascript:void(0)" @click="sortBtn(sortFlag ='price')" class="price">Price
            <svg class="icon icon-arrow-short">
              <use xlink:href="#icon-arrow-short"></use>
            </svg>
          </a>
          <a href="javascript:void(0)" @click="showFilterPop"  class="filterby stopPop">Filter by</a>
        </div>
        <div class="accessory-result">
          <!-- filter -->
          <div :class="{'filterby-show':isShowPrice}" class="filter stopPop" id="filter">
            <dl class="filter-price">
              <dt>Price:</dt>
              <dd><a href="javascript:void(0)" v-bind:class="{'cur': priceChecked == 'all'}" v-on:click="doFilterAction('all')">All</a></dd>
              <dd v-for="(item,index) in priceFilter">
                <a href="javascript:void(0)" @click="doFilterAction(index)" :class="{'cur':priceChecked == index}">{{item.startPrice}} - {{item.endPrice}}</a>
              </dd>

            </dl>
          </div>

          <!-- search result accessories list -->
          <div class="accessory-list-wrap">
            <div class="accessory-list col-4">
              <ul>
                <li v-for="(item,index) in goodsList">
                  <div class="pic">
                    <a href="#"><img v-bind:src="'/static/'+item.goodImg" alt=""></a>
                  </div>
                  <div class="main">
                    <div class="name">{{item.goodName}}</div>
                    <div class="price">{{item.goodPrice}}</div>
                    <div class="btn-area">
                      <a href="javascript:;" class="btn btn--m">加入购物车</a>
                    </div>
                  </div>
                </li>
              </ul>
              <div v-infinite-scroll="loadMore"  infinite-scroll-immediate-check="false" class="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
                    {{loadTxt}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="md-overlay" v-show="isShowOverLay" @click="hideFilterPop"></div>
    <nav-footer></nav-footer>
  </div>
</template>
<style>

  .loadMore{
    display: block;
    text-align: center;
    height: 50px;
    line-height: 50px;
  }
</style>
<script>
  import NavHeader from "@/components/NavHeader";
  import NavFooter from "@/components/NavFooter";
  import base from "@/assets/css/base.css";
  import login from "@/assets/css/login.css";
  import product from "@/assets/css/product.css";
  import axios from "axios";

  export default {
    name: 'goodList',
    data () {
      return {
        loadTxt:"加载中...",
        curPage:1,
        pageSize:8,
        msg: '这是商品列表页',
        goodsList: [],
        priceFilter: [{
          startPrice: "0.00",
          endPrice: "500.00"
        },{
          startPrice: "500.00",
          endPrice: "1000.00"
        },{
          startPrice: "1000.00",
          endPrice: "1500.00"
        }],
        priceChecked : 'all',
        isShowPrice : false,
        isShowOverLay : false,
        sortFlag : 'default', // 排序方式
        isUpPrice : false,
        busy:false // 是否禁止滑动加载 默认不禁用
      }
    },
    components: {
      NavHeader,
      NavFooter
    },
    mounted: function () {
      this.getGoodList();
    },
    methods: {
      getGoodList(isAppend){
          var params = {
            curPage : this.curPage,
            numPerPage : this.pageSize,
            sort : this.isUpPrice ? 1 : -1
          };
        axios.get("/api/goods/",{params:params}).then((result) => {
          var res = result.data;
          if(res.status == "0"){
              if(isAppend){
                  // 是累加
                this.goodsList = this.goodsList.concat(res.result.list);
              }else{
                this.goodsList = res.result.list;
              }

              // 判断滑动是否可加载
            if(res.result.count < this.pageSize){
                  this.busy = true;
                  this.loadTxt = '没有更多数据了';
            }else{
              this.busy = false;
            }
          }else{
              alert(res.msg);
          }

        })
      },
      showFilterPop(){
          this.isShowPrice = true;
          this.isShowOverLay = true;
      },
      hideFilterPop(){
        this.isShowPrice = false;
        this.isShowOverLay = false;
      },
      doFilterAction(index){
        this.priceChecked = index;
        this.hideFilterPop();
      },
      // 排序点击

      sortBtn(flag){
          if(flag == 'default'){
              // 默认排序
            this.getGoodList();
          }else{
              this.isUpPrice = !this.isUpPrice;
            this.getGoodList();
            }
      },
      loadMore(){
         // 加载下一页
        this.busy = true; // 设置为滑动不加载
        this.curPage++;
        setTimeout(()=>{
          this.getGoodList(true);
        },500)

      }
    }
  }
</script>
