/**
 * 点的数据结构
 */

 export interface Vertex {
   visitied: boolean; // 顶点是否被访问过
   next: number[] // 连接的顶点的下标集合
 }
 // 边
 export interface Edge {
  index: number; // 下标
  isCycle: boolean; // 是否是环边
  visitied: boolean; // 顶点是否被访问过
}
// 并查集每个顶点的数据结构
export interface Union {
  [props: number]: { // 顶点下标
    root: number;
    edge: Edge[]; // 连接的边集合
  }
}