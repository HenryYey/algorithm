// https://www.npmjs.com/package/random-seed
const fs = require("fs");
const rand = require('random-seed').create();

interface Point {
  x: number,
  y: number
}

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
  /* 生成长度为n的随机点对数组 */
  randomArray(n: number) {
    // 点对集合
    const points: Point[] = [];
    for(let i = 0; i < n; i++) {
      let x = Math.random() * n;    // 可随机获取 0 到 n-1 的随机整数。
      let y = Math.random() * n;    // 可随机获取 0 到 n-1 的随机整数。
      // 取小数点后4位作为坐标，做到完全随机
      let xStr = x.toFixed(4).toString();
      let yStr = y.toFixed(4).toString();
      let str1 = xStr.split(".")[1];
      let str2 = yStr.split(".")[1];
      x = parseFloat(str1);
      y = parseFloat(str2);
      const point = {
        x: x, // x轴坐标
        y: y // y轴坐标
      }
      points.push(point);
    }
    return points;
  }
}