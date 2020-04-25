// 根据x坐标从小到大排序
function sortBy_x(point1, point2) {
    if (point1.x === point2.x)
        return point1.y - point2.y;
    return point1.x - point2.x;
}
// 根据纵坐标从小到大排序
function sortBy_y(point1, point2) {
    return point1.y - point2.y;
}
// 获取两点距离
function getDistance(point1, point2) {
    var xDistance = point1.x - point2.x;
    var yDistance = point1.y - point2.y;
    return Math.sqrt(xDistance * xDistance + yDistance * yDistance);
}
function getMin(vec, low, high) {
    if (high - low === 1) //2个结点
     {
        return getDistance(vec[low], vec[high]);
    }
    else if (high - low === 2) //3个结点
     {
        var dist1 = getDistance(vec[low], vec[low + 1]);
        var dist2 = getDistance(vec[low], vec[low + 2]);
        var dist3 = getDistance(vec[low + 1], vec[low + 2]);
        return Math.min(Math.min(dist1, dist2), dist3);
    }
    else {
        var mid = Math.floor((low + high) / 2);
        var left_min = getMin(vec, low, mid);
        var right_min = getMin(vec, mid + 1, high);
        var d = Math.min(left_min, right_min);
        var res = [];
        var i = void 0, j = void 0, k = 0;
        for (i = low; i <= high; i++) //遍历一遍数组，得到与横坐标与  中点横坐标距离在d以内的点
         {
            if (Math.abs(vec[i].x - vec[mid].x) < d)
                res.push(vec[i]);
        }
        res.sort(sortBy_y); // 根据纵坐标从小到大排序
        for (i = 0; i < res.length - 1; i++) {
            for (j = i + 1; j < i + 1 + 6 && j < res.length; j++) //求距离的点 为与i纵坐标的距离在d以内
             {
                if (res[j].y - res[i].y >= d)
                    break;
                var tempD = getDistance(res[i], res[j]);
                if (tempD < d) {
                    d = tempD;
                }
            }
        }
        return d;
    }
}
// 执行主函数
exports.mergeMain = function (data) {
    var len = data.length;
    var startTime = new Date();
    // 执行函数
    data.sort(sortBy_x); // 根据横坐标从小到大排序
    var dis = getMin(data, 0, len - 1);
    var endTime = new Date();
    var dataResult = {
        len: len,
        time: endTime.getTime() - startTime.getTime(),
        minDistance: dis
    };
    return dataResult;
};
//# sourceMappingURL=merge.js.map