/*!
 * 核心工具类
 */

//***************************************************************************************//
//*************************************处理字符串方法*************************************//
//***************************************************************************************//

/**
 * 字符串循环复制 (str->字符串, count->次数)
 */
function repeatStr(str, count) {
	return str.repeat(count);
}

/**
 * 字符串替换(字符串,要替换的字符或者正则表达式（不要写g）,替换成什么)
 * ecDo.replaceAll('这里是上海，中国第三大城市，广东省省会，简称穗，','上海','广州')
 * result："这里是广州，中国第三大城市，广东省省会，简称穗，"
 */
function replaceAll(str, AFindText, ARepText) {
	let raRegExp = new RegExp(AFindText, "g");
	return str.replace(raRegExp, ARepText);
}

/**
 * 去除空格  type 1-所有空格  2-前后空格  3-前空格 4-后空格
 * trim('  1235asd',1)
 * result：1235asd
 */
function trim(str, type) {
	if (Object.prototype.toString.call(str) !== "[object String]") {
		return str;
	}
	if (str) {
		switch (type) {
			case 1:
				return str.replace(/\s+/g, "");
			case 2:
				return str.replace(/(^\s*)|(\s*$)/g, "");
			case 3:
				return str.replace(/(^\s*)/g, "");
			case 4:
				return str.replace(/(\s*$)/g, "");
			default:
				return str;
		}
	} else {
		return '';
	}
}

/**
 * 现金额大写转换函数
 * upDigit(168752632)
 * result："人民币壹亿陆仟捌佰柒拾伍万贰仟陆佰叁拾贰元整"
 * upDigit(1682)
 * result："人民币壹仟陆佰捌拾贰元整"
 * upDigit(-1693)
 * result："欠人民币壹仟陆佰玖拾叁元整"
 */
function upDigit(n) {
	var fraction = ['角', '分', '厘'];
	var digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
	var unit = [
		['元', '万', '亿'],
		['', '拾', '佰', '仟']
	];
	var head = ''//n < 0 ? '欠人民币' : '人民币';
	n = Math.abs(n);
	var s = '';
	for (var i = 0; i < fraction.length; i++) {
		s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
	}
	s = s || '整';
	n = Math.floor(n);
	for (var i = 0; i < unit[0].length && n > 0; i++) {
		var p = '';
		for (var j = 0; j < unit[1].length && n > 0; j++) {
			p = digit[n % 10] + unit[1][j] + p;
			n = Math.floor(n / 10);
		}
		s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
		//s = p + unit[0][i] + s;
	}
	return head + s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整');
}

/**
 * 格式化处理字符串
 * ecDo.formatText('1234asda567asd890')
 * result："12,34a,sda,567,asd,890"
 * ecDo.formatText('1234asda567asd890',4,' ')
 * result："1 234a sda5 67as d890"
 * ecDo.formatText('1234asda567asd890',4,'-')
 * result："1-234a-sda5-67as-d890"
 */
function formatText(str, size, delimiter) {
	var _size = size || 3,
		_delimiter = delimiter || ',';
	var regText = '\\B(?=(\\w{' + _size + '})+(?!\\w))';
	var reg = new RegExp(regText, 'g');
	return isEmpty(str) ? "" : str.toString().replace(reg, _delimiter);
}

/**
 * 截取字符串前几位
 */
function cutstr(str, len) {
	var temp,
		icount = 0,
		patrn = /[^\x00-\xff]/,
		strre = "";
	for (var i = 0; i < str.length; i++) {
		if (icount < len - 1) {
			temp = str.substr(i, 1);
			if (patrn.exec(temp) == null) {
				icount = icount + 1
			} else {
				icount = icount + 2
			}
			strre += temp
		} else {
			break;
		}
	}
	return strre; // + "..."
}

/**
 * 截取字符串后几位
 */
function cutstrlast(str, len) {
	return str.substr(str.length - len)
}

/**
 * 设置url参数
 * setUrlPrmt({'a':1,'b':2})
 * result：a=1&b=2
 */
function setUrlPrmt(obj) {
	var _rs = [];
	for (var p in obj) {
		if (obj[p] != null && obj[p] != '') {
			_rs.push(p + '=' + obj[p])
		}
	}
	return _rs.join('&');
}

/**
 * 获取url参数
 * getUrlPrmt('segmentfault.com/write?draftId=122000011938')
 * result：Object{draftId: "122000011938"}
 */
function getUrlPrmt(url) {
	url = url ? url : window.location.href;
	var _pa = url.substring(url.indexOf('?') + 1),
		_arrS = _pa.split('&'),
		_rs = {};
	for (var i = 0, _len = _arrS.length; i < _len; i++) {
		var pos = _arrS[i].indexOf('=');
		if (pos == -1) {
			continue;
		}
		var name = _arrS[i].substring(0, pos),
			value = window.decodeURIComponent(_arrS[i].substring(pos + 1));
		_rs[name] = value;
	}
	return _rs;
}

/**
 * html字符串转码
 * @param {*} html 
 */
function return2Br(str) {
	return str.replace(/\r?\n/g, "&br;");
}

/**
 * html字符串转码
 * @param {*} html 
 */
function html2Escape(html) {
	html = html.replace(/[<>&"'\\!]/g, function (c) {
		return {
			'<': '&lt;',
			'>': '&gt;',
			'&': '&amp;',
			'"': '&quot;',
			'\'': '&apos;',
			'\\': '&#92;',
			'!': '&#33;'
		}[c];
	});
	html = return2Br(html);
	return html;

}

/**
 * 字符转html
 * @param {*} str 
 */
function escape2Html(str) {
	var arrEntities = {
		'lt': '<',
		'gt': '>',
		'nbsp': ' ',
		'amp': '&',
		'quot': '"',
		'apos': '\'',
		'br': '\r\n',
		'#92': '\\',
		'#33': '!',
	};
	return unescape(str).replace(/&(lt|gt|nbsp|amp|quot|apos|br|#92|#33);/ig, function (all, t) {
		return arrEntities[t];
	});
}

/**
 * 转码对象转成正常对象
 * @param {*} html 
 */
function escapeObjToHtmlObj(obj) {
	sysJson['decode'].forEach(function (name) {
		if (obj.hasOwnProperty(name)) {
			obj[name] = escape2Html(obj[name]);
		}
	});
	return obj;
}

/**
 * 正常对象转成转码对象
 * @param {*} html 
 */
function htmlObjToEscapeObj(htmlobj) {
	sysJson['decode'].forEach(function (name) {
		if (htmlobj.hasOwnProperty(name)) {
			htmlobj[name] = html2Escape(htmlobj[name]);
		}
	});
	return htmlobj;
}

/*
 * 字符串不为空
 */
function isNotEmpty(obj) {
	if (obj == undefined || obj == null || obj == "" || typeof obj == 'undefined' || (typeof obj == 'string' && trim(obj, 2) == "")) {
		return false;
	} else {
		return true;
	}
}

/* 
 * 字符串为空
 */
function isEmpty(obj) {
	if (obj == undefined || obj == null || obj == "" || typeof obj == 'undefined' || (typeof obj == 'string' && trim(obj, 2) == "")) {
		return true;
	} else {
		return false;
	}
}

/*
 *字符串首字符大写
 */
function firstCase(str) {
	return str.substring(0, 1).toUpperCase() + str.substring(1);
}

/*
 *字符模板渲染Lite
 */
function temEnginLite(listInfos, tem) {
	var html = [];
	for (var i = 0; i < listInfos.length; i++) {
		var item = tem.replace(/{{(.)+?}}/g, function (match) {
			var key = match.substring(2, match.length - 2).trim();
			var info = listInfos[i];
			val = info[key]
			return val ? val : '';
		});
		html.push(item)
	}
	return html.join('')
}

/*
 *字符模板渲染
 */
function temEngin(listInfos, tem) {
    var html = [];
    for (var i = 0; i < listInfos.length; i++) {
        var info = listInfos[i];
        var item = tem.replace(/{{(.)+?}}/g, function (match) {
            info = escapeObjToHtmlObj(info);
            var key = match.substring(2, match.length - 2).trim();
            //处理{{a.b.c}}这一类型
            var keyArr = key.split('.');
            var val = info;
            for (var k in keyArr) {
                if (keyArr.hasOwnProperty(k)) {
                    if (isJSON(escape2Html(val[keyArr[k]]))) {
                        val = JSON.parse(escape2Html(val[keyArr[k]]));
                    } else if (isJSON(val[keyArr[k]])) {
                        val = JSON.parse(val[keyArr[k]]);
                    } else {
                        val = val[keyArr[k]];
                    }
                }
            }
            if (keyArr.length == 1) { // 值直接为json的情况
                val = info[key];
            }
            return val ? val : '';
        });
        html.push(item)
    }
    return html.join('')
}

//***************************************************************************************//
//*************************************处理数字金额及输入验证******************************//
//***************************************************************************************//

/**
 * 检测字符串
 * checkType('165226226326','phone')
 * result：false
 * 大家可以根据需要扩展
 */
function checkType(str, type) {
	switch (type) {
		case 'email':
			return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
		case 'phone':
			return /^1[3|4|5|7|8][0-9]{9}$/.test(str);
		case 'tel':
			return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str);
		case 'number':
			return /^[0-9]$/.test(str);
		case 'english':
			return /^[a-zA-Z]+$/.test(str);
		case 'text':
			return /^\w+$/.test(str);
		case 'chinese':
			return /^[\u4E00-\u9FA5]+$/.test(str);
		case 'lower':
			return /^[a-z]+$/.test(str);
		case 'upper':
			return /^[A-Z]+$/.test(str);
		default:
			return false;
	}
}

/**
 * 检测密码强度
 * checkPwd('12asdASAD')
 * result：3(强度等级为3)
 */
