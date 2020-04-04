/**
 * 插入排序
 */
// 合并
var merge = function (arr, low, mid, high, tempArr) {
    if (low > mid || mid > high || arr.length === 0)
        return;
    // 对两个数组循环比较，插入global数组
    var i = low;
    var j = mid + 1;
    var end1 = mid;
    var end2 = high;
    var k = 0;
    // 交叉比较
    while (i <= end1 && j <= end2) {
        if (arr[i] < arr[j]) {
            tempArr[k++] = arr[i++];
        }
        else {
            tempArr[k++] = arr[j++];
        }
    }
    // 将左边剩余的推进去
    while (i <= end1) {
        tempArr[k++] = arr[i++];
    }
    while (j <= end2) {
        tempArr[k++] = arr[j++];
    }
    // 将临时数组拷回去
    var t = 0;
    while (t < k) {
        arr[low + t] = tempArr[t++];
    }
};
var mergeSort = function (arr, low, high, tempArr) {
    // 函数主体
    if (low >= high)
        return;
    var mid = Math.floor((low + high) / 2);
    // 对左右拆解分别排序
    mergeSort(arr, low, mid, tempArr);
    mergeSort(arr, mid + 1, high, tempArr);
    merge(arr, low, mid, high, tempArr);
};
// 执行函数
exports.mergeMain = function (dataSource) {
    var mergeLength = dataSource.length;
    var startTime1 = new Date();
    // 临时数组，用于将并好的数组放进去
    var tempArr = [];
    mergeSort(dataSource, 0, mergeLength - 1, tempArr);
    var endTime1 = new Date();
    var dataResult = {
        len: mergeLength,
        time: endTime1.getTime() - startTime1.getTime()
    };
    return dataResult;
};
//# sourceMappingURL=mergeSort.js.map