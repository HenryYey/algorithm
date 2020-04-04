const fs = require("fs");

module.exports = {
  writeToJson: (fileName: string, data: Array<number>) => {
    fs.writeFile("../../result/" + fileName, data, "utf8", function(err: any) {
      //如果err=null，表示文件使用成功，否则，表示希尔文件失败
      if(err)
        console.log("写文件出错了，错误是：" + err);
      else
        console.log("done");
    });
  },
  randomArray(n: number) {
    const result = [];
    for(let i = 0; i < n; i++) {
      const num = Math.floor(Math.random() * n);    // 可均衡获取 0 到 n-1 的随机整数。
      result.push(num);
    }
    return result;
  }
}