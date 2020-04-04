/**
 * 冒泡排序
 */

interface Result {
  len: number,
  time: number
}

exports.bubbleSort = (dataSource: Array<number>) => {
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

  let endTime: Date = new Date();
  // 统计结果
  const dataResult: Result = {
    len,
    time: endTime.getTime() - startTime.getTime()
  } 
  return dataResult;  
}
