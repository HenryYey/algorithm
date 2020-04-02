const writeToJson2 = require("../util/index").writeToJson

/**
 * 冒泡排序
 */

interface Result {
  len: number,
  time: number
}

const bubbleSort = (dataSource: Array<number>) => {
  let len: number = dataSource.length;
  let startTime: Date = new Date();

  // 函数主体
  for (let index of dataSource) {
    for(let i = index; i < dataSource.length - 1; i++) {
      if (dataSource[i] > dataSource[i+1]) {
        let temp = dataSource[i+1];
        dataSource[i+1] = dataSource[i];
        dataSource[i] = temp;
      }
    }
  }
  // 打印数组
  console.log(dataSource);

  let endTime: Date = new Date();
  // 统计结果
  const dataResult: Result = {
    len,
    time: endTime.getTime() - startTime.getTime()
  } 
  writeToJson2("bubbleSort" + len +"Result.json", JSON.stringify(dataResult));
}
// 执行函数
bubbleSort([1, 2, 5, 4, 10, 8]);