function checkPwd(str) {
	var nowLv = 0;
	if (str.length < 6) {
		return nowLv
	}
	if (/[0-9]/.test(str)) {
		nowLv++
	}
	if (/[a-z]/.test(str)) {
		nowLv++
	}
	if (/[A-Z]/.test(str)) {
		nowLv++
	}
	if (/[\.|-|_]/.test(str)) {
		nowLv++
	}
	return nowLv;
}

/**
 * 限制金额输入、兼容浏览器、屏蔽粘贴拖拽等
 */
$.fn.numeral = function (bl, tl) { 
	$(this).keypress(function (e) {
		var keyCode = e.keyCode ? e.keyCode : e.which;
		if (bl) { //浮点数
			if ((this.value.length == 0 || this.value.indexOf(".") != -1) && keyCode == 46) return false;

			return keyCode >= 48 && keyCode <= 57 || keyCode == 46 || keyCode == 8;
		} else { //整数
			return keyCode >= 48 && keyCode <= 57 || keyCode == 8;
		}
	});
	$(this).keyup(function (e) {
		if (bl) { //浮点数
			// 首位不能未0
			this.value = RecursiveEliminationZero(this.value);
		} else { //整数
			this.value = RecursiveEliminationZero(this.value);

		}
		if (tl) {//千分位
			this.value = this.value.replace(/,/g, '').replace(/\d+?(?=(?:\d{3})+$)/g, function (s) {
				return s + ',';
			});
			if (this.value === "") {
				$(this).val("");
			} else {
				$(this).val(this.value);
			}
		} else {

		}
	});

	$(this).bind("copy cut paste", function (e) { // 通过空格连续添加复制、剪切、粘贴事件
		var clipboardData = window.clipboardData; //for IE
		if (!clipboardData) { // for chrome
			clipboardData = e.originalEvent.clipboardData;
		}
		if (clipboardData) {//clipboardData.setData('text', clipboardData.getData('text').replace(/\D/g, ''));
			if (clipboardData.getData('text'))
				return !clipboardData.getData('text').replace(/,/g, '').replace(/\./g, '').match(/\D/);
		}
		else
			event.preventDefault();
	});
	$(this).bind("dragenter", function () {
		return false;
	});
	$(this).css("ime-mode", "disabled");
	$(this).bind("focus", function () {
		if (this.value.lastIndexOf(".") == (this.value.length - 1)) {
			this.value = this.value.substr(0, this.value.length - 1);
		} else if (isNaN(thousands2Num(this.value))) {
			this.value = "";
		}
	});
}

/**
 * 限制金额输入、兼容浏览器、屏蔽粘贴拖拽等
 * select页面元素逗号隔开，bl是否是小数，tl是千位符，pos保留几位小数，默认2位
 */
function numeralBySelector(select, bl, tl, pos) {
	$(document).on("keypress", select, function (e) {
		var keyCode = e.keyCode ? e.keyCode : e.which;
		if (bl) { //浮点数
			if ((this.value.length == 0 || this.value.indexOf(".") != -1) && keyCode == 46) return false;

			return keyCode >= 48 && keyCode <= 57 || keyCode == 46 || keyCode == 8;
		} else { //整数
			return keyCode >= 48 && keyCode <= 57 || keyCode == 8;
		}
	});
	$(document).on("change", select, function (e) {
		var keyCode = e.keyCode ? e.keyCode : e.which;
		if (bl) { //浮点数
			if ((this.value.length == 0 || this.value.indexOf(".") != -1) && keyCode == 46) return false;

			return keyCode >= 48 && keyCode <= 57 || keyCode == 46 || keyCode == 8;
		} else { //整数
			return keyCode >= 48 && keyCode <= 57 || keyCode == 8;
		}
	});
	$(document).on("focus", select, function () {
		if (this.value.lastIndexOf(".") == (this.value.length - 1)) {
			this.value = this.value.substr(0, this.value.length - 1);
		} else if (isNaN(thousands2Num(this.value))) {
			this.value = "";
		}
	});
	$(document).on("blur", select, function () {
		//浮点数
		if (isNaN(thousands2Num(this.value))) {
			this.value = "";
		}
		else if (bl) {
			if (this.value == '') {

			}else if(pos){
				$(this).val(thousands2Num(toThousandsfomatFloat(thousands2Num(this.value), pos)));
			}else if (this.value.lastIndexOf(".") == - 1) {
				this.value = this.value + '.00';
			} else if (this.value.lastIndexOf(".") == (this.value.length - 2)) {
				this.value = this.value + "0";
			}
			// 首位不能未0
			this.value = RecursiveEliminationZero(this.value);
		} else { //整数
			this.value = RecursiveEliminationZero(this.value);
		}
		if (tl) {//千分位
			var val = this.value.split('.')
			this.value = val[0].replace(/,/g, '').replace(/\d+?(?=(?:\d{3})+$)/g, function (s) {
				return s + ',';
			});
			if (val.length == 2) {
				this.value = pos?this.value + '.' + val[1].slice(0, pos):this.value + '.' + val[1].slice(0, 2);
			}
			if (this.value === "") {
				$(this).val("");
			} else {
				$(this).val(this.value);
			}
		}
	});
	$(document).on("compositionstart", select, function (e) {
		$(this).val('');
	});
	$(document).on("compositonupdate", select, function (e) {
		$(this).val('');
	});
	$(document).on("compositionend", select, function (e) {
		$(this).val('');
	});
}

/**
 * 初始化页面限制输入
 * @param {*} id
 */
function inputSestrict(id){
	//加载模板到页面
	var elems=$("#"+id+" [sestrictType]");
	if(elems&&elems.length>0){
		elems.each(function(i,item){
			var sestrictType = $(item).attr("sestrictType");
			switch(sestrictType) {
				case "integer":
				numeralBySelector($(item), false, false);
				break;
				case "decimal-1":
				numeralBySelector($(item), true, true, 1);
				break;
				case "decimal-2":
				numeralBySelector($(item), true, true, 2);
				break;
				case "only-cn":
				$(item).attr("keyup","this.value=this.value.replace(/[^\u4e00-\u9fa5]/g,'')");
				break;
				case "only-en":
				$(item).attr("keyup","this.value=this.value.replace(/[^a-zA-Z]/g,'')");
				break;
				case "email":
				break;
				default:
		} 
		})
	}
}

/*
 * 现金额大写转换函数
 * upDigit(168752632)
 * result："人民币壹亿陆仟捌佰柒拾伍万贰仟陆佰叁拾贰元整"
 * upDigit(1682)
 * result："人民币壹仟陆佰捌拾贰元整"
 * upDigit(-1693)
 * result："欠人民币壹仟陆佰玖拾叁元整"
 */
function upDigit(n) {
	var fraction = ['角', '分', '厘'];
	var digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
	var unit = [
		['元', '万', '亿'],
		['', '拾', '佰', '仟']
	];
	var head = ''//n < 0 ? '欠人民币' : '人民币';
	n = Math.abs(n);
	var s = '';
	for (var i = 0; i < fraction.length; i++) {
		s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
	}
	s = s || '整';
	n = Math.floor(n);
	for (var i = 0; i < unit[0].length && n > 0; i++) {
		var p = '';
		for (var j = 0; j < unit[1].length && n > 0; j++) {
			p = digit[n % 10] + unit[1][j] + p;
			n = Math.floor(n / 10);
		}
		s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
		//s = p + unit[0][i] + s;
	}
	return head + s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整');
}

/*
 * 保留两位小数
 */
function save2Format(num) {
	num = num.toString().replace(/,/g, '');
	if (num.indexOf(".") > -1) {
		num = parseFloat(num).toFixed(2) + "";
	} else {
		num += ".00";
	}
	return num;
}

/**
 * 保留两位小数，千分位
 */
function toThousandsWithDecimal(str) {
	if (isEmpty(str) || isNaN(thousands2Num(str))) {
		return "";
	}
	var dataArr = str.toString().split('.');
	if (dataArr.length === 2) {
		if (dataArr[1].length === 1) {
			str = formatText(dataArr[0]) + '.' + dataArr[1] + '0'
		}
		if (dataArr[1].length > 1) {
			str = formatText(dataArr[0]) + '.' + dataArr[1][0] + dataArr[1][1]
		}
	} else {
		if (str === '') {

		} else if (str === 0) {

		} else {
			str = formatText(str) + '.00';
		}
	}
	return str;
}

function toThousandsfomatFloat(src, pos) {
	var num = Math.round(src * Math.pow(10, pos)) / Math.pow(10, pos);
	var dataArr = num.toString().split('.');
	if (dataArr.length == 1) {
		return formatText(dataArr[0]);
	} else {
		return formatText(dataArr[0]) + '.' + dataArr[1];
	}
}

//将千位符类型转成普通数字
function toNum(str) {
	if (isEmpty(str)) {
		return 0;
	}else{
		var num = str.toString().replace(/,/g, '');
		if(isNaN(num)){
			return 0;
		}else{
			return num * 1;
		}
	}
}

/*
 * 千分位分割，有小数位保留两位
 */
function numtoth(num) {
	var num = num.toString().replace(/,/g, '');
	if (num === '') {
		num = ''
	} else if (num === '0.') {
		return num;
	} else if (num == '0' || num == '00' || num == 0) {
		num = '0';
	}
	var nums = num.split('.');
	if (nums.length == 2) {
		// 首位不能未0
		nums[0] = RecursiveEliminationZero(nums[0]);
		nums[0] = formatText(nums[0]);
		nums[1] = cutstr(nums[1], 3);
		num = nums.join('.');
		return num;
	} else {
		num = RecursiveEliminationZero(num);
		return formatText(num);
	}
}

/**
 * 截取字符串后面的数字
 * @param {*} str 
 */
