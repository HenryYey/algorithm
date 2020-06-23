// 每个顶点的邻接顶点,有向图的出边
export interface Edge {
  [props: string]: string;
}
export const edge_1: Edge = {
  p1: "v1,v7",
  p2: "v17,v15",
  p3: "v17,v18",
  v1: "v2",
  v2: "v3",
  v3: "v4",
  v4: "v5",
  v5: "v6",
  v7: "v8",
  v8: "v9",
  v9: "v10",
  v10: "v11",
  v11: "v12",
  v12: "v13",
  v13: "v14",
  v15: "v16",
  v18: "v19",
  v19: "v20",
  v20: "v21"
}