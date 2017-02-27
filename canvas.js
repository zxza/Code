var canvas = document.getElementById('canvas');

var cxt = canvas.getContext('2d');


//获取工具按钮的标签
var Brush = document.getElementById('means_brush');

var Eraser = document.getElementById('means_eraser');

var Paint = document.getElementById('means_paint');

var Straw = document.getElementById('means_straw');

var Text = document.getElementById('means_text');

var Magnifier = document.getElementById('means_magifier');

var Line =document.getElementById('shape_line');

var Arc = document.getElementById('shape_arc');

var Rect = document.getElementById('shape_rect');

var Poly = document.getElementById('shape_poly');

var ArcFill = document.getElementById('shape_arcfill');

var RectFill = document.getElementById('shape_rectfill');

var actions =[Brush,Eraser,Paint,Straw,Text,Magnifier,Line,Arc,Rect,Poly,ArcFill,RectFill];


//获取线宽按钮
var Line_1=document.getElementById('width_1');
var Line_3=document.getElementById('width_3');
var Line_5=document.getElementById('width_5');
var Line_8=document.getElementById('width_8');
//把4中线宽对象放到一个数组中
var widths=[Line_1,Line_3,Line_5,Line_8];


//获取颜色按钮
var ColorRed=document.getElementById('red');
var ColorGreen=document.getElementById('green');
var ColorBlue=document.getElementById('blue');
var ColorYellow=document.getElementById('yellow');
var ColorWhite=document.getElementById('white');
var ColorBlack=document.getElementById('black');
var ColorPink=document.getElementById('pink');
var ColorPurPle=document.getElementById('purple');
var ColorCyan=document.getElementById('cyan');
var ColorOrange=document.getElementById('orange');
//把10中颜色标签对象放到一个数组中
var colors=[ColorRed,ColorGreen,ColorBlue,ColorYellow,ColorWhite,ColorBlack,ColorPink,ColorPurPle,ColorCyan,ColorOrange];

//设置初始值  
	//默认选中画笔工具
	brush(0);
	//默认设置颜色
	setColor(ColorRed,0);
	//设置默认线宽
	setLineWidth(0);
//状态设置函数
function setStatus(Arr,num,type){
	for(var i=0;i<Arr.length;i++){
		//设置选中的标签改变CSS属性
		if(i==num){
			//设置改变CSS的样式是背景色还是边框
			if(type==1){
				Arr[i].style.background="yellow";
			}else{
				Arr[i].style.border="1px solid #fff";
			}
			
		}else{//设置未选中的组中的其他标签改变颜色
			if(type==1){
				Arr[i].style.background="#ccc";
			}else{
				Arr[i].style.border="1px solid #000";
			}
		}
	}

}

//设置图像功能函数  保存图片  清空画布
function saveimg(){
	var imageDate = canvas.toDataURL();
	var b64 = imageDate.substring(22);
	//alert(b64);
	//将form表单中的隐藏表单 赋值（值就是我们获取的b64）
	var data = document.getElementById('data');
	data.value = b64;
	//将表单提交到后台
	var form = document.getElementById('myform');
	form.submit();
}

//清空画布
function clearimg(){
	//画布清除方法
	cxt.clearRect(0,0,880,400);
}

//列出所有的按钮对应的函数

function brush(num){
	setStatus(actions,num,1);

	var flag = 0;//设置标志位-->检测鼠标是否按下

		//鼠标按下的时候 -->设置开始点
		canvas.onmousedown =function(evt){
			//获取当前鼠标相对于canvas起始点（0,0）的位置
				//获取鼠标相对于页面顶端的距离
					//整合鼠标事件（针对w3c和IE）
					evt = window.event||evt;
					//pageX,papgY  鼠标相对页面的横纵坐标
					//alert(evt.pageX +"--"+evt.pageY);
				//获取当前标签相对于页面顶端的距离
					//alert(this.offsetLeft+'--'+this.offsetTop);
				//鼠标相对于canvas0,0点的距离
			var startX = evt.pageX - this.offsetLeft;
			var startY = evt.pageY - this.offsetTop;
			cxt.beginPath();
			cxt.moveTo(startX,startY);
			flag=1;
		}

		//鼠标移动的时候 -->不停的绘图（获取鼠标的位置）
		canvas.onmousemove = function(evt){
			evt = window.event||evt;
			var endX = evt.pageX - this.offsetLeft;
			var endY = evt.pageY - this.offsetTop;
			//判断一下鼠标是否按下
			if(flag){
				cxt.lineTo(endX,endY);
				cxt.stroke();
			}
			//移动的时候设置路径并且画出来
			
		}

		//鼠标抬起的时候结束绘图
		canvas.onmouseup = function(){
			flag=0;
		}

		//鼠标移出的canvas的时候必须取消画图操作
		canvas.onmouseout = function(){
			flag=0;
		}
}

