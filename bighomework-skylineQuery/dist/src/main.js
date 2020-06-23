"use strict";
exports.__esModule = true;
/**
 * 基于RDF图的语义地点skyline查询计算
 * @author hengye
 */
var edge_1_1 = require("../lib/edge_1");
var node_keywords_1_1 = require("../lib/node_keywords_1");
var edge_2_1 = require("../lib/edge_2");
var node_keywords_2_1 = require("../lib/node_keywords_2");
/**RDF图实例 */
var RDF = /** @class */ (function () {
    /** 构造函数 */
    function RDF(_edges, _nodes) {
        this.nodes = {};
        this.min_key_before = {};
        this.source_nodes = [];
        var nodeHasIn = []; // 记录有入边的顶点
        // 初始化边和点的关系, 分两次构造保证所有顶点都有，因为有些边没有出度，有些点没有key
        for (var name_1 in _nodes) {
            this.nodes[name_1] = {
                keys: _nodes[name_1].split(","),
                visitied: false,
                nexts: []
            };
        }
        for (var name_2 in _edges) {
            var nexts = _edges[name_2].split(","); // 根据,拆分顶点名
            if (!this.nodes[name_2]) {
                this.nodes[name_2] = {
                    keys: [],
                    visitied: false,
                    nexts: nexts
                };
            }
            else {
                this.nodes[name_2].nexts = nexts;
            }
            nodeHasIn = nodeHasIn.concat(nexts);
        }
        ;
        // 过滤筛选源点，即没有入边的顶点
        this.source_nodes = Object.keys(this.nodes).filter(function (name) { return !nodeHasIn.includes(name); });
    }
    /**
     * 深度优先搜索，寻找两点距离
     * @param from 出发点
     * @param key 搜索关键词
     * @param level 深度
     */
    RDF.prototype.DFS = function (from, key, level) {
        if (!from)
            return -1;
        // if (typeof this.min_key_before[key] !== "undefined" && this.min_key_before[key] < level) {
        //   return -1; // 如果比之前找的还要长，肯定不是skyline地点，所以此时直接退出递归
        // }
        if (from.keys.includes(key)) {
            this.min_key_before[key] = level; // 记录最短路径
            return level;
        }
        var result = -1;
        if (!from.visitied) {
            from.visitied = true;
            for (var i = 0; i < from.nexts.length; i++) {
                var nextLevel = level + 1;
                var nextNode = this.nodes[from.nexts[i]];
                result = this.DFS(nextNode, key, nextLevel); // 找到了就立马返回
                if (result > -1)
                    break;
            }
        }
        return result;
    };
    /** 清理访问记录 */
    RDF.prototype.clearVisitied = function () {
        for (var name_3 in this.nodes) {
            this.nodes[name_3].visitied = false;
        }
    };
    return RDF;
}());
exports.RDF = RDF;
/** main函数 */
function main() {
    /** 实例化参数 */
    var rdf = new RDF(edge_1_1.edge_1, node_keywords_1_1.node_keywords_1);
    /**关键词集合 */
    var keys = ["scientific", "childhood"];
    keys.forEach(function (key) {
        /** 对源点进行深度优先搜索 */
        for (var i = 0; i < rdf.source_nodes.length; i++) {
            // 每个源点遍历完都要清理一遍visited
            !!i && rdf.clearVisitied();
            var pname = rdf.source_nodes[i];
            var result = rdf.DFS(rdf.nodes[pname], key, 0);
            if (result === -1)
                continue;
            console.log("(dg(T" + rdf.source_nodes[i] + ", " + key + ")=", result);
        }
    });
    console.log("---------题目2--------");
    var start = Date.now();
    var rdf2 = new RDF(edge_2_1.edge_2, node_keywords_2_1.node_keywords_2);
    /**关键词集合 */
    var keys2 = ["11674756", "10376090"];
    keys2.forEach(function (key) {
        /** 对源点进行深度优先搜索 */
        for (var i = 0; i < rdf2.source_nodes.length; i++) {
            // 每个源点遍历完都要清理一遍visited
            !!i && rdf2.clearVisitied();
            var pname = rdf2.source_nodes[i];
            var result = rdf2.DFS(rdf2.nodes[pname], key, 0);
            if (result === -1)
                continue;
            console.log("(dg(T" + rdf2.source_nodes[i] + ", " + key + ")=", result);
        }
    });
    var end = Date.now();
    console.log("问题2耗时: ", end - start);
}
main();
//# sourceMappingURL=main.js.map