"use strict";
exports.__esModule = true;
/**
 * @feature 消消乐问题
 * @author hengye
 */
var index_1 = require("../util/index");
var scoreList = []; // 分数集合
var timeList = []; // 执行时间集合
var avgStepScore = {};
/**
 * main 主函数
 */
var main = function () {
    try {
        var board = index_1.createBoard(4, 4, 8);
        var directions = ["left", "right", "top", "bottom"];
        var _loop_1 = function (y) {
            var startTime = Date.now();
            var score = 0; // 得分
            var tempBoard = board.slice(0); // 深拷贝数组
            var row = tempBoard[y];
            var _loop_2 = function (x) {
                // 可能产生连续塌陷
                while (index_1.isSame(tempBoard, x, y).isSubside) {
                    score += index_1.handleSubside(tempBoard, index_1.isSame(tempBoard, x, y).PointList);
                }
                directions.forEach(function (direction) {
                    // 从起始点开始连续交换
                    score = index_1.change(tempBoard, x, y, direction, score, 0);
                });
                // 放入得分集合和时间集合
                scoreList.push(score);
                var endTime = Date.now();
                timeList.push(endTime - startTime);
            };
            for (var x = 0; x < row.length; x++) {
                _loop_2(x);
            }
        };
        // 从下往上，一层层遍历
        for (var y = 0; y < board.length; y++) {
            _loop_1(y);
        }
        // 统计结果
        var result = index_1.handleResult(scoreList, timeList);
        // 将结果写入文件保存
        index_1.writeToJson("result", JSON.stringify(result));
    }
    catch (e) {
        console.log("【执行失败】", e);
    }
};
/** 执行主函数 */
main();
//# sourceMappingURL=main.js.map