var eraserFlag = 0;//设置橡皮擦的状态标志位
function drawEraser(num){
	setStatus(actions,num,1);
	canvas.onmousedown = function(evt){
		evt = window.event || evt;
		var eraserX = evt.pageX - this.offsetLeft;
		var eraserY = evt.pageY - this.offsetTop;
		//canvas擦除方法 cxt.clearRect();
		cxt.clearRect(eraserX-cxt.lineWidth,eraserY-cxt.lineWidth,cxt.lineWidth*2,cxt.lineWidth*2);
		eraserFlag=1;
	}

	canvas.onmousemove = function(evt){
		evt = window.event || evt;
		var eraserX = evt.pageX - this.offsetLeft;
		var eraserY = evt.pageY - this.offsetTop;
		//擦除方法
		if(eraserFlag){//判断鼠标左键是否按下（按下的情况下拖动鼠标才能删除）
			cxt.clearRect(eraserX-cxt.lineWidth,eraserY-cxt.lineWidth,cxt.lineWidth*2,cxt.lineWidth*2);
		}
		
	}
	//抬起鼠标按键 清楚擦除的状态位 变成0
	canvas.onmouseup = function(){
		eraserFlag=0;
	}

	canvas.onmouseout = function(){
		eraserFlag=0;
	}
}

function drawPaint(num){
	setStatus(actions,num,1);
	canvas.onmousedown = function(){
		//把画布涂成指定的颜色,画一个填充颜色的矩形
		cxt.fillRect(0,0,880,400);
	}
	canvas.onmouseup = null;
	canvas.onmousemove = null;
	canvas.onmouseout = null;
}

function drawStraw(num){
	setStatus(actions,num,1);
	canvas.onmousedown = function(evt){
		evt = window.event || evt;
		var strawX = evt.pageX - this.offsetLeft;
		var strawY = evt.pageY - this.offsetTop;
		//获取该点坐标出的颜色信息
		//获取图像信息的方法getImageData(开始点X，开始点Y，宽度，高度);
		var obj=cxt.getImageData(strawX,strawY,1,1);
		var color = 'rgb('+obj.data[0]+','+obj.data[1]+','+obj.data[2]+')';
		//将吸管吸出的颜色设定到我们的应用中
		cxt.strokeStyle = color;
		cxt.fillStyle = color;
		brush(0);
	}
	//取消移动事件、鼠标抬起事件、鼠标移出事件
	canvas.onmousemove = null;
	canvas.onmouseout = null;
	canvas.onmouseup = null;

}

function drawText(num){
	setStatus(actions,num,1);
	canvas.onmousedown = function(evt){
		evt = window.event || evt;
		//获取鼠标点击时的位置
		var textX = evt.pageX - this.offsetLeft;
		var textY = evt.pageY - this.offsetTop;
		//获取用户输入的信息
		var userVal = window.prompt('请在这里输入文字','');
		//将用户输入的文字写到画布中对应的坐标点上
		if(userVal!=null){
			cxt.fillText(userVal,textX,textY);
		}
		
	}
	canvas.onmousemove = null;
	canvas.onmouseup = null;
	canvas.onmouseout = null;
}

function drawMagnifier(num){
	setStatus(actions,num,1);
	//用户输入的数据大小
	var scale = window.prompt('请输入要放大的百分比【只能是整数】','');
	//把数据转成对应canvas画布的大小
	var scaleW = 880*scale/100;
	var scaleH = 400*scale/100;
	//将数据设置到对应HTML标签上
	canvas.style.width = parseInt(scaleW) +'px';
	canvas.style.height =  parseInt(scaleH) +'px';
	canvas.onmousedown = null;
	canvas.onmousemove = null;
	canvas.onmouseup = null;
	canvas.onmouseout = null;
}

function drawLine(num){
	setStatus(actions,num,1);
	canvas.onmousedown = function(evt){
		evt = window.event || evt;
		var startX = evt.pageX - this.offsetLeft;
		var startY = evt.pageY - this.offsetTop;
		cxt.beginPath();
		cxt.moveTo(startX,startY);
	}
	//注销掉其他工具注册时间
	canvas.onmousemove = null;//
	canvas.onmouseout = null;//
	//鼠标按键抬起来的时候
	canvas.onmouseup = function(evt){
		evt = window.event || evt;
		//计算鼠标抬起时鼠标相对于画布的左边
		var endX = evt.pageX - this.offsetLeft;
		var endY = evt.pageY - this.offsetTop;
		//设置路径把开始点和结束点连接起来，然后进行绘图
		cxt.lineTo(endX,endY);
		cxt.closePath();
		cxt.stroke();
	}

}

