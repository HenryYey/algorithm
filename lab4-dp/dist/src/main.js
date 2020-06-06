"use strict";
exports.__esModule = true;
/**
 * @feature 动态规划求解代码查重
 * @author hengye
 */
var fs = require("fs");
var path = "./xxx.txt"; // text文件的路径
var isExist = fs.existsSync(path); // 判断该文件是否存在
var data = isExist ? fs.readFileSync(path, "utf-8") : "";
/**
 * @param path 文件路径
 */
function readFileToStr(path) {
    var data = fs.readFileSync(path, "utf-8"); // 读取文件，转换为原始字符串
    return data;
}
exports.readFileToStr = readFileToStr;
/**
 * 预处理文件
 * 将文件转换成字符串数组，数组每个元素代表一行
 * @param str 文件转换的原始字符串
 */
function preprocessedFile(str) {
    var fileStr = [];
    // 根据换行符 分割成字符串数组
    fileStr = str.split("\r\n");
    // 处理每个字符串，过滤掉注释和前后空格
    console.log(fileStr);
    return fileStr;
}
exports.preprocessedFile = preprocessedFile;
/**
 * 预处理字符串
 * 删除每个字符串的前后空格、注释
 * @param str 文件转换的原始字符串
 */
function preprocessedStr(str) {
    str = str.trim(); // 过滤掉前后空格
    for (var i = 0; i < str.length - 1; i++) {
        if (str[i] === "/" && str[i + 1] === "/") {
            var end = i;
            return str.substring(0, end); // 后面的截断
        }
    }
}
exports.preprocessedStr = preprocessedStr;
/**
 * 求出代码行A(i)和B(j)的最长相同子模块, 结果存储在一个二维数组里
 * @param str1 代码行1 A(i)
 * @param str2 代码行2 B(j)
 */
function LSC(str1, str2) {
    var dp = [];
    for (var i = 0; i < str1.length; i++) {
        for (var j = 0; j < str2.length; j++) {
            dp[i][j] = 0;
        }
    }
    for (var i = 0; i < str1.length; i++) {
        for (var j = 0; j < str2.length; j++) {
            if (str1[i] === str2[j])
                dp[i + 1][j + 1] = dp[i][j] + 1;
            else
                dp[i + 1][j + 1] = Math.max(dp[i][j + 1], dp[i + 1][j]);
        }
    }
    var max = 0;
    dp.forEach(function (dp2) {
        max = Math.max(max, Math.max.apply(Math, dp2)); // 将max和每行的每个元素做对比，选出最大的数
    });
    // 返回最大相同子模块值
    return Math.max(max);
}
exports.LSC = LSC;
/**
 * 求出S(i, j)
 * 公式： S(i, j) = LCS(A(i), B(j)) / min(Len(A), Len(B))
 * @param strList1 文件1的字符串数组
 * @param strList2 文件2的字符串数组
 */
function getS(strList1, strList2) {
    console.log("fuck", strList1, strList2);
    var S = [];
    for (var i = 0; i < strList1.length; i++) {
        for (var j = 0; j < strList2.length; j++) {
            S[i][j] = 0;
        }
    }
    for (var i = 0; i < strList1.length; i++) {
        for (var j = 0; j < strList2.length; j++) {
            var str1 = preprocessedStr(strList1[i]);
            var str2 = preprocessedStr(strList2[i]);
            S[i][j] = LSC(str1, str2) / Math.min(strList1.length, strList2.length);
        }
    }
    // 返回二维数组S
    return S;
}
exports.getS = getS;
/**
 * 获得相同子代码行数矩阵， getS的值超过阈值r则为1，否则为0
 * = 1表示文件B的第j行与文件A的第i行代码重复
 * @param strList1 文件1字符串数组
 * @param strList2 文件2字符串数组
 */
function getD(strList1, strList2, r) {
    var D = [];
    var S = getS(strList1, strList2); // 获取S
    for (var i = 0; i < strList1.length; i++) {
        for (var j = 0; j < strList2.length; j++) {
            if (S[i][j] >= r)
                D[i][j] = 1;
            else
                D[i][j] = 0;
        }
    }
    // 返回相同子代码行数矩阵
    return D;
}
exports.getD = getD;
/**
 * 得出最多代码重复行数
 * @param D 相同代码行数矩阵
 */
function getResult(D) {
    var max = 0;
    D.forEach(function (D2) {
        max = Math.max(max, Math.max.apply(Math, D2)); // 将max和每行的每个元素做对比，选出最大的数
    });
    return max;
}
exports.getResult = getResult;
/**
 * 每行变量代换
 */
function exchange(str) {
    var jsWords = ["var", "let", "const", "console.log"];
    var words = /\b(?!\d)[_0-9a-zA-Z]*\b/.exec(str); // 匹配该行包含的变量名
    for (var i = 0; i < words.length; i++) {
        // 如果该变量不是关键字， 则将名字全部替换为 a， 以做变量代换
        if (!jsWords.includes(words[i])) {
            str = str.replace(words[i], "a");
        }
    }
    return str;
}
exports.exchange = exchange;
/**
 * main 主函数
 */
var main = function () {
    try {
        var pathA = "E:/arithmetic/lab4-dp/util/A.js";
        var pathB = "E:/arithmetic/lab4-dp/util/A.js";
        var fileA = readFileToStr(pathA);
        var fileB = readFileToStr(pathB);
        var strList1 = preprocessedFile(fileA);
        var strList2 = preprocessedFile(fileB);
        var r = 0.88; // 阈值为0.88
        var result1 = getResult(getD(strList1, strList2, r));
        for (var i = 0; i < strList1.length; i++) {
            strList1[i] = exchange(strList1[i]);
        }
        for (var i = 0; i < strList2.length; i++) {
            strList2[i] = exchange(strList2[i]);
        }
        // 经过变量代换后的结果
        var result2 = getResult(getD(strList1, strList2, r));
        // const result = handleResult(scoreList, timeList);
        // // 将结果写入文件保存
        console.log("文件A与B的最多代码重复行数是", result1);
        console.log("文件A与B经过变量代换后，的最多代码重复行数是", result1);
    }
    catch (e) {
        console.log("【执行失败】", e);
    }
};
/** 执行主函数 */
main();
//# sourceMappingURL=main.js.map