function substrnum(str) {
	var newstr = "";
	var arr = [];
	for (var i = str.length - 1; i >= 0; i--) {
		if (checkNumber(str[i]) || str[i] == ".") {
			arr.push(str[i]);
		} else {
			break;
		}
	}
	for (var j = arr.length - 1; j >= 0; j--) {
		newstr += arr[j];
	}
	return newstr;
}

/**
 * 验证字符串是否是数字
 * @param {*} theObj 
 */
function checkNumber(theObj) {
	var reg = /^[0-9]+.?[0-9]*$/;
	if (reg.test(theObj)) {
		return true;
	}
	return false;
}

/*
 * 判断是否是json字符串
 */
function isJSON(str) {
	if (typeof str == 'string') {
		try {
			var obj = JSON.parse(str);
			if (typeof obj == 'object' && obj) {
				return true;
			} else {
				return false;
			}

		} catch (e) {
			return false;
		}
	}
}

/*
 * 递归消除数字前的0
*/
function RecursiveEliminationZero(value) {
	if (value.charAt(0) == "0" && value.length > 1 && value.charAt(1) !== ".") {
		value = value.slice(1);
		return RecursiveEliminationZero(value);
	} else {
		return value;
	}
}

/** 
 * 将普通数字转成千位符类型的数字
*/
function toThousands(num) {
	num = num.toString();
	return isNotEmpty(num) ? (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') : "";
}

/*
 * 将千位符类型转成普通数字
 */
function thousands2Num(str) {
	if (isEmpty(str)) {
		return 0;
	}
	var num = str.toString().replace(/,/g, '') * 1;
	return num;
}

//***************************************************************************************//
//************************************日期时间******************************************//
//***************************************************************************************//

/**
 * 时间戳转化
 */
function stampToDate(newstime, type) {
	if (newstime != "") {
		newstime = newstime * 1;
		if (newstime.toString().length == 10) {
			var newTime = new Date(newstime * 1000);
		} else {
			var newTime = new Date(newstime * 1);
		}
		var date = new Date();
		var year = newTime.getFullYear(); //年
		var month ='-' + (newTime.getMonth() + 1 < 10 ? '0' + (newTime.getMonth() + 1) : newTime.getMonth() + 1); //月
		var day ='-' + (newTime.getDate() < 10 ? '0' + newTime.getDate() : newTime.getDate()); //日
		var hour =' ' + (newTime.getHours() < 10 ? '0' + newTime.getHours() : newTime.getHours());
		var min =':' + (newTime.getMinutes() < 10 ? '0' + newTime.getMinutes() : newTime.getMinutes());
		var sec =':' + (newTime.getSeconds() < 10 ? '0' + newTime.getSeconds() : newTime.getSeconds());
		switch (type) {
			case 1:
				return year + month + day;
				break;
			case 2:
				return year + month + day + hour + min;
				break;
			default:
				return year + month + day + hour + min + sec;
				break;
		}
	} else {
		return '暂无时间'
	}
}

/**
 * 当前时间戳
 */
function timeStampNow() {
	return Math.round(new Date().getTime() / 1000)
}

/**
 * 时间转化为时间戳
 */
function timeStamp(time) {
	var date = new Date(time);
	date = (date).valueOf() / 1000;
	return date;
}

/**
 * 到某一个时间的倒计时
 * getEndTime('2017/7/22 16:0:0')
 * result："剩余时间6天 2小时 28 分钟20 秒"
 * @param {*} endTime 
 */
function getEndTime(endTime) {
	var startDate = new Date(); //开始时间，当前时间
	var endDate = new Date(endTime); //结束时间，需传入时间参数
	var t = endDate.getTime() - startDate.getTime(); //时间差的毫秒数
	var d = 0,
		h = 0,
		m = 0,
		s = 0;
	if (t >= 0) {
		d = Math.floor(t / 1000 / 3600 / 24);
		h = Math.floor(t / 1000 / 60 / 60 % 24);
		m = Math.floor(t / 1000 / 60 % 60);
		s = Math.floor(t / 1000 % 60);
	}
	return {
		d: d,
		h: h,
		m: m,
		s: s
	};
}

/**
 * 根据日期获取周数
 * @param {*} dateString 日期的格式是"2018-12-11"
 * 返回值是数组，数组第一个值是年，第二个值是周
 */
function getWeekFromDate(dateString) {
	var da = '';
	if (dateString == undefined) {
		var now = new Date();
		var now_m = now.getMonth() + 1;
		now_m = (now_m < 10) ? '0' + now_m : now_m;
		var now_d = now.getDate();
		now_d = (now_d < 10) ? '0' + now_d : now_d;
		da = now.getFullYear() + '-' + now_m + '-' + now_d;
		console.log('今天系统时间是:' + da);
	} else {
		da = dateString; //日期格式2015-12-30
	}
	var date1 = new Date(da.substring(0, 4), parseInt(da.substring(5, 7)) - 1, da.substring(8, 10)); //当前日期
	var date2 = new Date(da.substring(0, 4), 0, 1); //1月1号
	//获取1月1号星期（以周一为第一天，0周一~6周日）
	var dateWeekNum = date2.getDay() - 1;
	if (dateWeekNum < 0) {
		dateWeekNum = 6;
	}
	if (dateWeekNum < 4) {
		//前移日期
		date2.setDate(date2.getDate() - dateWeekNum);
	} else {
		//后移日期
		date2.setDate(date2.getDate() + 7 - dateWeekNum);
	}
	var d = Math.round((date1.valueOf() - date2.valueOf()) / 86400000);
	if (d < 0) {
		var date3 = (date1.getFullYear() - 1) + "-12-31";
		return getYearWeek(date3);
	} else {
		//得到年数周数
		var year = date1.getFullYear();
		var week = Math.ceil((d + 1) / 7);
		console.log(year + "年第" + week + "周");
		return [year, week];
	}
}

/**
 * 周数加一
 * @param {*} year 
 * @param {*} weeks 
 */
function addOneWeek(year, weeks) {
	weeks++;
	if (weeks < 54) {
		return [year, weeks];
	} else {
		var date = new Date(year, "0", "1");
		var _week = date.getDay();
		if (_week == 0 && weeks == 54) {
			return [year, weeks];
		}
		if (_week != 0 && weeks == 54) {
			return [year + 1, 1];
		}
	}
}

/**
 * 周数减一
 * @param {*} year 
 * @param {*} weeks 
 */
function subOneWeek(year, weeks) {
	weeks--;
	if (weeks > 0) {
		return [year, weeks];
	}
	if (weeks == 0) {
		var date = new Date(year - 1, "0", "1");
		var _week = date.getDay();
		if (_week == 0) {
			return [year - 1, 54];
		}
		if (_week != 0) {
			return [year - 1, 53];
		}
	}
}

/**
 * 获取当前日期 YYYY-MM-DD
 */
function getNowFormatDate() {
	var date = new Date();
	var seperator1 = "-";
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var strDate = date.getDate();
	if (month >= 1 && month <= 9) {
		month = "0" + month;
	}
	if (strDate >= 0 && strDate <= 9) {
		strDate = "0" + strDate;
	}
	var currentdate = year + seperator1 + month + seperator1 + strDate;
	return currentdate;
}

/**
 * 计算日期加上指定天数得到新的日期
 */
function getNewData(dateTemp, days) {
	var dateTemp = dateTemp.split("-");
	var nDate = new Date(dateTemp[1] + '-' + dateTemp[2] + '-' + dateTemp[0]); //转换为MM-DD-YYYY格式    
	var millSeconds = Math.abs(nDate) + (days * 24 * 60 * 60 * 1000);
	var rDate = new Date(millSeconds);
	var year = rDate.getFullYear();
	var month = rDate.getMonth() + 1;
	if (month < 10) month = "0" + month;
	var date = rDate.getDate();
	if (date < 10) date = "0" + date;
	return (year + "-" + month + "-" + date);
}

/**
 * 两个时间相差天数 兼容firefox chrome
 * sDate1和sDate2是2006-12-18格式
 */
function dateDifference(sDate1, sDate2) {
	var dateSpan,
		tempDate,
		iDays;
	sDate1 = Date.parse(sDate1);
	sDate2 = Date.parse(sDate2);
	dateSpan = sDate2 - sDate1;
	dateSpan = Math.abs(dateSpan);
	iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
	return iDays
};

/**
 * JS计算两个日期之间的天数
 * sDate1和sDate2是2017-9-25格式 
 */
function dateDiffFromDateString(sDate1, sDate2) {
	if (sDate1 == undefined || sDate1 == null) {
		sDate1 = "";
	}
	if (sDate2 == undefined || sDate2 == null) {
		sDate2 = "";
	}
	var aDate, oDate1, oDate2, iDays
	aDate = sDate1.split("-")
	oDate1 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]) //转换为9-25-2017格式 
	aDate = sDate2.split("-")
	oDate2 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0])
	iDays = parseInt((oDate1 - oDate2) / 1000 / 60 / 60 / 24) //把相差的毫秒数转换为天数 
	return iDays;
}

/**
 * JS计算两个日期之间的天数
 * sDate1和sDate2是2017-9-25格式 
 */
function dateDiffFromDate(date1, date2) {
	iDays = parseInt(Math.abs(date1 - date2) / 1000 / 60 / 60 / 24) //把相差的毫秒数转换为天数 
	return iDays
}

/**
 * 根据年和周数获取当周的天数区间
 * @param {*} year 
 * @param {*} weeks 
 */
