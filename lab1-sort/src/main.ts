/**
 * @feature 执行五个n量级的五种排序，每组20个样本
 * @author hengye
 */

/**
 * 导入函数
 */
const { bubbleSort } = require("./bubbleSort");
const { selectSort } = require("./selectSort");
const { insertSort } = require("./insertSort");
const { mergeMain } = require("./mergeSort");
const { quickMain } = require("./quickSort");
const { writeToJson, randomArray} = require("../util/index");

/**
 * 结果容器
 */

let selectResult: Array<Object> = [];
let insertResult: Array<Object> = [];
let mergeResult: Array<Object> = [];
let bubbleResult: Array<Object> = [];
let quickResult: Array<Object> = [];

/**
 * main 主函数
 */
const main = () => {
  try {
    console.log("【开始执行】");
    // 20个样本,跨度 10k
    for (let j = 1; j <= 5; j++) {
      const n = j * 10000;
      for (let i = 1; i <= 20; i++) {
        // 产生随机数组
        const dataSource = randomArray(n);

        // 分别将该量级下的五种排序结果存入容器
        // tips: 深拷贝数组
        selectResult.push(selectSort(dataSource.slice(0)));
        insertResult.push(insertSort(dataSource.slice(0)));
        bubbleResult.push(bubbleSort(dataSource.slice(0)));
        quickResult.push(quickMain(dataSource.slice(0)));
        mergeResult.push(mergeMain(dataSource.slice(0)));

        console.log(`【执行完成】第${i}个样本, 量级为${n}`);
      }
    }
  } catch (e) {
    console.log("【执行失败】", e);
  }
}

main();

// 将结果写入文件
const result = {
  selectResult,
  bubbleResult,
  insertResult,
  mergeResult,
  quickResult
}
writeToJson("result.json", JSON.stringify(result));
