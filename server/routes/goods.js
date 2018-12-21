/**
 * Created by thinkive on 2018/11/12.
 */
var express = require("express"); // 获取express
var router = express.Router(); // 获取router
var mongoose = require("mongoose"); // 引入mongose
var Goods =  require("../models/goods"); // 引入数据模板

// 连接数据库

mongoose.connect('mongodb://106.38.205.108:27017/test',{useNewUrlParser:true});

// 监听数据库是否连接成功
mongoose.connection.on("connected",()=>{
  console.log(`MongoDB connected success.`);
});

// 监听数据库连接失败
mongoose.connection.on("error",()=>{
  console.log(`数据库连接失败/MongoDB connected failed.`);
});

mongoose.connection.on("disconnected",()=>{
  console.log(`MongoDB connected disconnected.`);
});

// 实现路由  访问 / 时默认查询商品信息
router.get("/",(req,res,next)=>{
  // 获取参数
  let curPage = parseInt(req.param("curPage"));
  let numPerPage = parseInt(req.param("numPerPage")); // 需要转数字
  let sort = parseInt(req.param("sort")); // 1 升序 -1降序
  let skip = (curPage - 1) * numPerPage; // 需要跳过的条数

  let reqParam = {};
  let goodModel = Goods.find(reqParam).skip(skip).limit(numPerPage); // 跳过多少条 取几条
  // 排序
  goodModel.sort({"goodPrice":sort}); // 按goodprice排序
  // 执行查询
  goodModel.exec((err,doc)=>{
    if(err){
      res.json({
        status : "-1",
        msg:err.message
      });
    }else{
      res.json({
        status : "0",
        msg:"",
        result:{
          count:doc.length,
          curPage : curPage,
          pageSize : numPerPage,
          list:doc
        }
      });
    }
  });
  /*//next  继续执行
  Goods.find({},(error,doc)=>{

    if(error){
      res.json({
        status : "-1",
        msg : error.message
      });
    }else{
      res.json({
        status : "0",
        msg:"",
        result:{
          count:doc.length,
          list : doc
        }
      });
    }
  }); //查询集合（数据）*/
});

module.exports = router;
