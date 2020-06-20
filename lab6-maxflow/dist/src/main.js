"use strict";
/**
 * 最大流值班问题
 * @author hengye
 */
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
exports.__esModule = true;
/** 边 */
var Edge = /** @class */ (function () {
    /** 构造一条流网络的边 */
    function Edge(from, to, size) {
        this.from = from;
        this.to = to;
        this.size = size;
    }
    return Edge;
}());
exports.Edge = Edge;
/** 节点 */
var Node = /** @class */ (function () {
    /** 构造一个新的节点 */
    function Node(index, end) {
        if (end === void 0) { end = false; }
        /** 该节点的边集合 */
        this.edges = new Map();
        this.index = index;
        this.end = end;
    }
    /** 在流网络中新建一条边（同时建立反向空边） */
    Node.prototype.createEdge = function (to, size) {
        this.edges.set(to, new Edge(this, to, size));
        to.edges.set(this, new Edge(to, this, 0));
    };
    /** 调整流大小， 减去增广路径最小容量delta */
    Node.prototype.handleFlow = function (to, delta) {
        this.edges.get(to).size -= delta;
        to.edges.get(this).size += delta;
    };
    /** 使用bfs(广度优先搜索)找一条到汇点的增广路径 */
    Node.prototype.BFS = function () {
        var e_1, _a;
        var _this = this;
        // 构建节点队列
        var queue = __spread(this.edges).filter(function (_a) {
            var _b = __read(_a, 2), node = _b[0], edge = _b[1];
            return edge.size > 0;
        })
            .map(function (_a) {
            var _b = __read(_a, 2), node = _b[0], edge = _b[1];
            return [_this, edge.to];
        });
        while (queue.length > 0) {
            var path = queue.shift(); // 取出队头
            var last = path[path.length - 1]; // 取出队尾 
            if (last.end)
                return path; // 如果是汇点则返回路径
            try {
                for (var _b = (e_1 = void 0, __values(last.edges)), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var _d = __read(_c.value, 2), node = _d[0], edge = _d[1];
                    if (edge.size !== 0 && !path.includes(edge.to))
                        queue.push(__spread(path, [edge.to]));
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        return null;
    };
    return Node;
}());
exports.Node = Node;
/** Ford-Fulkerson 方法计算最大流 */
function FordFulkerson(data) {
    /** 建立流网络 */
    var length = data.length;
    // 根据data数据创建节点对象
    var nodes = data.map(function (value, i) { return new Node(i, i === length - 1); });
    for (var i = 0; i < length; i++) {
        for (var j = 0; j < length; j++) {
            if (data[i][j]) {
                nodes[i].createEdge(nodes[j], data[i][j]);
            }
        }
    }
    // 原点和汇点
    var root = nodes[0];
    var end = nodes[length - 1];
    // 循环获取增广路径
    var path;
    var _loop_1 = function () {
        var e_2, _a;
        // 生成路径,每个元素由两个节点组成，(from, to)
        var pathTuples = [];
        for (var i = 0; i < path.length - 1; i++) {
            pathTuples.push([path[i], path[i + 1]]);
        }
        // 计算增广路径中的最小容量
        var capacities = [];
        pathTuples.forEach(function (pathTuple) {
            var from = pathTuple[0];
            var to = pathTuple[1];
            capacities.push(from.edges.get(to).size);
        });
        var min = Math.min.apply(Math, __spread(capacities));
        try {
            // 调整残余网络
            for (var pathTuples_1 = (e_2 = void 0, __values(pathTuples)), pathTuples_1_1 = pathTuples_1.next(); !pathTuples_1_1.done; pathTuples_1_1 = pathTuples_1.next()) {
                var pathTuple = pathTuples_1_1.value;
                pathTuple[0].handleFlow(pathTuple[1], min);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (pathTuples_1_1 && !pathTuples_1_1.done && (_a = pathTuples_1["return"])) _a.call(pathTuples_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
    };
    while (path = root.BFS()) {
        _loop_1();
    }
    // 当没有更多的增广路径时，计算汇点的所有出边的流量和，即最大流
    var sum = 0;
    end.edges.forEach(function (edge) {
        if (edge.size > 0) {
            sum += edge.size;
        }
    });
    return sum;
}
/** main函数 */
function main() {
    /** 实例化参数 */
    // 假日共total天
    var total = 5;
    // 定义网络流, 排版方案
    var data = [
        [0, 2, 2, 2, 0, 0, 0],
        [0, 0, 0, 0, 1, 1, 0],
        [0, 0, 0, 0, 1, 1, 0],
        [0, 0, 0, 0, 0, 1, 0],
        [0, 0, 0, 0, 0, 0, 2],
        [0, 0, 0, 0, 0, 0, 3],
        [0, 0, 0, 0, 0, 0, 0]
    ];
    var result = FordFulkerson(data);
    // 排班结果需要满5天
    if (result === total) {
        console.log("排班成功, 排班方案为: ", data);
    }
    else {
        console.log("\u6392\u73ED\u5931\u8D25\uFF0C\u5E94\u6392" + total + "\u5929\u73ED\uFF0C\u5B9E\u6392" + result + "\u5929\u73ED");
    }
}
main();
//# sourceMappingURL=main.js.map