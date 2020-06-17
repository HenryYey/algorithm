const fs = require("fs");
const path = "./xxx.txt"; // text文件的路径
const isExist = fs.existsSync(path); // 判断该文件是否存在
const data = isExist ? fs.readFileSync(path, "utf-8") : "";

/**
 * @param path 文件路径
 */
export function readFileToStr(path: string): string {
  const data = fs.readFileSync(path, "utf-8"); // 读取文件，转换为原始字符串
  return data;
}

/**
 * 预处理文件
 * 将文件转换成字符串数组，数组每个元素代表一行
 * @param str 文件转换的原始字符串
 */
export function preprocessedFile(str: string) {
  const result: any = {}; // key:value的map集合，key代表顶点元素标号，value代表该元素的顶点集合
  let vArray: string[] = [];
  // 根据换行符 分割成字符串数组
  vArray = str.split("\n");
  // 将点的关系放入数组中
  vArray.forEach((item: any) => {
    const sp = item.split(' '); // 每组按空格划分,sp[0]代表key，sp[1]代表与key连接的元素标号
    if (Object.keys(result).includes(sp[0])) {
      result[sp[0]].push(parseInt(sp[1])); // key存在的话就推入该元素的集合中
    } else { // 不存在则初始化一个数组
      result[sp[0]] = [parseInt(sp[1])]
    }

  })
  return result;
} 
/**
 * 获取测试数据文件信息
 */
export function getData () {
  let pathA = "E:/arithmetic/lab5-graph/util/data.txt";
  const fileA = readFileToStr(pathA);   
  const list = preprocessedFile(fileA);
  return list;
}