function getDatesFromWeek(year, weeks) {
	var date = new Date(year, "0", "1");
	var time = date.getTime(); // 获取当前星期几，0：星期一 。。。。
	var _week = date.getDay(); //当这一年的1月1日为周日时则本年有54周，否则没有54周，没有则去除第54周的提示  
	var cnt = 0; // 获取距离周末的天数 
	switch (_week) {
		case 0:
			cnt = 7;
			break;
		case 1:
			cnt = 6;
			break;
		case 2:
			cnt = 5;
			break;
		case 3:
			cnt = 4;
			break;
		case 4:
			cnt = 3;
			break;
		case 5:
			cnt = 2;
			break;
		case 6:
			cnt = 1;
			break;
	}
	if (_week != 0) { //一年53周情况 
		if (weeks == 54) {
			return false; //'今年没有54周'; 
		}
	} else { //一年54周情况 
		if (_week == 0 && weeks == 1) { //第一周
			cnt = 0;
		}
	}
	// 将这个长整形时间加上第N周的时间偏移
	time += cnt * 24 * 3600000; //第2周开始时间 
	if (weeks == 1) { //第1周特殊处理
		// 为日期对象 date 重新设置成时间 time
		var start = time - 24 * 3600000;
	} else {
		var start = time + (weeks - 2) * 7 * 24 * 3600000; //第n周开始时间
	}
	date.setTime(start);
	var _start = date.format("yyyy-MM-dd");
	date.setTime(start + 24 * 3600000);
	var _start1 = date.format("yyyy-MM-dd");
	date.setTime(start + 24 * 3600000 + 24 * 3600000);
	var _start2 = date.format("yyyy-MM-dd");
	date.setTime(start + 24 * 3600000 + 24 * 3600000 + 24 * 3600000);
	var _start3 = date.format("yyyy-MM-dd");
	date.setTime(start + 24 * 3600000 + 24 * 3600000 + 24 * 3600000 + 24 * 3600000);
	var _start4 = date.format("yyyy-MM-dd");
	date.setTime(start + 24 * 3600000 + 24 * 3600000 + 24 * 3600000 + 24 * 3600000 + 24 * 3600000);
	var _start5 = date.format("yyyy-MM-dd");
	date.setTime(start + 24 * 3600000 + 24 * 3600000 + 24 * 3600000 + 24 * 3600000 + 24 * 3600000 + 24 * 3600000);
	var _start6 = date.format("yyyy-MM-dd");
	return [_start, _start1, _start2, _start3, _start4, _start5, _start6];
}


function getNowDate(){
	var myDate = new Date();
 
	 //获取当前年
	var year = myDate.getFullYear();
 
	//获取当前月
	var month = myDate.getMonth() + 1;
 
	 //获取当前日
	 var date = myDate.getDate();
	 var h = myDate.getHours(); //获取当前小时数(0-23)
	 var m = myDate.getMinutes(); //获取当前分钟数(0-59)
	 var s = myDate.getSeconds();
 
	//获取当前时间
 
	var now = year + '-' + conver(month) + "-" + conver(date) + " " + conver(h) + ':' + conver(m) + ":" + conver(s);
	console.log(now);
	return now;
 }

  //日期时间处理
  function conver(s) {
	return s < 10 ? '0' + s : s;
}

/**
 * 日期，在原有日期基础上，增加days天数，默认增加1天
 * @param {*} date -date是字符串的形式
 * @param {*} days -增加天数
 * 返回值也是字符串
 */
function addDate(date, days) {
	if (days === undefined || days === '') {
		days = 0;
	}
	var date = new Date(date);
	date.setDate(date.getDate() + days);
	var month = date.getMonth() + 1;
	var day = date.getDate();
	var mm = "'" + month + "'";
	var dd = "'" + day + "'";

	//单位数前面加0
	if (mm.length == 3) {
		month = "0" + month;
	}
	if (dd.length == 3) {
		day = "0" + day;
	}

	var time = date.getFullYear() + "-" + month + "-" + day
	return time;
}

/**
 * 日期格式化
 */
Date.prototype.format = function (format) {
	var args = {
		"M+": this.getMonth() + 1,
		"d+": this.getDate(),
		"h+": this.getHours(),
		"m+": this.getMinutes(),
		"s+": this.getSeconds(),
		"q+": Math.floor((this.getMonth() + 3) / 3), //quarter
		"S": this.getMilliseconds()
	};
	if (/(y+)/.test(format))
		format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var i in args) {
		var n = args[i];
		if (new RegExp("(" + i + ")").test(format))
			format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? n : ("00" + n).substr(("" + n).length));
	}
	return format;
};

/**
 * 获取AddDayCount天后的日期
 */
GetDateStr = function (date, AddDayCount) {
	var dd = new Date(date);
	dd.setDate(dd.getDate() + AddDayCount);//获取AddDayCount天后的日期
	var y = dd.getFullYear();
	var m = dd.getMonth() + 1;//获取当前月份的日期
	m = m < 10 ? "0" + m : m;
	var d = dd.getDate();
	d = d < 10 ? "0" + d : d;
	return y + "-" + m + "-" + d;
}

/*
 * 计算两个时间相差天数
 */
function datedifference(sDate1, sDate2) {
	var dateSpan, iDays;
	sDate1 = Date.parse(sDate1);
	sDate2 = Date.parse(sDate2);
	dateSpan = sDate2 - sDate1;
	dateSpan = Math.abs(dateSpan);
	iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
	return iDays
};

/*
 * 时间戳转时间
 */
function timestampToDate(shijian) {
	var date = new Date(shijian * 1000);
	Y = date.getFullYear() + '-';
	M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
	D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
	h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
	m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
	s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
	var time = Y + M + D + h + m + s;
	return time
}

/*
 * 获取当月后n个月的年份
 */
function getNMYear(time, n) {
	var year = time.split("-")[0] * 1;
	var month = time.split("-")[1] * 1;
	if ((month + n) % 12 == 0) {
		return year + parseInt((month + n) / 12) - 1;
	} else {
		return year + parseInt((month + n) / 12);
	}
}

/*
 * 获取当月后n个月的完整年月日
 */
function getNMCYear(time, n) {
	if (isEmpty(time)) {
		return "";
	}
	var year = time.split("-")[0] * 1;
	var month = time.split("-")[1] * 1;
	var day = time.split("-")[2];
	var newyear = "";
	var newmonth = "";
	if ((month + n) % 12 == 0) {
		newyear = year + parseInt((month + n) / 12) - 1;
	} else {
		newyear = year + parseInt((month + n) / 12);
	}
	newmonth = (month + n) % 12 == 0 ? 12 : (month + n) % 12;
	if (newmonth < 10) {
		newmonth = "0" + newmonth;
	}
	return newyear + "-" + newmonth + "-" + day
}

//***************************************************************************************//
//*************************************处理数组方法***************************************//
//***************************************************************************************//

/**
* 速度最快， 占空间最多（空间换时间）
* 该方法执行的速度比其他任何方法都快， 就是占用的内存大一些。
* 现思路：新建一js对象以及新数组，遍历传入数组时，判断值是否为js对象的键，
* 不是的话给对象新增该键并放入新数组。
* 注意点：判断是否为js对象键时，会自动对传入的键执行“toString()”，
* 不同的键可能会被误认为一样，例如n[val]-- n[1]、n["1"]；
* 解决上述问题还是得调用“indexOf”
*/
function uniqArr(array) {
	var temp = {}, r = [], len = array.length, val, type;
	for (var i = 0; i < len; i++) {
		val = array[i];
		type = typeof val;
		if (!temp[val]) {
			temp[val] = [type];
			r.push(val);
		} else if (temp[val].indexOf(type) < 0) {
			temp[val].push(type);
			r.push(val);
		}
	}
	return r;
}

/**
 * 将数组按条件分组
 * @param {Array} array 
 * @param {Function} f 
 */
function groupBy(array, f) {
	let groups = {};
	array.forEach(function (o) {
		let group = JSON.stringify(f(o));
		groups[group] = groups[group] || [];
		groups[group].push(o);
	});
	return Object.keys(groups).map(function (group) {
		return groups[group];
	});
}

/**
 * 将数组按条件分组
 * @param {Array} array 
 * @param {Function} f 
 * @returns {Array.array}
 */
function groupBy2Arr(array, f) {
	let groups = {};
	array.forEach(function (o) {
		let group = JSON.stringify(f(o));
		groups[group] = groups[group] || [];
		groups[group].push(o);
	});
	return Object.keys(groups).map(function (group) {
		return groups[group];
	});
}

/**
 * 将数组按条件分组
 * @param {Array} array 
 * @param {Function} f 
 * @returns {Object.Array}
 */
function groupByObj(array, f) {
	let groups = {};
	array.forEach(function (o) {
		let group = JSON.stringify(f(o));
		groups[group] = groups[group] || [];
		groups[group].push(o);
	});
	return groups;
}

/**
 * 将数组按条件分组
 * @param {Array} array 
 * @param {Function} f 
 * @returns {Object.Array}
 */
function groupByFiled(array, f) {
	let groups = {};
	array.forEach(function (o) {
		let group = f(o);
		groups[group] = groups[group] || [];
		groups[group].push(o);
	});
	return groups;
}

/*
 * 数组去重
 */
function removeRepeatArray(arr) {
	return arr == undefined ? undefined : arr.filter(function (item, index, self) {
		return self.indexOf(item) === index;
	});
}

/*
 * 数组根据某个字段或某几个字段去重
 * dataArr为数组，repeat为字段名称数组：["itemNo","itemName"]记为两个字段
 */
function getNewArr(dataArr, repeat, minChar) {
	var map = {};
	var newDataArr = [];
	if (minChar) {
		dataArr = dataArr.sort(compareArr(minChar, 1))
	}
	for (var i = 0; i < dataArr.length; i++) {
		var item = dataArr[i];
		var itemText = "";
		for (var j = 0; j < repeat.length; j++) {
			itemText += item[repeat[j]]
		}
		if (!map[itemText]) {
			newDataArr.push(dataArr[i])
			map[itemText] = itemText;
		}
	}
	return newDataArr;
}

/*
 * 数组中元素根据某一字段的值排序（根据up升降排序,默认升序）
 */
