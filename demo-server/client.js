const http = require('http');

http.get("http://m.imooc.com/api/search/searchword",(res)=>{
  let data = "";
  /**
   * 监听接受data数据
   */
  let count = 0;
  res.on("data",(chunk)=>{
    data += chunk;
    console.log(count++);
  });
  /**
   * 监听end  数据传输完毕执行
   */
  res.on("end",()=>{
    let result = JSON.parse(data);
    console.log("result"+data);
  })
});