var arcX = 0;
var arcY = 0;
//圆形形状函数
function drawArc(num){
	setStatus(actions,num,1);
	canvas.onmousedown = function(evt){
		evt = window.event || evt;
		//获取圆心的位置
		arcX = evt.pageX - this.offsetLeft;
		arcY = evt.pageY - this.offsetTop;

	};

	canvas.onmouseup = function(evt){
		evt = window.event || evt;
		//获取圆心半径
		//实际获取的是一个坐标
		var endX = evt.pageX - this.offsetLeft;
		var endY = evt.pageY - this.offsetTop;
		//计算C的距离
		var a = endX - arcX;
		var b = endY - arcY;
		var c = Math.sqrt(a*a+b*b);
		cxt.beginPath();
		cxt.arc(arcX,arcY,c,0,360,false);
		cxt.closePath();
		cxt.stroke();
		
	};

	canvas.onmousemove = null;//注销掉鼠标移动事件
	canvas.onmouseout = null;
}

var rectX = 0;
var rectY = 0;
//矩形形状函数
function drawRect(num){
	setStatus(actions,num,1);
	canvas.onmousedown = function(evt){
		//获取矩形左上角坐标（对角线的开始点）
		evt = window.event || evt;
		rectX = evt.pageX - this.offsetLeft;
		rectY = evt.pageY - this.offsetTop;
		
	}

	canvas.onmouseup = function(evt){
		evt = window.event || evt;
		endX = evt.pageX - this.offsetLeft;
		endY = evt.pageY - this.offsetTop;
		//计算出矩形的宽和高
		var rectW = endX - rectX;
		var rectH = endY - rectY;
		cxt.strokeRect(rectX,rectY,rectW,rectH);

	}

	canvas.onmousemove = null;
	canvas.onmouseout = null;
}

var PolyX = 0;
var PolyY = 0;
function drawPoly(num){
	setStatus(actions,num,1);
	canvas.onmousedown = function(evt){
		evt = window.event || evt;
		PolyX = evt.pageX - this.offsetLeft;
		PolyY = evt.pageY - this.offsetTop;
	}
	canvas.onmouseup = function(evt){
		evt = window.event || evt;
		var endX = evt.pageX - this.offsetLeft;
		var endY = evt.pageY - this.offsetTop;
		//将画笔移动到右下角的顶点
		cxt.beginPath();
		cxt.moveTo(endX,endY);
		//计算左下角的顶点坐标
		var lbX = 2*PolyX - endX;
		var lbY = endY; 
		cxt.lineTo(lbX,lbY);
		//设置第三个顶点的坐标
		var tmpC = 2*(endX-PolyX);
		var tmpA = endX - PolyX;
		var tmpB = Math.sqrt(tmpC*tmpC-tmpA*tmpA);
		//计算最上面顶点坐标
		cxt.lineTo(PolyX,endY-tmpB);
		cxt.closePath();
		cxt.stroke();
		
	}
	canvas.onmouseout = null;
	canvas.onmousemove  = null;
}

function drawArcFill(num){
	setStatus(actions,num,1);
	canvas.onmousedown = function(evt){
		evt = window.event || evt;
		//获取圆心的位置
		arcX = evt.pageX - this.offsetLeft;
		arcY = evt.pageY - this.offsetTop;

	};

	canvas.onmouseup = function(evt){
		evt = window.event || evt;
		//获取圆心半径
		//实际获取的是一个坐标
		var endX = evt.pageX - this.offsetLeft;
		var endY = evt.pageY - this.offsetTop;
		//计算C的距离
		var a = endX - arcX;
		var b = endY - arcY;
		var c = Math.sqrt(a*a+b*b);
		cxt.beginPath();
		cxt.arc(arcX,arcY,c,0,360,false);
		cxt.closePath();
		cxt.fill();
		
	};

	canvas.onmousemove = null;//注销掉鼠标移动事件
	canvas.onmouseout = null;
}

function drawBrush(num){
	setStatus(actions,num,1);
}

function drawRectFill(num){
	setStatus(actions,num,1);
	canvas.onmousedown = function(evt){
		//获取矩形左上角坐标（对角线的开始点）
		evt = window.event || evt;
		rectX = evt.pageX - this.offsetLeft;
		rectY = evt.pageY - this.offsetTop;
		
	}

	canvas.onmouseup = function(evt){
		evt = window.event || evt;
		endX = evt.pageX - this.offsetLeft;
		endY = evt.pageY - this.offsetTop;
		//计算出矩形的宽和高
		var rectW = endX - rectX;
		var rectH = endY - rectY;
		cxt.fillRect(rectX,rectY,rectW,rectH);

	}

	canvas.onmousemove = null;
	canvas.onmouseout = null;
}

//线宽设置函数
function setLineWidth(num){
	setStatus(widths,num,1);
	switch(num){
		case 0:
			cxt.lineWidth=1;
			break;
		case 1:
			cxt.lineWidth=3;
			break;
		case 2:
			cxt.lineWidth=5;
			break;
		case 3:
			cxt.lineWidth=8;
			break;
		default:
			cxt.lineWidth=1;
	}
}

//颜色设置函数
function setColor(obj,num){
	setStatus(colors,num,0);
	//设置画笔颜色，填充颜色
	cxt.strokeStyle = obj.id;
	cxt.fillStyle = obj.id;
}