function compareArr(property, up) {
	return function (a, b) {
		var va = a[property];
		var vb = b[property];
		return up ? vb - va : va - vb;
	}
}

/**
* each是一个集合迭代函数，它接受一个函数作为参数和一组可选的参数
* 这个迭代函数依次将集合的每一个元素和可选参数用函数进行计算，并将计算得的结果集返回
{%example
     var a = [1,2,3,4].each(function(x){return x > 2 ? x : null});
     var b = [1,2,3,4].each(function(x){return x < 0 ? x : null});
     alert(a);
     alert(b);
%}
* @param {Function} fn 进行迭代判定的函数
* @param more ... 零个或多个可选的用户自定义参数
* @returns {Array} 结果集，如果没有结果，返回空集
*/
Array.prototype.each = function (fn) {
	fn = fn || Function.K;
	var a = [];
	var args = Array.prototype.slice.call(arguments, 1);
	for (var i = 0; i < this.length; i++) {
		var res = fn.apply(this, [this[i], i].concat(args));
		if (res != null) a.push(res);
	}
	return a;
};

/**
* 得到一个数组不重复的元素集合<br/>
* 唯一化一个数组
* @returns {Array} 由不重复元素构成的数组
*/
Array.prototype.uniquelize = function () {
	var ra = new Array();
	for (var i = 0; i < this.length; i++) {
		if (!ra.contains(this[i])) {
			ra.push(this[i]);
		}
	}
	return ra;
};

/**
* 求两个集合的补集
{%example
     var a = [1,2,3,4];
     var b = [3,4,5,6];
     alert(Array.complement(a,b));
%}
* @param {Array} a 集合A
* @param {Array} b 集合B
* @returns {Array} 两个集合的补集
*/
Array.complement = function (a, b) {
	return Array.minus(Array.union(a, b), Array.intersect(a, b));
};

Array.prototype.contains = function (obj) {
	var i = this.length;
	while (i--) {
		if (this[i] === obj) {
			return true;
		}
	}
	return false;
}

/**
* 求两个集合的交集
{%example
     var a = [1,2,3,4];
     var b = [3,4,5,6];
     alert(Array.intersect(a,b));
%}
* @param {Array} a 集合A
* @param {Array} b 集合B
* @returns {Array} 两个集合的交集
*/
Array.intersect = function (a, b) {
	return a.uniquelize().each(function (o) { return b.contains(o) ? o : null });
};

/**
* 求两个集合的差集
{%example
     var a = [1,2,3,4];
     var b = [3,4,5,6];
     alert(Array.minus(a,b));
%}
* @param {Array} a 集合A
* @param {Array} b 集合B
* @returns {Array} 两个集合的差集
*/
Array.minus = function (a, b) {
	return a.uniquelize().each(function (o) { return b.contains(o) ? null : o });
};

/**
* 求两个集合的并集
{%example
     var a = [1,2,3,4];
     var b = [3,4,5,6];
     alert(Array.union(a,b));
%}
* @param {Array} a 集合A
* @param {Array} b 集合B
* @returns {Array} 两个集合的并集
*/
Array.union = function (a, b) {
	return a.concat(b).uniquelize();
};

/**
 * 是否是数组
 * @param {*} obj 
 */
function isArray(obj) {
	return obj instanceof Array;
}

//使用循环的方式判断一个元素是否存在于一个数组中
function isInArray(arr, value) {
	for (var i = 0; i < arr.length; i++) {
		if (value === arr[i]) {
			return true;
		}
	}
	return false;
}

/**
 * 使用循环的方式判断一个元素是否存在于一个数组中
 * @param {*} arr 
 * @param {*} value 
 */
function posInArray(arr, value) {
	for (var i = 0; i < arr.length; i++) {
		if (value == arr[i]) {
			return i;
		}
	}
	return -1;
}

function isInArrayOfField(arr, field, value) {
	for (var i = 0; i < arr.length; i++) {
		if (value === arr[i][field]) {
			return true;
		}
	}
	return false;
}

/**
 * 为数值比较做准备
 * @param {*} value1 
 * @param {*} value2 
 */
function compare(value1, value2) {
	if (value1 < value2) {
		return -1;
	} else if (value1 > value2) {
		return 1;
	} else {
		return 0;
	}
}

/**
 * arr2 = [13, 24, 51, 3];
 * console.log(arr2.sort(compare)); [3, 13, 24, 51]
 * 数值升序排序
 * @param {*} arr 
 */
function numArrayAscSort(arr) {
	return arr.sort(compare);
}

/**
 * 数值降序排序
 * @param {*} arr 
 */
function numArrayDescSort(arr) {
	return arr.sort(compare).reverse();
}

/**
 * 数值排序
 * @param {*} arr 
 */
function compare(property) {
    return function (a, b) {
        var value1 = a[property];
        var value2 = b[property];
        return value2 - value1;
    }
}

/**
 * 使用indexOf判断元素是否存在于数组中
 * @param {*} arr 
 * @param {*} value 
 */
function isInArray3(arr, value) {
	if (isNotEmpty(arr) && arr.indexOf && typeof (arr.indexOf) == 'function') {
		var index = arr.indexOf(value);
		if (index >= 0) {
			return true;
		}
	}
	return false;
}

/**
 * 删除数组指定的某个元素
 * @param {*} val 
 */
function removeArray(val) {
	var index = this.indexOf(val);
	if (index > -1) {
		this.splice(index, 1);
	}
};

/**
 * 获取JSON数组
 * @param {*} formId 
 * @param {*} name 
 */
function getJsonArray(formId, name) { //将input里面的json转换为数组
	if (formId == null) {
		var json = $("input[name=" + name + "]").val();
	} else {
		var json = $("#" + formId + " input[name=" + name + "]").val();
	}
	var array = [];
	if (isNotEmpty(json)) {
		array = JSON.parse(escape2Html(json));
	} else {
		array = [];
	}
	return array;
}

/**
 * 设置JSON数组
 * @param {*} formId 
 * @param {*} name 
 * @param {*} json 
 */
function setJsonArray(formId, name, json) { //将input里面的json转换为数组
	$("#" + formId + " input[name=" + name + "]").val(JSON.stringify(json));
}

/**
 * 添加JSON数据
 * @param {*} dataArray 
 * @param {*} obj 
 * @param {*} pos 
 */
function pushArrayBypos(dataArray, obj, pos) { //添加JSON数据
	dataArray.splice(pos, 0, obj);
	return dataArray;
}

/**
 * 根据位置添修改JSON数据
 * @param {*} dataArray 
 * @param {*} obj 
 * @param {*} pos 
 */
function updateJsonArrayByPos(dataArray, obj, pos) { //修改JSON数据
	for (var i = 0; i < dataArray.length; i++) {
		if (pos == i) {
			dataArray.splice(i, 1, obj);
		}
	}
	return dataArray;
}

/*
 * 对数组对象的某一字段求和
 */
function objsum(array, key) {
	var sumResult = 0;
	for (var i = 0; i < array.length; i++) {
		var value = array[i][key];
		if (isNotEmpty(value)) {
			sumResult += (value.toString().replace(/,/g, '')) * 1;
		}

	}
	return sumResult;
}

/*
* 功能：对JSON对象字符串数组进行多字段（多列）排序
* 参数：
*   objArr: 目标数组
*   keyArr: 排序字段，以数组形式传递
*   type：排序方式，undefined以及asc都是按照升序排序，desc按照降序排序
* */
function sortObjectArray(objArr, keyArr, type) {
	if (type != undefined && type != 'asc' && type != 'desc') {
		return 'error';
	}
	var order = 1;
	if (type != undefined && type == 'desc') {
		order = -1;
	}
	var key = keyArr[0];
	objArr.sort(function (objA, objB) {
		if (objA[key] > objB[key]) {
			return order;
		} else if (objA[key] < objB[key]) {
			return 0 - order;
		} else {
			return 0;
		}
	})
	for (var i = 1; i < keyArr.length; i++) {
		var key = keyArr[i];
		objArr.sort(function (objA, objB) {
			for (var j = 0; j < i; j++) {
				if (objA[keyArr[j]] != objB[keyArr[j]]) {
					return 0;
				}
			}
			if (objA[key] > objB[key]) {
				return order;
			} else if (objA[key] < objB[key]) {
				return 0 - order;
			} else {
				return 0;
			}
		})
	}
	return objArr;
}

/**
 * 根据位id添修改JSON数据
 * @param {*} dataArray 
 * @param {*} obj 
 */
function updateJsonArrayById(dataArray, obj) { //修改JSON数据
	if (!obj.hasOwnProperty('id') || obj['id'] == null) {
		obj['id'] = uuid();
	}
	var flag = 0;
	for (var i = 0; i < dataArray.length; i++) {
		if (dataArray[i]['id'] == obj['id']) {
			dataArray.splice(i, 1, obj);
			flag = 1;
		}
	}
	if (flag == 0) {
		dataArray.splice(i, 0, obj);
	}
	return dataArray;
}

/**
 * 根据字段添修改JSON数据
 * @param {*} dataArray 
 * @param {*} obj
 * @param {*} field 
 */
function updateJsonArrayByField(dataArray, obj, field) { //修改JSON数据
	var flag = 0;
	for (var i = 0; i < dataArray.length; i++) {
		if (dataArray[i][field] == obj[field]) {
			dataArray.splice(i, 1, obj);
			flag = 1;
		}
	}
	if (flag == 0) {
		dataArray.splice(i, 0, obj);
	}
	return dataArray;
}

/**
 * 两个数组合并
 * @param {*} dataArray 
 * @param {*} dataArray2 
 * @param {*} field 
 */
function mergeTwoArray(dataArray, dataArray2, field) { //修改JSON数据
	for (var i = 0; i < dataArray2.length; i++) {
		if (!isFromJsonByField(dataArray, field, dataArray2[i][field])) {
			dataArray.push(dataArray2[i]);
		}
	}
	return dataArray;
}

