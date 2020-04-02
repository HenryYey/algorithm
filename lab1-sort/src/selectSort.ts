const writeToJson = require("../util/index").writeToJson

/**
 * 选择排序
 */

interface Result {
  len: number,
  time: number
}

const selectSort = (dataSource: Array<number>) => {
  let len: number = dataSource.length;
  let startTime: Date = new Date();

  // 函数主体
  for (let index = 0; index < dataSource.length - 1; index++) {
  let min = index;
    for(let i = index + 1; i < dataSource.length; i++) {
      if (dataSource[i] < dataSource[min]) {
        min = i;
      }
    }
    if (min !== index) {
      let temp = dataSource[index];
      dataSource[index] = dataSource[min];
      dataSource[min] = temp;
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
  writeToJson("selectSort" + len + "Result.json", JSON.stringify(dataResult));
}
// 执行函数
selectSort([1, 2, 5, 4, 10, 8]);

