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
export function preprocessedFile(str: string): string[] {
  let fileStr: string[] = [];
  // 根据换行符 分割成字符串数组
  fileStr = str.split("\r\n");
  // 处理每个字符串，过滤掉注释和前后空格

  console.log(fileStr);
  return fileStr;
} 
/**
 * 预处理字符串
 * 删除每个字符串的前后空格、注释
 * @param str 文件转换的原始字符串
 */
export function preprocessedStr(str: string) {
  str = str.trim(); // 过滤掉前后空格
  for (let i = 0; i < str.length - 1; i++) {
    if (str[i] === "/" && str[i + 1] === "/") {
      let end = i;
      return str.substring(0, end); // 后面的截断
    }
  }
}
/**
 * 求出代码行A(i)和B(j)的最长相同子模块, 结果存储在一个二维数组里
 * @param str1 代码行1 A(i)
 * @param str2 代码行2 B(j)
 */
export function LSC(str1: string, str2: string): number {
  const dp: number[][] = [];

  for (let i = 0; i < str1.length; i++) {
    for (let j = 0; j < str2.length; j++) {
      if (str1[i] === str2[j])
        dp[i + 1][j + 1] = dp[i][j] + 1;
      else 
        dp[i + 1][j + 1] = Math.max(dp[i][j + 1], dp[i + 1][j]);
    }
  }

  let max = 0;
  dp.forEach(dp2 => {
    max = Math.max(max, Math.max(...dp2)); // 将max和每行的每个元素做对比，选出最大的数
  });

  // 返回最大相同子模块值
  return Math.max(max);
}

/**
 * 求出S(i, j)
 * 公式： S(i, j) = LCS(A(i), B(j)) / min(Len(A), Len(B))
 * @param strList1 文件1的字符串数组
 * @param strList2 文件2的字符串数组
 */
export function getS(strList1: string[], strList2: string[]) {
  let S: number[][] = [];
  for (let i = 0; i < strList1.length; i++) {
    for (let j = 0; j < strList2.length; j++) {
      const str1 = preprocessedStr(strList1[i]);
      const str2 = preprocessedStr(strList2[i]);
      S[i][j] = LSC(str1[i], str2[j]) / Math.min(strList1.length, strList2.length);
    }
  }

  // 返回二维数组S
  return S;
}
/**
 * 获得相同子代码行数矩阵， getS的值超过阈值r则为1，否则为0
 * = 1表示文件B的第j行与文件A的第i行代码重复
 * @param strList1 文件1字符串数组
 * @param strList2 文件2字符串数组
 */
export function getD(strList1: string[], strList2: string[], r: number): number[][] {
  let D: number[][] = [];
  const S = getS(strList1, strList2); // 获取S
  for (let i = 0; i < strList1.length; i++) {
    for (let j = 0; j < strList2.length; j++) {
      if (S[i][j] >= r) D[i][j] = 1;
      else D[i][j] = 0;
    }
  }

  // 返回相同子代码行数矩阵
  return D;
}
/**
 * 得出最多代码重复行数
 * @param D 相同代码行数矩阵
 */
export function getResult(D: number[][]): number {
  let max = 0;
  D.forEach(D2 => {
    max = Math.max(max, Math.max(...D2)); // 将max和每行的每个元素做对比，选出最大的数
  });
  return max;
}

/**
 * 每行变量代换
 */
export function exchange(str: string) {
  const jsWords = ["var", "let", "const", "console.log"];
  const words = /\b(?!\d)[_0-9a-zA-Z]*\b/.exec(str); // 匹配该行包含的变量名

  for (let i = 0; i < words.length; i++) {
    // 如果该变量不是关键字， 则将名字全部替换为 a， 以做变量代换
    if (!jsWords.includes(words[i])) {
      str = str.replace(words[i], "a");
    }
  }
}