/**
 * 两个数组合并,删除ids
 * @param {*} dataArray 
 * @param {*} dataArray2 
 * @param {*} field 
 * @param {*} deleteIds 
 */
function mergeTwoNewArray(dataArray, dataArray2, field, deleteIds) { //修改JSON数据
	for (var i = 0; i < dataArray2.length; i++) {
		var index = getPosArrayById(dataArray, dataArray2[i].id);
		if (index == -1) {
			dataArray.push(dataArray2[i]);
		} else {
			dataArray[index] = dataArray2[i];
		}
	}
	var newarray = dataArray.filter(function (data) {
		return deleteIds.indexOf(data.id) == -1;
	});
	return newarray;
}

/**
 * 根据位置删除JSON数据
 * @param {*} dataArray 
 * @param {*} pos 
 */
function removeJsonArrayByPos(dataArray, pos) {
	for (var i = 0; i < dataArray.length; i++) {
		if (i == pos) {
			dataArray.splice(i, 1);
		}
	}
	return dataArray;
}

/**
 * 根据位置数组删除JSON数据
 * @param {*} dataArray 
 * @param {*} posArr 
 */
function removeJsonArrayByPosArr(dataArray, posArr) {
	var dataNewArray = [];
	for (var pos = 0; dataArray != undefined && dataArray != null && pos < dataArray.length; pos++) {
		if (posInArray(posArr, pos) < 0) {
			dataNewArray.push(dataArray[pos]);
		}
	}
	return dataNewArray;
}

/*
 *根据id得到对象在数组中的位置
 */
function getPosArrayById(dataArray, id) {
	for (var i = 0; i < dataArray.length; i++) {
		if (dataArray[i]['id'] == id) {
			return i;
		}
	}
	return -1;
}

/*
 * 根据field的值给出最后一个符合条件的对象的位置
 */
function getLastPosByField(dataArray, field, value) {
	var lastPos = -1;
	for (var i = 0; i < dataArray.length; i++) {
		if (dataArray[i][field] == value) {
			lastPos = i;
		}
	}
	return lastPos;
}

/*
 *根据id得到对象的最后一个儿子在数组中的位置
 */
function getLastSonPosArrayById(dataArray, id) {
	pos = getPosArrayById(dataArray, id);
	if (pos == -1) {
		return -1;
	} else {
		var pid = id;
		while (pos > -1) {
			var lastPos = getLastPosByField(dataArray, "pid", pid);
			if (lastPos == -1) {
				return pos;
			} else {
				var obj = dataArray[lastPos];
				pos = lastPos;
				pid = obj['id'];
			}
		}
		return -1;
	}

}

/*
 *根据id获取数据
 */
function getJsonArrayById(dataArray, id) {
	for (var i = 0; i < dataArray.length; i++) {
		if (dataArray[i]['id'] == id) {
			return dataArray[i];
		}
	}
	return {};
}

/*
 *根据id获取数据
 */
function getObjFromArrayById(dataArray, id) {
	for (var i = 0; i < dataArray.length; i++) {
		if (dataArray[i]['id'] == id) {
			return dataArray[i];
		}
	}
	return {};
}

/*
 *根据指定字段获取数据
 */
function getObjFromArrayByField(dataArray, field, value) {
	for (var i = 0; i < dataArray.length; i++) {
		if (dataArray[i][field] == value) {
			return dataArray[i];
		}
	}
	return {};
}

/*
 *根据多个字段获取一个数据
 */
function getOneObjFromArrayByCondition(dataArray, conditions) {
	for (var i = 0; i < dataArray.length; i++) {
		var isEqual = true;
		for (var key in conditions) {
			if (conditions[key] !== dataArray[i][key]) {
				isEqual = false;
			}
		}
		if (isEqual) {
			return dataArray[i];
		}
	}
	return false;
}

/*
 *根据id删除数据id
 */
function deleteJsonArrayById(dataArray, id) {
	for (var i = dataArray.length - 1; i > -1; i--) {
		if (dataArray[i]['id'] == id) {
			dataArray.splice(i, 1);
		}
	}
	return dataArray;
}

/*
 *根据filed的值来删除数据
 */
function deleteArrayByFiled(dataArray, value, filed) {
	for (var i = dataArray.length - 1; i > -1; i--) {
		if (dataArray[i][filed] == value) {
			dataArray.splice(i, 1);
		}
	}
	return dataArray;
}
/*
 *根据filed的值来删除数据
 */
function deleteArrayByValue(dataArray, value) {
	for (var i = dataArray.length - 1; i > -1; i--) {
		if (dataArray[i] == value) {
			dataArray.splice(i, 1);
		}
	}
	return dataArray;
}
/*
 *根据filed的值获取删除数据的id
 */
function getDeleteArrayIdsByFiled(dataArray, value, filed) {
	var deleteIds = [];
	for (var i = dataArray.length - 1; i > -1; i--) {
		if (dataArray[i][filed] == value) {
			deleteIds.push(dataArray[i].id);
		}
	}
	return deleteIds;
}

/*
 *根据条件获取数据
 */
function updateJsonArrayByCondition(dataArray, conditions) {
	var result = [];
	for (var i = 0; i < dataArray.length; i++) {
		var con = conditions.replace(/item\./ig, "dataArray[i].");
		var comStr = "if(" + con + "){result.push(dataArray[i])}";
		eval(comStr);
	}
	return result;
}

/**
 * 
 * @param {*} dataArray 
 * @param {*} page 页数,从1开始
 * @param {*} count 每页有多少项
 */
function getSubArrayByPage(dataArray, page, count) {
	return dataArray.slice((page - 1) * count, page * count);
}

/*
 *比较两个对象的多个字段是否相等
 */
function isEqualOfTwoObject(obj1, obj2, fieldArray) {
	if (fieldArray == null && fieldArray.length == 0) {
		return false;
	} else {
		var flag = 0;
		fieldArray.forEach(function (field) {
			if (obj1[field] != obj2[field]) {
				flag = 1;
			}
		});
		if (flag == 0) {
			return true;
		} else {
			return false;
		}
	}
}

/*
 *数组插到某一个数组某一项后面
 */
function insertArrayToArray(array1, array2, num) {
	array2.unshift(num, 0);
	Array.prototype.splice.apply(array1, array2);
	return array1;
}

/*
 *判断数组对象中是否有对应项
 */
function isIncludeOfArray(array, obj, fieldArray) {
	var flag = 0;
	for (var i = 0; i < array.length; i++) {
		var isEqual = true;
		for (var j = 0; j < fieldArray.length; j++) {
			if (obj[fieldArray[j]] != array[i][fieldArray[j]]) {
				isEqual = false;
				break;
			}
		}
		if (isEqual) {
			flag = 1;
		}
	}
	return flag;
}

/**
 * 将对象obj变成对象编号为id的兄弟，新对象紧跟原对象
 * @param {*} dataArray 主数组数据 
 * @param {*} id 主键值 
 * @param {*} obj 
 */
function addBrotherObject(dataArray, id, obj) {
	var selfObj = getObjFromArrayById(dataArray, id);
	obj['pid'] = selfObj['pid'];
	if (id == null || id == "") {
		dataArray.push(obj);
	} else {
		var lastPos = getLastSonPosArrayById(dataArray, id);
		if (lastPos != -1) {
			dataArray.splice(lastPos + 1, 0, obj);
		}
	}
}

/**
 * 将对象obj变成对象编号为id的儿子，一般加在所有儿子的后面
 * @param {*} dataArray 主数组数据 
 * @param {*} id 主键值 
 * @param {*} obj 
 */
function addSonObject(dataArray, id, obj) {
	obj['pid'] = id;
	if (id == null || id == "") {
		dataArray.push(obj);
	} else {
		var lastPos = getLastSonPosArrayById(dataArray, id);
		if (lastPos != -1) {
			dataArray.splice(lastPos + 1, 0, obj);
		}
	}
}

/**
 * 将对象数组objArr变成对象编号为id的儿子，一般加在所有儿子的后面
 * @param {*} dataArray 主数组数据 
 * @param {*} id 主键值 
 * @param {*} objArr 儿子数组 
 */
function addSonObjectArr(dataArray, id, objArr) {
	if (objArr != undefined && objArr != null && objArr.length > 0) {
		objArr[0]['pid'] = id;
		if (id == null || id == "") {
			objArr.forEach(function (obj) {
				dataArray.push(obj);
			});
		} else {
			var lastPos = getLastSonPosArrayById(dataArray, id);
			if (lastPos != -1) {
				objArr.forEach(function (obj) {
					dataArray.splice(lastPos + 1, 0, obj);
					lastPos++;
				});
			}
		}
	}
}

/**
 * 递归删除
 * @param {*} dataArray 
 * @param {*} id 
 */
function deleteObjectById(dataArray, id) {
	var sonArray = getSonArray(dataArray, id);
	if (sonArray == null || sonArray == '' || sonArray.length == 0) {
		deleteJsonArrayById(dataArray, id);
	} else {
		for (var i = 0; i < sonArray.length; i++) {
			var sonObj = sonArray[i];
			deleteObjectById(dataArray, sonObj['id']);
		}
		deleteJsonArrayById(dataArray, id);
	}
}

/**
 * 将编号为id的对象提升
 * @param {*} dataArray 主数组数据 
 * @param {*} id 主键值 
 */
