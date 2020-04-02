var writeToJson4 = require("../util/index").writeToJson;
var insertSort = function (dataSource) {
    var len = dataSource.length;
    var startTime = new Date();
    // 函数主体
    for (var index = 1; index < len; index++) {
        var j = 0;
        for (j = 0; j < index; j++) {
            // 找到index插入位置
            if (dataSource[index] < dataSource[j])
                break;
        }
        var current = dataSource[index];
        // 将index位置的元素删掉 
        dataSource.splice(index, 1);
        // 插入到j前面
        dataSource.splice(j, 0, current);
        console.log(dataSource);
    }
    // 打印数组
    var endTime = new Date();
    // 统计结果
    var dataResult = {
        len: len,
        time: endTime.getTime() - startTime.getTime()
    };
    writeToJson4("insertSort" + len + "Result.json", JSON.stringify(dataResult));
};
// 执行函数
insertSort([6, 3, 5, 7, 0]);
//# sourceMappingURL=insertSort.js.map