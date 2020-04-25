/**
 * 分治法
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
// 根据x坐标从小到大排序
function sortBy_x(point1: Point, point2: Point) 
{
	if (point1.x === point2.x)
		return point1.y - point2.y;
	return point1.x - point2.x;
}
// 根据纵坐标从小到大排序
function sortBy_y(point1: Point, point2: Point)    
{
	return point1.y - point2.y;
}
// 获取两点距离
function getDistance(point1: Point, point2: Point)
{
	const xDistance = point1.x - point2.x;
	const yDistance = point1.y - point2.y;
	return Math.sqrt(xDistance * xDistance + yDistance * yDistance);
}
function getMin(vec: Array<any>, low: number, high: number)
{
	if (high - low === 1) //2个结点
	{
		return getDistance(vec[low], vec[high]);
	}	
	else if (high - low === 2)  //3个结点
	{
		const dist1= getDistance(vec[low], vec[low + 1]);
		const dist2 = getDistance(vec[low], vec[low + 2]);
		const dist3 = getDistance(vec[low+1], vec[low + 2]);
		return Math.min(Math.min(dist1, dist2), dist3);
	}
	else
	{
		const mid = Math.floor( (low + high) / 2);
		const left_min = getMin(vec, low, mid);
		const right_min = getMin(vec, mid + 1, high);
		let d = Math.min(left_min, right_min);
		const res = [];
		
		let i, j, k = 0;
		for (i = low; i <= high; i++)        //遍历一遍数组，得到与横坐标与  中点横坐标距离在d以内的点
		{
			if (Math.abs(vec[i].x - vec[mid].x) < d) res.push(vec[i]);
		}
		res.sort(sortBy_y);      // 根据纵坐标从小到大排序
		for (i = 0; i < res.length - 1; i++)
		{
			for (j = i + 1; j < i + 1 + 6 && j < res.length; j++)  //求距离的点 为与i纵坐标的距离在d以内
			{
				if (res[j].y - res[i].y >= d)
					break;
				const tempD  = getDistance(res[i], res[j]);
				if (tempD  < d)
				{
					d = tempD ;
				}
			}
		}
		return d;
	}
}

// 执行主函数
exports.mergeMain = (data: Array<Point>) => {
  let len = data.length;
  let startTime: Date = new Date();

  // 执行函数
  data.sort(sortBy_x);      // 根据横坐标从小到大排序
  const dis = getMin(data, 0, len - 1);
  let endTime: Date = new Date();

  const dataResult: any = {
    len,
    time: endTime.getTime() - startTime.getTime(),
    minDistance: dis
  }
  return dataResult;
}