function upgradeObjectById(dataArray, id) {
	var selfObj = getObjFromArrayById(dataArray, id);
	var selfPid = selfObj['pid'];
	if (selfPid == null || selfPid == '') {
		return;
	} else {
		var pObj = getObjFromArrayById(dataArray, selfPid);
		if (pObj) {
			var selfPos = getPosArrayById(dataArray, id);
			var lastParentPos = getLastSonPosArrayById(dataArray, selfPid);
			var newArray = copyAllObjectIncludeChildren(dataArray, id);
			var newArrayLength = newArray.length;
			dataArray.splice(selfPos, newArrayLength);
			newArray[0]['pid'] = pObj['pid'];
			for (var i = 0; i < newArrayLength; i++) {
				dataArray.splice(lastParentPos - newArrayLength + i + 1, 0, newArray[i]);
			}
		} else {
			selfObj['pid'] = '';
		}
		return;
	}
}

/**
 * 将编号为id的对象下沉
 * @param {*} dataArray 主数组数据 
 * @param {*} id 主键值 
 */
function degradeObjectById(dataArray, id) {
	var selfObj = getObjFromArrayById(dataArray, id);
	var pid = selfObj['pid'];
	var bigBrother = null;
	for (var i = 0; i < dataArray.length; i++) {
		if (dataArray[i]['id'] == id) {
			break;
		} else {
			if (dataArray[i]['pid'] == pid) {
				bigBrother = dataArray[i];
			}
		}
	}
	var lowBrother = null;
	var flag = false;
	for (var i = 0; i < dataArray.length; i++) {
		if (dataArray[i]['id'] == id) {
			flag = true;
		}
		if (flag && dataArray[i]['pid'] == pid && dataArray[i]['id'] != id) {
			lowBrother = dataArray[i];
			break;
		}
	}
	if (bigBrother != null) {
		selfObj['pid'] = bigBrother['id'];
	}
	else if (lowBrother != null) {
		selfObj['pid'] = lowBrother['id'];
		var selfObjArr = copyAllObjectIncludeChildren(dataArray, id);
		deleteObjectById(dataArray, id);
		addSonObjectArr(dataArray, lowBrother['id'], selfObjArr);
	}
	return;
}
/**
 * 获取这个对象的数组，包括子孙也放入这个数组
 * @param {*} dataArray 
 * @param {*} id 
 */
function copyAllObjectIncludeChildren(dataArray, id) {
	var selfPos = getPosArrayById(dataArray, id);
	var selfLastPos = getLastSonPosArrayById(dataArray, id);
	var arr = [];
	for (var i = selfPos; i <= selfLastPos; i++) {
		arr.push(dataArray[i]);
	}
	return arr;
}

/**
 * 根据id获取所有的子对象数组，这里只是儿子，不是子孙
 * @param {*} dataArray 主数组数据
 * @param {*} id 主键值 
 */
function isHasSonArrayById(dataArray, id) {
	var sonArray = getSonArray(dataArray, id);
	if (sonArray != null && sonArray.length > 0) {
		return true;
	} else {
		return false;
	}
}

/**
 * 根据id获取说有的子对象数组，这里只是儿子，不是子孙
 * @param {*} dataArray 主数组数据
 * @param {*} id 主键值 
 */
function isHasSonUsingArrayById(dataArray, id) {
	var sonArray = getSonUsingArray(dataArray, id);
	if (sonArray != null && sonArray.length > 0) {
		return true;
	} else {
		return false;
	}
}

/**
 * 根据id获取所有的子对象数组，这里只是儿子，不是子孙
 * @param {*} dataArray 主数组数据
 * @param {*} id 主键值 
 */
function getSonArray(dataArray, id) {
	var arr = [];
	for (var i = 0; i < dataArray.length; i++) {
		if ((id != null && id != '') && dataArray[i]['pid'] == id) {
			arr.push(dataArray[i]);
		}
		if ((id == null || id == '') && (dataArray[i]['pid'] == null || dataArray[i]['pid'] == "")) {
			arr.push(dataArray[i]);
		}
	}
	return arr;
}

/**
 * 根据id获取没有被禁用（启用）的子对象数组，这里只是儿子，不是子孙
 * @param {*} dataArray 主数组数据
 * @param {*} id 主键值 
 */
function getSonUsingArray(dataArray, id) {
	var arr = [];
	for (var i = 0; i < dataArray.length; i++) {
		if ((id != null && id != '') && dataArray[i]['pid'] == id && dataArray[i]['proTaskStatus'] != "禁用") {
			arr.push(dataArray[i]);
		}
		if ((id == null || id == '') && (dataArray[i]['pid'] == null || dataArray[i]['pid'] == "") && dataArray[i]['proTaskStatus'] != "禁用") {
			arr.push(dataArray[i]);
		}
	}
	return arr;
}

/**
 * 将编号为id的对象的field字段求和，包括子孙的这个字段的值都要用递归求和
 * @param {*} dataArray 主数组数据 
 * @param {*} id 主键值
 * @param {*} field 
 */
function sumAllObjectByField(dataArray, id, field) {
	selfObj = getObjFromArrayById(dataArray, id);
	var feildValue = selfObj[field];
	var sonArray = getSonArray(dataArray, id);
	if (sonArray == null || sonArray.length == 0) {
		return feildValue;
	} else {
		feildValue = 0;
		sonArray.forEach(function (sonObj) {
			feildValue += sonObj[field] * 1;
			// feildValue += sumAllObjectByField(dataArray, sonObj['id'], field)*1;
		});
		selfObj[field] = feildValue;
		if (selfObj['pid'] != undefined && selfObj['pid'] != '') {
			sumAllObjectByField(dataArray, selfObj['pid'], field);
		}
		return feildValue;
	}
}

/*
 * 刷新字段field的值
 */
function calStartTime(dataArray, startTime) {
	calStartTimeByFieldAndId(dataArray, '', startTime);
}

/*
 * 刷新字段field的值
 */
function calStartTimeByFieldAndId(dataArray, id, startTime) {
	var sonArray = getSonArray(dataArray, id);
	var stime = startTime;
	for (var i = 0; i < sonArray.length; i++) {
		var obj = sonArray[i];
		obj['starttime'] = stime;
		var objId = obj['id'];
		if (isHasSonArrayById(dataArray, objId)) {
			calStartTimeByFieldAndId(dataArray, objId, stime);
		}
		var hour = stime.split(':')[0] * 1;
		var minute = stime.split(':')[1] * 1;
		var duration = obj['duration'] * 1;
		minute = minute + duration;
		var stime_hour = parseInt(minute / 60);
		var stime_minute = minute - 60 * stime_hour;
		stime_hour = parseInt((stime_hour + hour) % 24 * 1);
		stime = (stime_hour < 10 ? ('0' + stime_hour) : stime_hour) + ':' + (stime_minute < 10 ? ('0' + stime_minute) : stime_minute);
	}
}

/**
 * @param {*} dataArray 
 * @param {*} field 
 * @param {*} value 
 */
function isFromJsonByField(dataArray, field, value) {
	for (var i = 0; i < dataArray.length; i++) {
		if (dataArray[i][field] == value) {
			return true;
		}
	}
	return false;
}

/*
 * 刷新字段field的值
 */
function updateObjectByField(dataArray, field) {
	var arr = getSonArray(dataArray, '');
	arr.forEach(function (obj) {
		sumAllObjectByField(dataArray, obj['id'], field);
	});
}

/**
 * 获取哥哥在整个数组中的位置
 * @param {*} dataArray 
 * @param {*} id 
 */
function getBeforeBrotherPosById(dataArray, id) {
	var selfOBj = getObjFromArrayById(dataArray, id);
	var pid = selfOBj['pid'];
	var brotherArray = getSonArray(dataArray, pid);
	var pos = getPosArrayById(brotherArray, id);
	if (pos > 0) {
		brotherObj = brotherArray[pos - 1];
		brotherId = brotherObj['id'];
		return getPosArrayById(dataArray, brotherId);
	} else {
		return -1;
	}
}

/**
 * 获取弟弟在整个数组中的位置
 * @param {*} dataArray 
 * @param {*} id 
 */
function getAfterBrotherIdById(dataArray, id) {
	var selfOBj = getObjFromArrayById(dataArray, id);
	var pid = selfOBj['pid'];
	var brotherArray = getSonArray(dataArray, pid);
	var pos = getPosArrayById(brotherArray, id);
	if (pos < brotherArray.length - 1) {
		var brotherObj = brotherArray[pos + 1];
		var brotherId = brotherObj['id'];
		return brotherId;
	} else {
		return '';
	}
}

/**
 * 在兄弟间移动，移动到相邻的兄弟的上面
 * @param {*} dataArray 主数组数据 
 * @param {*} id 主键值 
 */
function upObjectById(dataArray, id) {
	var selfArray = copyAllObjectIncludeChildren(dataArray, id);
	var selfPos = getPosArrayById(dataArray, id);
	var beforeBrotherPos = getBeforeBrotherPosById(dataArray, id);
	if (beforeBrotherPos > -1) {
		if (selfPos != -1 && beforeBrotherPos != -1) {
			dataArray.splice(selfPos, selfArray.length);
		}
		for (var i = 0; i < selfArray.length; i++) {
			dataArray.splice(beforeBrotherPos + i, 0, selfArray[i]);
		}
	}
}

/**
 * 在兄弟间移动，移动到相邻的兄弟的下面
 * @param {*} dataArray 主数组数据 
 * @param {*} id 主键值 
 */
function downObjectById(dataArray, id) {
	var brotherId = getAfterBrotherIdById(dataArray, id);
	upObjectById(dataArray, brotherId);
}

/**
 * 重置编号，
 * @param {*} dataArray 主数组数据 
 * @param {*} field 编号对应数组字段，默认为no
 * @param {*} preArray 编号数组，如果为空，默认为['0','1','2','3','5','6','7','8','9','10',.....]
 */
function resetNoOfArray(dataArray, field, preArray) {
	if (field == null || field == "") {
		field = 'no';
	}
	resetNoOfArrayFun(dataArray, '', field, '', preArray);
}

/*
 * 这个函数不对外，是重置编号的递归函数
 */
