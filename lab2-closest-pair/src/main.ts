/**
 * @feature 使用蛮力法和分治法求最近点问题
 * @author hengye
 */

/**
 * 导入函数
 */
const { exhaustivityMain } = require("./exhaustivity");
const { writeToJson, randomArray} = require("../util/index");

/**
 * 结果容器
 */

let exhaustivityResult: Array<Object> = [];
let quickResult: Array<Object> = [];

/**
 * main 主函数
 */
const main = () => {
  try {
    console.log("【开始执行】");
    // 10万-100万个样本
    for (let j = 1; j <= 10; j+= 3) {
      const n = j * 100000;
      // 产生随机数组
      const dataSource = randomArray(n);
      exhaustivityResult.push(exhaustivityMain(dataSource));
    }    
    writeToJson("exhuastivity.json", JSON.stringify(exhaustivityResult));
  } catch (e) {
    console.log("【执行失败】", e);
  }
}

main();

// 将结果写入文件
const result = {
  quickResult
}
writeToJson("result.json", JSON.stringify(result));
