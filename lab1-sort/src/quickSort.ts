const writeToJson3 = require("../util/index").writeToJson

/**
 * 快速排序
 */

interface Result {
  len: number,
  time: number
}
const baseIndex = (arr: Array<number>, low: number, high: number) => {
  // 定基准
  const base = arr[low];
  while(low < high) {
    while(low < high && arr[high] >= base) high--;
    arr[low] = arr[high];
    while(low < high && arr[low] <= base) low++;
    arr[high] = arr[low]
  }
  arr[low] = base; // 固定基准位置
  return low;
}
const quickSort = (dataSource: Array<number>, low: number, high: number) => {
  // 函数主体
  if (low < high) {
    // 定好基准
    const base = baseIndex(dataSource, low, high);
    // 对基准左右分别快排
    quickSort(dataSource, low, base - 1);
    quickSort(dataSource, base + 1, high);
  }
}

const data = [1, 22, 44, 4,123123,123, 10, 8];
let len = data.length;
let startTime: Date = new Date();

// 执行函数
quickSort(data, 0, data.length - 1);
let endTime: Date = new Date();

const dataResult: Result = {
  len,
  time: endTime.getTime() - startTime.getTime()
}
writeToJson3("quickSort" + len +"Result.json", JSON.stringify(dataResult));
