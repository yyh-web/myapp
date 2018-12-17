/**
 * Created by thinkive on 2018/9/29.
 */
/**
 * 在node中  可以直接使用es6的语法  因为node的引擎都一样  都是
 * Chrome V8 本身就支持node语法
 *
 * nodejs中使用CommonJs规范
 */
let user = require("./User");
console.log(`userName:${user.userName}`);


// 创建一个服务
let http = require("http");
let url = require('url');
let util = require("util");

let server = http.createServer((req,res)=>{
  res.statusCode = 200;
  res.setHeader("Content-Type","text/plain;chartset=utf-8");
  util.inspect(url.parse(req.url)); // 将对象转为字符串
  res.end(util.inspect(url.parse(req.url)));
});

server.listen(3000,'127.0.0.1',()=>{
  console.log("服务器已经运行，请打开浏览器输入127.0.0.1:3000来访问");
});
