const writeToJson4 = require("../util/index").writeToJson

/**
 * 插入排序
 */

interface Result {
  len: number,
  time: number
}

exports.insertSort = (dataSource: Array<number>) => {
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

  let endTime: Date = new Date();
  // 统计结果
  const dataResult: Result = {
    len,
    time: endTime.getTime() - startTime.getTime()
  } 
  return dataResult;
}
