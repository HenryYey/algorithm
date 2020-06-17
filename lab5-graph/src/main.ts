/**
* 1.	实现上述基准算法。
* 2.	设计的高效算法中必须使用并查集，如有需要，可以配合使用其他任何数据结构。
* 3.	使用文件 mediumG.txt 中的无向图测试基准算法和高效算法的性能，记录两个算法的运行时间。
 * @author hengye
 */
import { Vertex, Union, Edge } from "./struct";
import { getData } from "../util/readFile";
let dataSource: any = []; // 原始数据
const data: Vertex[] = []; // 顶点数据集合
const union: Union = {}; // 并查集顶点集合
let total = 0; // 原始连通个数
let count = 0;
let nowTotal = 0; // 去除掉边后的连通块个数

function create() {
  // 初始化
  for (let i = 0; i < 50; i++) { // 对每一个元素都设置初始值
    data[i] = {
      visitied: false,
      next: []
    }; 
  }

  dataSource = getData();
  Object.keys(dataSource).forEach((key: string) => {
    data[parseInt(key)].next = dataSource[key]; // 点的连通顶点集合
  });

}
function createUnion() {
  // 初始化所有union
  
  for (let i = 0; i < data.length; i++) {
    // data[i].next下的所有元素都认i做老大
    data[i].next.forEach((vertex: number) => {
      if (! union[i])  union[i] = {
        root: i,
        edge: []
      }
      if (! union[vertex]) union[vertex] = {
        root: vertex,
        edge: []
      }
      union[vertex].root = i,
      union[i].edge.push({
        isCycle: false, // 是否是环边
        visitied: false, // 顶点是否被访问过
        index: vertex,
      });
    })
  }
}
/**
 * 深度优先搜索 返回连通块个数
 * @param {number} pos 当前下标
 */
function DFS(pos: number) { 
  // 深度优先搜索,pos为当前下标
  if (data[pos].visitied == false) {
    data[pos].visitied = true;

    for(let j = 0; j < data[pos].next.length; j++) {
      DFS(data[pos].next[j]); //该顶点的连接点依次进行DFS遍历
    }
    return true;
  }
  return false;
};

/**
 * 基准算法
 * For every edge (u, v), do following
 * a) Remove (u, v) from graph
 * b) See if the graph remains connected (We can either use BFS or DFS)
 * c) Add (u, v) back to the graph.
 */

function baseAlgorithm() {
  let bridge = 0; // 桥的个数

  const v1: string[] = Object.keys(data); // 有边的顶点集合
  for (let i = 0; i < v1.length; i++) {
    let vertex = data[parseInt(v1[i])]; // 顶点
    for (let j = 0; j < vertex.next.length; j++) {
      // 截断这个边再看看是否影响了连通数，决定是否是桥
      const temp = vertex.next.splice(j, 1); // 将该边去掉
      total = 0; // 先将total变为0;

      for (let i = 0; i < data.length; i++) { // 对每一个元素重新设置visitied
        data[i].visitied = false;
      }

      for (let i = 0; i < data.length; i++) {
        if (DFS(i)) total += 1; // 连通块数+1
      }

      if (total !== nowTotal) bridge += 1; // 如果改变了连通块个数，桥的数量+1
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
function DFSForUnion(i: number, edge: Edge, root: number): boolean {
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
      for(let j = 0; j < union[i].edge.length; j++) {
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
};

/**
 * 并查集+环边算法，桥=边数-环边数
 */
function UnionAlgorithm(index: number) {
  // 寻找环边，即去掉AB边后，仍可从A点通过另一路径找到点B,路径上的每个点都是环边
  union[index].edge.forEach((vertex: Edge, i: number) => {
    // 对连接vertex的所有顶点进行一次去边
    const temp = union[index].edge.splice(i, 1); // 将该边去掉
    vertex.isCycle = DFSForUnion(index, vertex, index); // 对该边进行特定的DFS遍历，看看能否到达
    union[index].edge.splice(i, 0, temp[0]); // 将该边去加回去
  })
}
/**
 * main 主函数
 */
const main = () => {
  try {
    const start1 = Date.now();
    create();
    // console.log(' init data: ');
    // console.log(data);
    total = 0;
    // 求连通块数, 经历了多少次DFS就有多少块。
    for (let i = 0; i < data.length; i++) {
      if (DFS(i)) total += 1; // 连通块数+1
    }

    nowTotal = total;

    // 使用基准算法，计算桥的个数
    const bridge1 = baseAlgorithm();
    const end1 = Date.now();
    const start2 = Date.now();
    // 并查集优化算法

    // 初始化数据结构
    createUnion();
  
    // const pre = UnionSort();
    for (let i = 0; i < Object.keys(union).length; i++) {
      UnionAlgorithm(i);
    }
    const end2 = Date.now();
    // 求桥的个数
    let cycle = 0;
    Object.keys(union).map((key: any) => {
      union[key].edge.forEach((edge:Edge) => {
        if (edge.isCycle === true) cycle++; // 环边
      });
    })

    const bridge2 = 147 - cycle;
    ; // 题目共计147个边，减去环边即为桥的数量

    console.log("1 time: ", end1 - start1);
    console.log("2 time: ", end2 - start2);
  } catch (e) {
    console.log("【执行失败】", e);
  }
}

/** 执行主函数 */
main();
