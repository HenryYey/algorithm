/**
 * 基于RDF图的语义地点skyline查询计算
 * @author hengye
 */
import { edge_1, Edge } from "../lib/edge_1";
import { node_keywords_1, Keys } from "../lib/node_keywords_1";
import { edge_2 } from "../lib/edge_2";
import { node_keywords_2 } from "../lib/node_keywords_2";

interface Node {
  /** 顶点的文本属性集合，字符串数组 */
  keys: string[],
  /** 顶点的出边集合, 即索引名 */
  nexts: string[];
  /** 顶点是否被访问过 */
  visitied: boolean;
}
/** 顶点数据结构 */
export interface Nodes {
  [props: string]: Node // 索引即为顶点名字

}

const MAX_NUM = 65536; // 定义最大数，表示没有路径可以到达

/**RDF图实例 */
export class RDF {
  /** RDF图顶点实例 */
  nodes: Nodes;
  /** 图中的源点集合, 索引名数组 */
  source_nodes: string[];
  /** 之前已经找到的最短路径 */
  min_key_before: any;
  /** 构造函数 */
  constructor(_edges: Edge, _nodes: Keys) {
    this.nodes = {};
    this.min_key_before = {};
    this.source_nodes = [];
    let nodeHasIn: string[] = []; // 记录有入边的顶点

    // 初始化边和点的关系, 分两次构造保证所有顶点都有，因为有些边没有出度，有些点没有key
   for(const name in _nodes) {
      this.nodes[name] = {
        keys: _nodes[name].split(","), // 根据_拆分关键词,返回一个数组，
        visitied: false,
        nexts: []
      }
    }

    for(const name in _edges) {
      const nexts =  _edges[name].split(",") // 根据,拆分顶点名
      if (!this.nodes[name]) {
        this.nodes[name] = {
          keys: [], // 根据_拆分关键词,返回一个数组，
          visitied: false,
          nexts: nexts
        }
      } else {
        
        this.nodes[name].nexts = nexts;
      }
 
       nodeHasIn = nodeHasIn.concat(nexts);
     };
    // 过滤筛选源点，即没有入边的顶点
   this.source_nodes = Object.keys(this.nodes).filter((name: string) => !nodeHasIn.includes(name));
  }

  /**
   * 深度优先搜索，寻找两点距离
   * @param from 出发点
   * @param key 搜索关键词
   * @param level 深度
   */
  DFS(from: Node, key: string, level: number) {
    if (!from) return MAX_NUM;
    // 优化点1: 如果比之前找的还要长，肯定不是skyline地点，所以此时直接退出递归并记录
    if (typeof this.min_key_before[key] !== "undefined" && this.min_key_before[key] < level) {
      return MAX_NUM - 1; 
    }
    if (from.keys.includes(key)) {

      this.min_key_before[key] = level; // 记录最短路径
      return level;
    }

    let result = MAX_NUM;

    if (!from.visitied) {
      from.visitied = true;
      for (let i = 0; i <  from.nexts.length; i++) {
        const nextLevel = level + 1;
        const nextNode = this.nodes[from.nexts[i]];
        // 优化点2: 找到了就立马返回
        result = this.DFS(nextNode, key, nextLevel); 
        if (result !== MAX_NUM) break;
      }
    }

    return result;
  }
  /** 清理访问记录 */
  clearVisitied() {
    for (const name in this.nodes) {
      this.nodes[name].visitied = false;
    } 
  }
}

/** main函数 */
function main () {
/** 实例化参数 */
  console.log("---------题目1--------");
  const rdf = new RDF(edge_1, node_keywords_1);
  const start1 = Date.now();
  /**关键词集合 */
  const keys = ["scientific", "childhood"];
  keys.forEach((key: string) => {
    /** 对源点进行深度优先搜索 */
    for (let i = 0; i < rdf.source_nodes.length; i++) {
      // 每个源点遍历完都要清理一遍visited
      !!i && rdf.clearVisitied();
      const pname = rdf.source_nodes[i];
      const result = rdf.DFS(rdf.nodes[pname], key, 0);
      if (result === MAX_NUM) continue; // 没查到的就不输出
      if (result === MAX_NUM - 1) {
        continue;
      }
      console.log(`(dg(T${rdf.source_nodes[i]}, ${key})=`, result);
    }
  });

  const end1 = Date.now();
  console.log("问题1耗时: ", end1 - start1);
  console.log("---------题目2--------");
  const rdf2 = new RDF(edge_2, node_keywords_2);
  const start2 = Date.now();

  /**关键词集合 */
  const keys2 = ["8704841", "8762341"];
  let notSkylinePoint: string[] = []; // 源点不是skyline点的集合
  let skylinePoint: any = {} // 源点是skyline点的集合

  keys2.forEach((key: string) => {
    rdf2.source_nodes.forEach(point => {
      skylinePoint[point] = {...skylinePoint[point]};
    });
    /** 对源点进行深度优先搜索 */
    for (let i = 0; i < rdf2.source_nodes.length; i++) {
      const pname = rdf2.source_nodes[i];
      const pointResult = skylinePoint[pname];
      if (notSkylinePoint.includes(pname)) continue; // 如果在之前的运算中，已经证明了不是skyLine点，直接跳过
      !!i && rdf2.clearVisitied();
      const result = rdf2.DFS(rdf2.nodes[pname], key, 0);
      if (result === MAX_NUM) continue;
      if (result === MAX_NUM - 1) {
        notSkylinePoint.push(pname); 
        continue;
      }
      
      pointResult[key] = result;
      console.log(`(dg(T${pname}, ${key})=`, result);
    }
  });
  const end2 = Date.now();
  console.log("问题2源点 ", rdf2.source_nodes);

  console.log("问题2耗时: ", end2 - start2);
}
main();
