/**
 * @feature 使用蛮力法和分治法求最近点问题
 * @author hengye
 */
/**
 * 导入函数
 */
var exhaustivityMain = require("./exhaustivity").exhaustivityMain;
var _a = require("../util/index"), writeToJson = _a.writeToJson, randomArray = _a.randomArray;
/**
 * 结果容器
 */
var exhaustivityResult = [];
var quickResult = [];
/**
 * main 主函数
 */
var main = function () {
    try {
        console.log("【开始执行】");
        // 10万-100万个样本
        for (var j = 1; j <= 10; j += 3) {
            var n = j * 100000;
            // 产生随机数组
            var dataSource = randomArray(n);
            exhaustivityResult.push(exhaustivityMain(dataSource));
        }
        writeToJson("exhuastivity.json", JSON.stringify(exhaustivityResult));
    }
    catch (e) {
        console.log("【执行失败】", e);
    }
};
main();
// 将结果写入文件
var result = {
    quickResult: quickResult
};
writeToJson("result.json", JSON.stringify(result));
//# sourceMappingURL=main.js.map