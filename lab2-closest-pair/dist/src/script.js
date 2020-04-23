/**
 * @feature 处理result，计算出每个量级的平均时间
 * @author hengye
 */
/**
 * 导入数据
 */
var data = require("../../result/result.json");
var _loop_1 = function (i) {
    var n = i * 10000;
    Object.keys(data).forEach(function (sortName) {
        var total = 0;
        data[sortName].forEach(function (item) {
            if (item.len === n) {
                total += item.time;
            }
        });
        var avg = total / 20.00;
        console.log(sortName, n, avg);
    });
};
for (var i = 1; i <= 5; i++) {
    _loop_1(i);
}
//# sourceMappingURL=script.js.map