/**
 * 插入排序
 */

interface Result {
  len: number,
  time: number
}

// 合并
const merge = (arr: Array<number>, low: number, mid: number, high: number, tempArr: Array<number>) => {
  if (low > mid || mid > high || arr.length === 0) return;
  // 对两个数组循环比较，插入global数组
  let i = low;
  let j = mid + 1;
  let end1 = mid;
  let end2 = high;
  let k = 0;
  // 交叉比较
  while (i <= end1 && j <= end2) {
    if (arr[i] < arr[j]) {
      tempArr[k++] = arr[i++];
    } else {
      tempArr[k++] = arr[j++];
    }
  }
  // 将左边剩余的推进去
  while(i <= end1) {
    tempArr[k++] = arr[i++];
  }
  while(j <= end2) {
    tempArr[k++] = arr[j++];
  }
  // 将临时数组拷回去
  let t = 0;
  while(t < k) {
    arr[low + t] = tempArr[t++];
  }
}

const mergeSort = (arr: Array<number>, low: number, high: number, tempArr: Array<number>) => {
  // 函数主体
  if (low >= high) return;
  const mid = Math.floor((low + high) / 2);
  
  // 对左右拆解分别排序
  mergeSort(arr, low, mid, tempArr);
  mergeSort(arr, mid + 1, high, tempArr);
  merge(arr, low, mid, high, tempArr);
}

// 执行函数
exports.mergeMain = (dataSource: Array<number>) => {
  let mergeLength: number = dataSource.length;
  let startTime1: Date = new Date();
  // 临时数组，用于将并好的数组放进去
  const tempArr: Array<number> = [];
  mergeSort(dataSource, 0, mergeLength - 1, tempArr);
  let endTime1: Date = new Date();
  const dataResult: Result = {
    len: mergeLength,
    time: endTime1.getTime() - startTime1.getTime()
  }
  return dataResult;
}
