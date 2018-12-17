/**
 * Created by thinkive on 2018/9/29.
 */
// 创建一个服务
let http = require("http");
let url = require('url');
let util = require("util");

const fs = require("fs");


let server = http.createServer((req,res)=>{
  // res.statusCode = 200;
  // res.setHeader("Content-Type","text/plain;chartset=utf-8");
  util.inspect(url.parse(req.url)); // 将对象转为字符串
  let pathName = url.parse(req.url).pathname;
  fs.readFile(pathName.substring(1),(err,data)=>{
    if(err){
      res.writeHead(404,{
        'Content-Type':'text/html'
      });
    }else{
      res.writeHead(200,{
        'Content-Type':'text/html'
      })
      res.write(data.toString());
    }
    res.end();
  });
});

server.listen(3001,'127.0.0.1',()=>{
  console.log("服务器已经运行22，请打开浏览器输入127.0.0.1:3001来访问");
});
