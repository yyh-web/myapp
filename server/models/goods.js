/**
 * Created by thinkive on 2018/11/12.
 * module.exports 是node的一种方式
 */
// require会默认去node_modules的模块 如果没有  则会报错
var mongoose = require("mongoose");
var Schema = mongoose.Schema;//表模型
var productSchema = new Schema({
  "goodId":String,
  "goodName":String,
  "goodPrice":Number,
  "goodImg":String
});

// 此处定义的Good 在mongodb里面会自动匹配goods 集合，所以在mongodb创建集合时，应该在集合后面加s 如：good 应为goods，不然此处会匹配不到

module.exports = mongoose.model("Good",productSchema);
