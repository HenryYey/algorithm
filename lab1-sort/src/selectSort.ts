/**
 * 选择排序
 */

interface Result {
  len: number,
  time: number
}

exports.selectSort = (dataSource: Array<number>) => {
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

  let endTime: Date = new Date();
  // 统计结果
  const dataResult: Result = {
    len,
    time: endTime.getTime() - startTime.getTime()
  }
  return dataResult;
}
