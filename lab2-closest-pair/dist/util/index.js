// https://www.npmjs.com/package/random-seed
var fs = require("fs");
var rand = require('random-seed').create();
module.exports = {
    writeToJson: function (fileName, data) {
        fs.writeFile("../../result/" + fileName, data, "utf8", function (err) {
            //如果err=null，表示文件使用成功，否则，表示希尔文件失败
            if (err)
                console.log("写文件出错了，错误是：" + err);
            else
                console.log("done");
        });
    },
    randomArray: function (n) {
        var points = [];
        for (var i = 0; i < n; i++) {
            var x = Math.random() * n; // 可随机获取 0 到 n-1 的随机整数。
            var y = Math.random() * n; // 可随机获取 0 到 n-1 的随机整数。
            // 取小数点后4位作为坐标，做到完全随机
            var xStr = x.toFixed(4).toString();
            var yStr = y.toFixed(4).toString();
            var str1 = xStr.split(".")[1];
            var str2 = yStr.split(".")[1];
            x = parseFloat(str1);
            y = parseFloat(str2);
            var point = {
                x: x,
                y: y // y轴坐标
            };
            points.push(point);
        }
        return points;
    }
};
//# sourceMappingURL=index.js.map