/**
 * 选择排序
 */
exports.selectSort = function (dataSource) {
    var len = dataSource.length;
    var startTime = new Date();
    // 函数主体
    for (var index = 0; index < dataSource.length - 1; index++) {
        var min = index;
        for (var i = index + 1; i < dataSource.length; i++) {
            if (dataSource[i] < dataSource[min]) {
                min = i;
            }
        }
        if (min !== index) {
            var temp = dataSource[index];
            dataSource[index] = dataSource[min];
            dataSource[min] = temp;
        }
    }
    var endTime = new Date();
    // 统计结果
    var dataResult = {
        len: len,
        time: endTime.getTime() - startTime.getTime()
    };
    return dataResult;
};
//# sourceMappingURL=selectSort.js.map