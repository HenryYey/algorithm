// 穷举法计算最近两点
var exhaustivity = function (dataSource) {
    var minPoint = {
        x1: -1,
        x2: -1,
        y1: -1,
        y2: -1
    };
    var minDistance = dataSource.length * dataSource.length; // 定义最短距离，初始化为最大值
    for (var i = 0; i < dataSource.length - 1; i++) {
        for (var j = i + 1; j < dataSource.length; j++) {
            // 根据勾股定理计算两者距离
            var xDistance = Math.abs(dataSource[i].x - dataSource[j].x); // 计算两点x绝对值
            var yDistance = Math.abs(dataSource[i].y - dataSource[j].y); // 计算两点y绝对值
            var r = void 0;
            if (xDistance === 0)
                r = yDistance;
            else if (yDistance === 0)
                r = xDistance;
            else
                r = Math.abs(xDistance * xDistance + yDistance * yDistance); // 计算两点距离
            if (r < minDistance) {
                // 记录该点
                minPoint.x1 = dataSource[i].x;
                minPoint.x2 = dataSource[j].x;
                minPoint.y1 = dataSource[i].y;
                minPoint.y2 = dataSource[j].y;
                minDistance = r;
            }
        }
    }
    return {
        minPoint: minPoint,
        minDistance: minDistance
    };
};
// 执行主函数
exports.exhaustivityMain = function (data) {
    var len = data.length;
    var startTime = new Date();
    // 执行函数
    var result = exhaustivity(data);
    var endTime = new Date();
    var dataResult = {
        len: len,
        time: endTime.getTime() - startTime.getTime(),
        minPoint: result.minPoint,
        minDistance: result.minDistance
    };
    return dataResult;
};
//# sourceMappingURL=exhaustivity.js.map