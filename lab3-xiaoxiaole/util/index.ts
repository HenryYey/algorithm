// https://www.npmjs.com/package/random-seed
const fs = require("fs");
const rand = require('random-seed').create();

export interface Point {
  x: number;
  y: number;
}

export const writeToJson = (fileName: string, data: any) => {
  fs.writeFile("../../result/" + fileName, data, "utf8", function(err: any) {
    //如果err=null，表示文件使用成功，否则，表示希尔文件失败
    if(err)
      console.log("写文件出错了，错误是：" + err);
    else
      console.log("done");
  });
}
/**
 * 生成二维棋盘，行代表X轴，列代表Y轴
 * @param K 方块种类， 以整数替代,-1表示该方块没有棋子
 * @param M 行
 * @param N 列
 */
export const createBoard = (K: number, M: number, N: number) => {
  const board = []; // 最终棋盘
  for (let i = 0; i < M; i++) {
    const arr = []; // 一维数组 代表这一层的棋子
    for (let j = 0; j < N; j++) {
      const qizi = Math.floor(Math.random() * K); // 生成范围 0 - K 的整数
      arr.push(qizi);
    }
    board.push(arr);
  }
  // 棋盘
  console.log("-------生成棋盘----------");
  board.forEach(item => {
    console.log(item);
  });
  return board;
}
/**
 * 执行塌陷逻辑,返回塌陷后的棋盘
 * @param board 棋盘
 * @param pointList 被消去的点的集合
 */
export const handleSubside = (board: Array<number[]>, pointList: Array<Point>) => {
  let score = 0;

  const xList: Array<number> = []; // x集合, 塌陷x范围 
  pointList.forEach(point => {
    if (!xList.includes(point.x)) xList.push(point.x);
  });
  score += xList.length ;

    // 取出消去的x集合,对该x上方的点都下榻
  xList.forEach(x => {
    let yMax = 0; // 当前被消去的y的最大值
    let yMin = 0; // 当前被消去的y的最小值
    pointList.forEach(point => {
      if (point.x === x) {
        if (point.y > yMax) yMax = point.y;
        if (point.y < yMin) yMin = point.y;
      }
    });
    // 下沉yMax - yMin个格子
  score += yMax - yMin;
  for(let i = 0; i < yMax - yMin; i++)
    {
      board[x][yMin + i] = board[x][yMax + i];
    }
    for(let i = 0; i < board.length - yMax; i++)
    {
      board[x][yMax + i] = -1; // -1表示该方块没有棋子
    }
      
  });
  return score;
}

/**
 * 交换棋子, 返回交换后的棋盘 
 * @param board 棋盘
 * @param x x坐标
 * @param y 坐标
 * @param side 方向
 * @param score 得分
 * @param avgStepScore 当前步均分
 * @param X 当前步数
 */
export const change = (board: Array<number[]>, x: number, y: number, side: string, score: number, X?: number, avgStepScore?: any) => {
  const directions = ["left", "right", "top", "bottom"];
  let flag = false;
  switch(side) {
    case "top": {
      if(y >= board.length - 1 && board[x][y + 1] != -1) break // 已无棋子交换或已在最顶层,直接返回棋盘
      const temp = board[x][y];
      board[x][y] = board[x][y + 1];
      board[x][y + 1] = temp;
      y++;
      flag = true;
      break
    }
    case "bottom": {
      if(y <= 0 && board[x][y - 1] != -1) break // 已无棋子交换或已在最底层,直接返回棋盘
      const temp = board[x][y];
      board[x][y] = board[x][y - 1];
      board[x][y - 1] = temp;
      y--;
      flag = true;
      break
    }
    case "left": {
      if(x <= 0 && board[x - 1][y] != -1) break // 已无棋子交换或已在最左,直接返回棋盘
      const temp = board[x][y];
      board[x][y] = board[x - 1][y];
      board[x - 1][y] = temp;
      flag = true;
      x--;
      break;
    }
    case "right": {
      if(y >= board.length - 1 && board[x + 1][y] != -1) break // 已无棋子交换或已在最右, 直接返回棋盘
      const temp = board[x][y];
      board[x][y] = board[x + 1][y];
      board[x + 1][y] = temp;
      x++;
      flag = true;
      break;
    }
  }
  if (!flag) return; // 表示没有变化，则不往下递归

  while (isSame(board, x, y).isSubside) {
    score += handleSubside(board, isSame(board, x, y).PointList);
  }

  /** 剪枝逻辑 */
  if(avgStepScore && isPruning(avgStepScore, X, score)) return;
  // 递归交换棋子
  directions.forEach(direction => {
    score = change(board, x, y, direction, score, X, avgStepScore);
  });

  return score;
}
/**
 * 剪枝逻辑
 */
export function isPruning(avgScore: any, X: number, score: number) {
  if (avgScore[X] >= score)
    return true;
  return false;
}
/**
 * 判断(x, y)点周围是否有相同的棋子,三个以上就可以消去
 * @param board 棋盘
 * @param x 当前棋子x轴坐标
 * @param y 当前棋子y轴坐标
 */
export const isSame = (board: Array<number[]>, x: number, y: number) => {
  let flag = 1; // 目前与该棋子相同的个数, 从1开始
  let kind = board[x][y]; // 该棋子的种类
  const PointList: Array<Point> = [];
  /** 从上到下,从左到右, 循环判断如果相同, 则压入点集合, 不相同则退出循环 */
  let xFlag1 = x;
  let yFlag1 = y;
  while(yFlag1 <= board.length && board[x][++yFlag1] === kind) {
    flag++;
    PointList.push({
      x: x,
      y: yFlag1
    });
  }
  let yFlag2 = y;
  while(yFlag2 >= 0 && board[x][--yFlag2] === kind) {
    flag++;
    PointList.push({
      x: x,
      y: yFlag2
    });
  }
  while(xFlag1 <= board[xFlag1].length && board[--xFlag1][y] === kind) {
    flag++;
    PointList.push({
      x: xFlag1,
      y: y
    });
  }
  let xFlag2 = x;
  while(xFlag2 >= 0 && board[++xFlag2][y] === kind) {
    flag++;
    PointList.push({
      x: xFlag2,
      y: y
    });
  }
  if (flag < 3) 
    return {
      isSubside: false // 少于三个，表示不消去
    }
  return {
    isSubside: true, // 表示消去
    PointList // 消去的点集合
  }
}

  /** 统计结果， 返回平均用时和平均得分 */
  export function handleResult(scoreList: number[], timeList: number []) {
  let total = 0;
  scoreList.forEach(score => {
    total += score;
  });
  const avgScore = Math.round(total * 100) / scoreList.length* 100; // 结果保留两位小数
  total = 0;
  timeList.forEach(time => {
    total += time;
  });
  const avgTime = Math.round(total * 100) / timeList.length* 100; // 结果保留两位小数
  return {
    avgScore,
    avgTime
  }
}