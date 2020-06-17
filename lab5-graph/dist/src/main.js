"use strict";
exports.__esModule = true;
var readFile_1 = require("../util/readFile");
var dataSource = []; // 原始数据
var data = []; // 顶点数据集合
var union = {}; // 并查集顶点集合
var total = 0; // 原始连通个数
var count = 0;
var nowTotal = 0; // 去除掉边后的连通块个数
function create() {
    // 初始化
    for (var i = 0; i < 50; i++) { // 对每一个元素都设置初始值
        data[i] = {
            visitied: false,
            next: []
        };
    }
    dataSource = readFile_1.getData();
    Object.keys(dataSource).forEach(function (key) {
        data[parseInt(key)].next = dataSource[key]; // 点的连通顶点集合
    });
}
function createUnion() {
    // 初始化所有union
    var _loop_1 = function (i) {
        // data[i].next下的所有元素都认i做老大
        data[i].next.forEach(function (vertex) {
            if (!union[i])
                union[i] = {
                    root: i,
                    edge: []
                };
            if (!union[vertex])
                union[vertex] = {
                    root: vertex,
                    edge: []
                };
            union[vertex].root = i,
                union[i].edge.push({
                    isCycle: false,
                    visitied: false,
                    index: vertex
                });
        });
    };
    for (var i = 0; i < data.length; i++) {
        _loop_1(i);
    }
}
/**
 * 深度优先搜索 返回连通块个数
 * @param {number} pos 当前下标
 */
function DFS(pos) {
    // 深度优先搜索,pos为当前下标
    if (data[pos].visitied == false) {
        data[pos].visitied = true;
        for (var j = 0; j < data[pos].next.length; j++) {
            DFS(data[pos].next[j]); //该顶点的连接点依次进行DFS遍历
        }
        return true;
    }
    return false;
}
;
/**
 * 基准算法
 * For every edge (u, v), do following
 * a) Remove (u, v) from graph
 * b) See if the graph remains connected (We can either use BFS or DFS)
 * c) Add (u, v) back to the graph.
 */
function baseAlgorithm() {
    var bridge = 0; // 桥的个数
    var v1 = Object.keys(data); // 有边的顶点集合
    for (var i = 0; i < v1.length; i++) {
        var vertex = data[parseInt(v1[i])]; // 顶点
        for (var j = 0; j < vertex.next.length; j++) {
            // 截断这个边再看看是否影响了连通数，决定是否是桥
            var temp = vertex.next.splice(j, 1); // 将该边去掉
            total = 0; // 先将total变为0;
            for (var i_1 = 0; i_1 < data.length; i_1++) { // 对每一个元素重新设置visitied
                data[i_1].visitied = false;
            }
            for (var i_2 = 0; i_2 < data.length; i_2++) {
                if (DFS(i_2))
                    total += 1; // 连通块数+1
            }
            if (total !== nowTotal)
                bridge += 1; // 如果改变了连通块个数，桥的数量+1
            vertex.next.splice(j, 0, temp[0]); // 将该边去加回去
        }
    }
    return bridge;
}
/**
 * 并查集深度优先搜索，只对当前Loop记录visited，找到环边路上所有cycle都即为true
 * @param {number} index 当前下标
 * @param {Edge} pos 目的顶点
 * @param {number} root 根节点
 */
function DFSForUnion(i, edge, root) {
    if (edge.index === i) {
        // 如果两个点已经在集合里就不用算了，肯定是环边
        if (union[i].root === union[edge.index].root) {
            edge.isCycle = true;
            edge.visitied = true;
            return true;
        }
        // 深度优先搜索
        if (edge.visitied == false) {
            edge.visitied = true;
            for (var j = 0; j < union[i].edge.length; j++) {
                if (union[i].edge[j].index === edge.index) {
                    union[j].root = root;
                    union[j].edge[j].isCycle = true;
                    return true;
                }
                union[j].root = root;
                union[j].edge[j].isCycle = DFSForUnion(union[j].edge[j].index, edge, root); // 根据是否找到来判断是不是环边
            }
        }
        return edge.isCycle; // boolean, 如果访问过，直接返回是否是环边 
    }
}
;
/**
 * 并查集+环边算法，桥=边数-环边数
 */
function UnionAlgorithm(index) {
    // 寻找环边，即去掉AB边后，仍可从A点通过另一路径找到点B,路径上的每个点都是环边
    union[index].edge.forEach(function (vertex, i) {
        // 对连接vertex的所有顶点进行一次去边
        var temp = union[index].edge.splice(i, 1); // 将该边去掉
        vertex.isCycle = DFSForUnion(index, vertex, index); // 对该边进行特定的DFS遍历，看看能否到达
        union[index].edge.splice(i, 0, temp[0]); // 将该边去加回去
    });
}
/**
 * main 主函数
 */
var main = function () {
    try {
        var start1 = Date.now();
        create();
        // console.log(' init data: ');
        // console.log(data);
        total = 0;
        // 求连通块数, 经历了多少次DFS就有多少块。
        for (var i = 0; i < data.length; i++) {
            if (DFS(i))
                total += 1; // 连通块数+1
        }
        nowTotal = total;
        // 使用基准算法，计算桥的个数
        var bridge1 = baseAlgorithm();
        var end1 = Date.now();
        var start2 = Date.now();
        // 并查集优化算法
        // 初始化数据结构
        createUnion();
        // const pre = UnionSort();
        for (var i = 0; i < Object.keys(union).length; i++) {
            UnionAlgorithm(i);
        }
        var end2 = Date.now();
        // 求桥的个数
        var cycle_1 = 0;
        Object.keys(union).map(function (key) {
            union[key].edge.forEach(function (edge) {
                if (edge.isCycle === true)
                    cycle_1++; // 环边
            });
        });
        var bridge2 = 147 - cycle_1;
        ; // 题目共计147个边，减去环边即为桥的数量
        console.log("1 time: ", end1 - start1);
        console.log("2 time: ", end2 - start2);
    }
    catch (e) {
        console.log("【执行失败】", e);
    }
};
/** 执行主函数 */
main();
//# sourceMappingURL=main.js.map