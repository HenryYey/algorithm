/**
 * 蛮力法
 */
interface Point {
  x: number,
  y: number
}
interface MinPoint {
  x1: number,
  y1: number,
  x2: number,
  y2: number
}
interface Result {
  len: number,
  time: number,
  minPoint: MinPoint,
  minDistance: number
}

// 穷举法计算最近两点
const exhaustivity = (dataSource: Array<Point>) => {
  let minPoint: MinPoint = {
    x1: -1,
    x2: -1,
    y1: -1,
    y2: -1
  };
  let minDistance = dataSource.length * dataSource.length; // 定义最短距离，初始化为最大值
  for(let i = 0; i < dataSource.length - 1; i++) {
    for(let j = i + 1; j < dataSource.length; j++) {
      // 根据勾股定理计算两者距离
      const xDistance = Math.abs(dataSource[i].x - dataSource[j].x); // 计算两点x绝对值
      const yDistance = Math.abs(dataSource[i].y - dataSource[j].y); // 计算两点y绝对值
      const r = Math.sqrt(xDistance * xDistance + yDistance * yDistance); // 计算两点距离

      if (r < minDistance) {
        // 记录该点
        minPoint.x1 = dataSource[i].x;
        minPoint.x2 = dataSource[j].x;
        minPoint.y1 = dataSource[i].y;
        minPoint.y2 = dataSource[j].y;
        minDistance = r;
      }
    }
  }
  return {
    minPoint,
    minDistance
  }
}

// 执行主函数
exports.exhaustivityMain = (data: Array<Point>) => {
  let len = data.length;
  let startTime: Date = new Date();

  // 执行函数
  const result = exhaustivity(data);
  let endTime: Date = new Date();

  const dataResult: Result = {
    len,
    time: endTime.getTime() - startTime.getTime(),
    minPoint: result.minPoint,
    minDistance: result.minDistance
  }
  return dataResult;
}

