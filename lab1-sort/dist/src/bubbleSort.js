var writeToJson2 = require("../util/index").writeToJson;
var bubbleSort = function (dataSource) {
    var len = dataSource.length;
    var startTime = new Date();
    // 函数主体
    for (var _i = 0, dataSource_1 = dataSource; _i < dataSource_1.length; _i++) {
        var index = dataSource_1[_i];
        for (var i = index; i < dataSource.length - 1; i++) {
            if (dataSource[i] > dataSource[i + 1]) {
                var temp = dataSource[i + 1];
                dataSource[i + 1] = dataSource[i];
                dataSource[i] = temp;
            }
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
    writeToJson2("bubbleSort" + len + "Result.json", JSON.stringify(dataResult));
};
// 执行函数
bubbleSort([1, 2, 5, 4, 10, 8]);
//# sourceMappingURL=bubbleSort.js.map