function resetNoOfArrayFun(dataArray, pid, field, pre, preArray) {
	var sonArray = getSonArray(dataArray, pid);
	var j = 0;
	for (var i = 0; i < sonArray.length; i++) {
		var obj = sonArray[i];
		if (obj['proTaskStatus'] == '禁用') {
			obj[field] = "";
			continue;
		}
		if (preArray == null || preArray.length == 0) {
			var no = (j + 1) + "";
		} else {
			var no = preArray[j];
		}
		if (pre == null || pre == "") {
			var newepre = "" + no;
		} else {
			var newepre = pre + "." + no;
		}
		obj[field] = newepre;
		resetNoOfArrayFun(dataArray, obj['id'], field, newepre, preArray);
		j++;
	}
}

//***************************************************************************************//
//*****************************************其他方法***************************************//
//***************************************************************************************//

/*
 * 范围随机数
 */
function randomRange(start, end) {
	return Math.floor(Math.random() * (end - start + 1)) + start;
};

/*
 * 浏览器信息
 */
function browserInfo() {
	var ua = navigator.userAgent.toLowerCase();
	var info = {}
	if (/mobi/i.test(ua)) {
		info.isMobi = true; // 手机浏览器
	} else {
		info.isMobi = false; // 非手机浏览器
	}
	/*是否为微信浏览器*/
	info.isWeiXin = (/MicroMessenger/i.test(navigator.userAgent.toLowerCase()));
	//判断是否苹果移动设备访问
	info.isAppleMobileDevice = (/iphone|ipod|ipad|Macintosh/i.test(navigator.userAgent.toLowerCase()));
	//判断是否安卓移动设备访问
	info.isAndroidMobileDevice = (/android/i.test(navigator.userAgent.toLowerCase()));
	//判断是否移动设备访问
	info.isMobileUserAgent = (/iphone|ipod|android.*mobile|windows.*phone|blackberry.*mobile/i.test(window.navigator.userAgent.toLowerCase()));
	//浏览器类型
	info.type = getweb();
	return info;
}

/*
 * 浏览器信息
 */
function getweb() {
	if (!!window.ActiveXObject || "ActiveXObject" in window) {
		return "IE";
	}
	if (navigator.userAgent.indexOf("Firefox") != -1) {
		return "Firefox";
	}
	if (navigator.userAgent.indexOf("Chrome") != -1) {
		return "Chrome";
	}
	if (navigator.userAgent.indexOf("Safari") != -1) {
		return "Safari";
	}
}

/*
 * 设置cookie值
 */
function setCookie(name, value, Hours) {
	var d = new Date();
	var offset = 8;
	var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
	var nd = utc + (3600000 * offset);
	var exp = new Date(nd);
	exp.setTime(exp.getTime() + Hours * 60 * 60 * 1000);
	document.cookie = name + "=" + escape(value) + ";path=/;expires=" + exp.toGMTString() + ";domain=360doc.com;"
}

/*
 * 获取cookie值
 */
function getCookie(name) {
	var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
	if (arr != null) return unescape(arr[2]);
	return null
}

/*
 * 跳转链接
 */
function toUrl(url, self, clearRole=true, obj) {
	if (clearRole) {
		dataCenter.user.deleteDataRole();
	}
	dataCenter.saveSession();
	var rev = Math.ceil(Math.random()*100);
	var newurl=url+"?v="+rev;
	if(obj){
		for(var key in obj){
			newurl+="&"+key+"="+obj[key];
		}	
	}
	if (self) {
		window.location.href = newurl;
	} else {
		window.open(newurl);
	}
}

/*
 * uuid
 */
function uuid() {
	var s = [];
	var hexDigits = "0123456789abcdef";
	for (var i = 0; i < 36; i++) {
		s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
	}
	s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
	s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
	s[8] = s[13] = s[18] = s[23] = "-";

	var uuid = s.join("");
	return uuid;
}

/*
 * isIEBroswer 判断是否是IE
 */
function isIEBroswer() {
	if (!!window.ActiveXObject || "ActiveXObject" in window)
		return true;
	else
		return false;
}

/*
 * textarea自适应高度
 */
jQuery.fn.extend({
	autoHeight: function () {
		return this.each(function () {
			var $this = jQuery(this);
			if (!$this.attr('_initAdjustHeight')) {
				$this.attr('_initAdjustHeight', $this.outerHeight());
			}
			if ($(this).attr("disabled") == "disabled") {
				_adjustH(this);
			}
		});
		/**
		 * 重置高度 
		 * @param {Object} elem
		 */
		function _adjustH(elem) {
			var $obj = jQuery(elem);
			if (isEmpty($(elem).val())) {
				return $obj.height(50);
			}
			return $obj.css({
				'height': $obj.attr('_initAdjustHeight'),
				'overflow-y': 'hidden'
			})
				.css('max-height', '1000px').height(elem.scrollHeight);
		}
	}
});

/*
 * 获取页面名称
 */
function pageName() {
	var a = location.href;
	var b = a.split("/");
	var c = b.slice(b.length - 1, b.length).toString(String).split(".");
	return c.slice(0, 1)[0];
}

/**
 * 
 * @param {*} json 
 */
function jsonClone(json) {
	var jsonString = JSON.stringify(json);
	return JSON.parse(jsonString);
}

var observe;
if (window.attachEvent) {
	observe = function (element, event, handler) {
		element.attachEvent('on' + event, handler);
	};
} else {
	observe = function (element, event, handler) {
		element.addEventListener(event, handler, false);
	};
}

function bodyinit() {
	var text = document.getElementById('bodyinittext');

	function resize() {
		text.style.height = 'auto';
		var vHeight = text.scrollHeight + 2;
		text.style.height = vHeight + 'px';
	}
	/* 0-timeout to get the already changed text */
	function delayedResize() {
		window.setTimeout(resize, 0);
	}
	observe(text, 'change', resize);
	observe(text, 'cut', delayedResize);
	observe(text, 'paste', delayedResize);
	observe(text, 'drop', delayedResize);
	observe(text, 'keydown', delayedResize);

	text.focus();
	text.select();
	resize();
}

/*
 * 阻止BackSpace事件
 */
function banBackSpace(e) {
	var ev = e || window.event;
	//各种浏览器下获取事件对象
	var obj = ev.relatedTarget || ev.srcElement || ev.target || ev.currentTarget;
	//按下Backspace键
	if (ev.keyCode == 8) {
		var tagName = obj.nodeName //标签名称
		//如果标签不是input或者textarea则阻止Backspace
		if (tagName != 'INPUT' && tagName != 'TEXTAREA') {
			return stopIt(ev);
		}
		var tagType = obj.type.toUpperCase(); //标签类型
		//input标签除了下面几种类型，全部阻止Backspace
		if (tagName == 'INPUT' && (tagType != 'TEXT' && tagType != 'TEXTAREA' && tagType != 'PASSWORD')) {
			return stopIt(ev);
		}
		//input或者textarea输入框如果不可编辑则阻止Backspace
		if ((tagName == 'INPUT' || tagName == 'TEXTAREA') && (obj.readOnly == true || obj.disabled == true)) {
			return stopIt(ev);
		}
	}
}

function stopIt(ev) {
	if (ev.preventDefault) {
		//preventDefault()方法阻止元素发生默认的行为
		ev.preventDefault();
	}
	if (ev.returnValue) {
		//IE浏览器下用window.event.returnValue = false;实现阻止元素发生默认的行为
		ev.returnValue = false;
	}
	return false;
}

/*
 * 十六进制颜色值的正则表达式
 * RGB颜色转换为16进制
 */
var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
String.prototype.colorHex = function () {
	var that = this;
	if (/^(rgb|RGB)/.test(that)) {
		var aColor = that.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
		var strHex = "#";
		for (var i = 0; i < aColor.length; i++) {
			var hex = Number(aColor[i]).toString(16);
			if (hex === "0") {
				hex += hex;
			}
			strHex += hex;
		}
		if (strHex.length !== 7) {
			strHex = that;
		}
		return strHex;
	} else if (reg.test(that)) {
		var aNum = that.replace(/#/, "").split("");
		if (aNum.length === 6) {
			return that;
		} else if (aNum.length === 3) {
			var numHex = "#";
			for (var i = 0; i < aNum.length; i += 1) {
				numHex += (aNum[i] + aNum[i]);
			}
			return numHex;
		}
	} else {
		return that;
	}
};

/*
 * 16进制颜色转为RGB格式
 */
String.prototype.colorRgb = function () {
	var sColor = this.toLowerCase();
	if (sColor && reg.test(sColor)) {
		if (sColor.length === 4) {
			var sColorNew = "#";
			for (var i = 1; i < 4; i += 1) {
				sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
			}
			sColor = sColorNew;
		}
		//处理六位的颜色值
		var sColorChange = [];
		for (var i = 1; i < 7; i += 2) {
			sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
		}
		return "RGB(" + sColorChange.join(",") + ")";
	} else {
		return sColor;
	}
};

/*
 * 必填红色边框提示
 */
function setMustInputBorder(elem, mustInput, specialVertify) {
	if ($(elem).attr("disabled") != "disabled") {
		if (mustInput) {
			$(elem).css("border", "1px solid " + sysJson.color.mustInput);
			if (specialVertify) {
				$(elem).attr("specialVertify", "true")
			}
		} else {
			$(elem).css("border", "1px solid " + sysJson.color.maybeInput).removeAttr("specialVertify");
		}
	}
}

/*
 * 获取当前相对路径的方法
 */
function GetUrlRelativePath() {
	var url = document.location.toString();
	var arrUrl = url.split("//");

	var start = arrUrl[1].indexOf("/");
	var relUrl = arrUrl[1].substring(start);//stop省略，截取从start开始到结尾的所有字符

	if (relUrl.indexOf("?") != -1) {
		relUrl = relUrl.split("?")[0];
	}
	return relUrl;
}