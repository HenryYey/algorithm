/**
 * @feature 处理result，计算出每个量级的平均时间
 * @author hengye
 */

/**
 * 导入数据
 */

const data = require("../../result/result.json");
// const data = JSON.parse(JsonData);

interface Item {
  len: number,
  time: number
}
for (let i = 1; i <= 5; i++) {
  const n = i * 10000;
  Object.keys(data).forEach((sortName: string) => {
    let total = 0;
    data[sortName].forEach((item: Item) => {
      if (item.len === n) {
        total += item.time;
      }
    });
    const avg = total / 20.00;
    console.log(sortName, n, avg);
  });
}
