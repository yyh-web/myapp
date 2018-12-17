/**
 * Created by thinkive on 2018/11/1.
 */
var express = require('express');
var router = express.Router();
const http = require('http');
var queryString = require("querystring");
var fs = require('fs');

var md5 = require('md5-node');


/* GET home page. */
router.get('/doit', function (req, res, next) {
  var rand = Math.round(Math.random()*1000);
  var timestamp = new Date().getTime().toString();
  timestamp = timestamp.substring(0,8);
  var content = "85wdsambqwc" + rand + timestamp;
  var postData = {
      "user":"492841647@qq.com",
      "password":"yyh1564335..",
      "rand":rand,
      "sign":md5(content)
  };
  postData = queryString.stringify(postData);
  console.log(postData);
  var reqParam = {
    hostname: 'tuokeserver.com',
    path: '/api/v1/token/',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    }
  }

  var request = http.request(reqParam, (data) => {
    console.log(`返回状态：${data.statusCode}`);
    var headersStr = JSON.stringify(data.headers);
    console.log(`响应头：${headersStr}`);
    data.setEncoding('utf8');
    var responseData = "";
    data.on('data', function (chunk) {
      responseData +=chunk;
    });
    data.on("end",function(){
      console.log("body"+responseData);
      res.render("auth",{"body":responseData});
    })
  });
  request.on('error', function (e) {
    console.log('problem with request: ' + e.message);
  });
  request.write(postData);
  request.end();
});

module.exports = router;
