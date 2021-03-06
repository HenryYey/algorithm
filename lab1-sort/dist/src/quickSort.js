/**
 * 快速排序
 */
var baseIndex = function (arr, low, high) {
    // 定基准
    var base = arr[low];
    while (low < high) {
        while (low < high && arr[high] >= base)
            high--;
        arr[low] = arr[high];
        while (low < high && arr[low] <= base)
            low++;
        arr[high] = arr[low];
    }
    arr[low] = base; // 固定基准位置
    return low;
};
var quickSort = function (dataSource, low, high) {
    // 函数主体
    if (low < high) {
        // 定好基准
        var base = baseIndex(dataSource, low, high);
        // 对基准左右分别快排
        quickSort(dataSource, low, base - 1);
        quickSort(dataSource, base + 1, high);
    }
};
// 执行主函数
exports.quickMain = function (data) {
    var len = data.length;
    var startTime = new Date();
    // 执行函数
    quickSort(data, 0, data.length - 1);
    var endTime = new Date();
    var dataResult = {
        len: len,
        time: endTime.getTime() - startTime.getTime()
    };
    return dataResult;
};
//# sourceMappingURL=quickSort.js.map