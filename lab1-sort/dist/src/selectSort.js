var writeToJson = require("../util/index").writeToJson;
var selectSort = function (dataSource) {
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
    // 打印数组
    console.log(dataSource);
    var endTime = new Date();
    // 统计结果
    var dataResult = {
        len: len,
        time: endTime.getTime() - startTime.getTime()
    };
    writeToJson("selectSort" + len + "Result.json", JSON.stringify(dataResult));
};
// 执行函数
selectSort([1, 2, 5, 4, 10, 8]);
//# sourceMappingURL=selectSort.js.map