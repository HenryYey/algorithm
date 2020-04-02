const writeToJson4 = require("../util/index").writeToJson

/**
 * 选择排序
 */

interface Result {
  len: number,
  time: number
}

const insertSort = (dataSource: Array<number>) => {
  let len: number = dataSource.length;
  let startTime: Date = new Date();

  // 函数主体
  for (let index = 1; index < len; index++) {
    let j = 0;
    for (j = 0; j < index; j++) {
      // 找到index插入位置
      if (dataSource[index] < dataSource[j]) break;
    }

    const current = dataSource[index];
    // 将index位置的元素删掉 
    dataSource.splice(index, 1);
    // 插入到j前面
    dataSource.splice(j, 0, current);
  }
  // 打印数组

  let endTime: Date = new Date();
  // 统计结果
  const dataResult: Result = {
    len,
    time: endTime.getTime() - startTime.getTime()
  } 
  console.log(dataSource);
  writeToJson4("insertSort" + len + "Result.json", JSON.stringify(dataResult));
}
// 执行函数
insertSort([6, 3, 5, 7, 0]);

