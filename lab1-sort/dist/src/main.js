/**
 * @feature 执行五个n量级的五种排序，每组20个样本
 * @author hengye
 */
/**
 * 导入函数
 */
var bubbleSort = require("./bubbleSort").bubbleSort;
var selectSort = require("./selectSort").selectSort;
var insertSort = require("./insertSort").insertSort;
var mergeMain = require("./mergeSort").mergeMain;
var quickMain = require("./quickSort").quickMain;
var _a = require("../util/index"), writeToJson = _a.writeToJson, randomArray = _a.randomArray;
/**
 * 结果容器
 */
var selectResult = [];
var insertResult = [];
var mergeResult = [];
var bubbleResult = [];
var quickResult = [];
/**
 * main 主函数
 */
var main = function () {
    try {
        console.log("【开始执行】");
        // 20个样本,跨度 10k
        for (var j = 1; j <= 5; j++) {
            var n = j * 10000;
            for (var i = 1; i <= 20; i++) {
                // 产生随机数组
                var dataSource = randomArray(n);
                // 分别将该量级下的五种排序结果存入容器
                // tips: 深拷贝数组
                selectResult.push(selectSort(dataSource.slice(0)));
                insertResult.push(insertSort(dataSource.slice(0)));
                bubbleResult.push(bubbleSort(dataSource.slice(0)));
                quickResult.push(quickMain(dataSource.slice(0)));
                mergeResult.push(mergeMain(dataSource.slice(0)));
                console.log("\u3010\u6267\u884C\u5B8C\u6210\u3011\u7B2C" + i + "\u4E2A\u6837\u672C, \u91CF\u7EA7\u4E3A" + n);
            }
        }
    }
    catch (e) {
        console.log("【执行失败】", e);
    }
};
main();
// 将结果写入文件
var result = {
    selectResult: selectResult,
    bubbleResult: bubbleResult,
    insertResult: insertResult,
    mergeResult: mergeResult,
    quickResult: quickResult
};
writeToJson("result.json", JSON.stringify(result));
//# sourceMappingURL=main.js.map