/**
 * 最大流值班问题
 * @author hengye
 */

/** 边 */
export class Edge {
  /** 容量 */
  size: number

  /** 该边的源节点 */
  from: Node

  /** 该边的目的节点 */
  to: Node

  /** 构造一条流网络的边 */
  constructor (from: Node, to: Node, size: number) {
    this.from = from
    this.to = to
    this.size = size
  }
}

/** 节点 */
export class Node {
  /** 节点序号 */
  index: any

  /** 是否为汇点 */
  end: boolean

  /** 该节点的边集合 */
  edges: Map<Node, Edge> = new Map()

  /** 构造一个新的节点 */
  constructor (index: any, end: boolean = false) {
    this.index = index
    this.end = end
  }

  /** 在流网络中新建一条边（同时建立反向空边） */
  createEdge (to: Node, size: number) {
    this.edges.set(to, new Edge(this, to, size))
    to.edges.set(this, new Edge(to, this, 0))
  }

  /** 调整流大小， 减去增广路径最小容量delta */
  handleFlow (to: Node, delta: number) {
    this.edges.get(to).size -= delta
    to.edges.get(this).size += delta
  }

  /** 使用bfs(广度优先搜索)找一条到汇点的增广路径 */
  BFS () {
    // 构建节点队列
    const queue: Node[][] = [...this.edges]
      .filter(([node, edge]) => edge.size > 0)
      .map(([node, edge]) => [this, edge.to])

    while (queue.length > 0) {
      const path = queue.shift(); // 取出队头
      const last = path[path.length - 1] // 取出队尾 
      if (last.end) return path; // 如果是汇点则返回路径

      for (const [node, edge] of last.edges) {
        if (edge.size !== 0 && !path.includes(edge.to))

        queue.push([...path, edge.to])
      }
    }

    return null
  }
}

/** Ford-Fulkerson 方法计算最大流 */
function FordFulkerson (data: number[][]) {
  /** 建立流网络 */
  const length = data.length
  // 根据data数据创建节点对象
  const nodes = data.map((value, i) => new Node(i, i === length - 1))

  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length; j++) {
      if (data[i][j]) {
        nodes[i].createEdge(nodes[j], data[i][j])
      }
    }
  }
  // 原点和汇点
  const root = nodes[0]
  const end = nodes[length - 1]
  
  // 循环获取增广路径
  let path: Node[];
  while (path = root.BFS()) {
    // 生成路径,每个元素由两个节点组成，(from, to)
    let pathTuples = [];
    for (let i = 0; i < path.length - 1; i++) {
      pathTuples.push([path[i], path[i + 1]]);
    }

    // 计算增广路径中的最小容量
    let capacities: number[] = [];
    pathTuples.forEach((pathTuple: Node[]) => {
      let from = pathTuple[0];
      let to = pathTuple[1];
      capacities.push(from.edges.get(to).size);
    })

    const min = Math.min(...capacities)

    // 调整残余网络
    for (const pathTuple of pathTuples) {
      pathTuple[0].handleFlow(pathTuple[1], min)
    }
  }

  // 当没有更多的增广路径时，计算汇点的所有出边的流量和，即最大流
  let sum = 0;

  end.edges.forEach(edge => {
    if (edge.size > 0) {
      sum += edge.size;
    }
  })

  return sum
}

/** main函数 */
function main () {
/** 实例化参数 */
  // 假日共total天
  const total = 5;

  // 定义网络流, 排版方案
  const data = [
    [0, 2, 2, 2, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 0],
    [0, 0, 0, 0, 1, 1, 0],
    [0, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 2],
    [0, 0, 0, 0, 0, 0, 3],
    [0, 0, 0, 0, 0, 0, 0]
  ]

  const result = FordFulkerson(data);

  // 排班结果需要满5天

  if (result === total) {
    console.log("排班成功, 排班方案为: ", data);
  } else {
    console.log(`排班失败，应排${total}天班，实排${result}天班`);
  }
}
main();