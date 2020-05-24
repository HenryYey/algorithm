/**
 * @feature 消消乐问题
 * @author hengye
 */
import { createBoard, isSame, handleSubside, change, writeToJson, handleResult } from "../util/index";

const scoreList: number[] = []; // 分数集合
const timeList: number[] = []; // 执行时间集合
const avgStepScore: any = {};

/**
 * main 主函数
 */
const main = () => {
  try {
    const board = createBoard(4, 4, 8);
    const directions = ["left", "right", "top", "bottom"];
    // 从下往上，一层层遍历
    for(let y = 0; y < board.length; y++) {
      let startTime = Date.now();
      let score = 0; // 得分
      let tempBoard = board.slice(0); // 深拷贝数组
      const row = tempBoard[y];
      for (let x = 0; x < row.length; x++) {
        // 可能产生连续塌陷
        while (isSame(tempBoard, x, y).isSubside) {
          score += handleSubside(tempBoard, isSame(tempBoard, x, y).PointList);
        }
        directions.forEach(direction => {
          // 从起始点开始连续交换
          score = change(tempBoard, x, y, direction, score, 0);
        });
        // 放入得分集合和时间集合
        scoreList.push(score);
        let endTime = Date.now();
        timeList.push(endTime - startTime);
      }
    }
    // 统计结果
    const result = handleResult(scoreList, timeList);
    // 将结果写入文件保存
    writeToJson("result", JSON.stringify(result));
  } catch (e) {
    console.log("【执行失败】", e);
  }
}

/** 执行主函数 */
main();
