## 前端框架api使用说明文档 （修改中）

- [ ] 添加列表

- [ ] 添加简单说明

- [ ] 添加简单示例



### 核心框架API：

#### 列表方法：

##### 1.`getListBlockData(listId, fomId)`

- 根据配置自动从获取数据，渲染列表
- 表格可配置分页，系统会自动渲染分页，添加分页事件
- 可配置基础数据，系统自动渲染（下拉框）
- 可配置接口筛选，排序

##### 2.`renderListByData(listId, data, formId)`

使用传入的数据渲染列表，其他同getListBlockData

##### 3.`getJsonFromListForm(tableListId, formId)`

获取listForm数据，返回对象数组【{}，{}】

##### 4.`checkListFormMustInput(tableListId, formId)`

检查必填项，需要配置mustInput

##### 5.`returnListTempByData(listId, listInfos)`

结合数据和模板，返回列表dom



#### form方法：

##### 1.`serializeForm(formId)`

获取表单数据

- 如果formId存在，会把数据缓存在 `dataCenter['form'][formId]['down']['formInfo']`
- 对与id字段，如果配置`dataCenter['form'][formId].infoId`存在，会使用infoId，而不会使用页面上的

##### 2.`getAllFormBlockData(formId)`

根据配置，从后台获取数据，渲染表单

##### 3.`renderFormByData(formId,data)`

根据传入数据渲染页面

##### 4.`renderForm（formId）`

根据配置渲染页面,一般是先赋值`dataCenter['form'][formId]['down']['formInfo']`之后掉用该方法。

会渲染

##### 5.`submit(formId, err)`

提交form

##### 6.`submitListForm(listId,formId,failCallback,err)`

整体提交列表中的所有form

##### 7.`deleteInfoByIds(classid, infoids, success, err)`

根据classid和infoids批量删除信息

##### 8.`checkMustInput(formId)`

提交时检验必填项,将所有的没有填写的必填项返回

##### 9.`checkMaybeInput(formId)` 

提交时检验可填项项,将所有的没有填写的可填项返回



### 接口方法：

##### 1.`saveOrUpdate(classId, data, callback)`

保存或者更新，data.id存在时是更新

##### 2.`getInfoListByClassId(status, classid, callback)`

查询列表信息

##### 3.`updateInfoByClassId(classid, InfoJson, callback)`

根据classid更新表单信息

##### 4.`updateListInfoByClassId(classid, InfoJsonList, callback)`

根据classid更新数组信息

##### 5.`loopListGetData(dataA, callback, saveToField)`

根据条件同时获取多表的数据

##### 6.`loopListInterface(dataA, callback)`

循环调接口更新数据列表(并发执行，多张表)

##### 7.`loopListInterfaceOfDelete(dataA, callback)`

循环调接口删除数据列表(并发执行，多张表)

##### 8.`loopInterface(classId, dataA, callback)`

循环调接口更新数据列表(并发执行)

##### 9.`saveList(listId, callback)`

保存数据列表数据，如果dataCenter.list[listId].deleteIds有数据，会自动删除

##### 10.`delAllTableByCondition(tableDatas, callback)`

批量删除(多表同时)<先根据条件获取数据，然后再根据ID删除>

### 公共方法（常用的）:

#### 字符串方法：

##### 1.`trim(str, type)`

去除空格 type 1-所有空格 2-前后空格 3-前空格 4-后空格

##### 2.`upDigit(n)`

现金额大写转换函数 

```javascript
`upDigit(168752632)`-->"人民币壹亿陆仟捌佰柒拾伍万贰仟陆佰叁拾贰元整"
```

##### 3.`formatText(str, size=3, delimiter='-')`

格式化处理字符串 

```javascript
formatText('1234asda567asd890') ==>"12,34a,sda,567,asd,890"
```

##### 4.`html2Escape(html)`

html字符串转码

##### 5.`escape2Html(str)`

字符串解码

##### 6.`escapeObjToHtmlObj(obj)`

转码对象转成正常对象，根据`sysJson['decode']`

##### 7.`htmlObjToEscapeObj(htmlobj)`

正常对象转成转码对象

##### 8.`sNotEmpty(obj)`

字符串不为空判断

##### 9.`isEmpty(obj)`

字符串为空判断

##### 10.`firstCase(str)`

字符串首字符大写

##### 11.`temEnginLite(listInfos, tem)`

字符模板渲染Lite

##### 12.`temEngin(listInfos, tem)`

字符模板渲染，处理了值为json的情况，同时会自动解压

<!--示例-->

```javascript
temEngin(sections, "<th>{{title}}</th>")
```



#### 数字金额

##### 1.`checkType(str, type)`

检测字符串类型，email，phone，tel，number，english，text，chinese，lower，upper

```javascript
checkType('12423563@gmail.com', 'email')
=> true
checkType('18366880000', 'phone')
=> true
checkType('abcDEF', 'english')
=> true
checkType('阿西吧', 'chinese')
=> true
checkType('abcd', 'lower')
=> true
checkType('GOOD', 'upper')
=> true
checkType('0564-5391987', 'tel')
=> true
```

##### 2.`$(selector).numeral(b,t)`

限制数字输入。b=true只能输入浮点数，t=true输入自动添加千分位分隔符

```js
//只能输入数字和小数点
$("input[name=liyong]").numeral(true);
$('input[name=danjia],input[name=shuliang],input[name=danjia]').numeral(true);
```

##### 3.`numeralBySelector(select, bl, tl, pos)`

 限制金额输入、兼容浏览器、屏蔽粘贴拖拽等

 select页面元素逗号隔开（或者选择器），bl是否可以输入小数，tl是千位符，pos保留几位小数，默认2位

```javascript
numeralBySelector($('input[name=nnnn]'), false, false);
```

##### 4.`upDigit(n)`

现金额大写转换函数

```javascript
upDigit(168752632)
=> "人民币壹亿陆仟捌佰柒拾伍万贰仟陆佰叁拾贰元整"
upDigit(-1693)
=> "欠人民币壹仟陆佰玖拾叁元整"
```

##### 5.`toNum(str)`

将千位符类型转成普通数字

```javascript
toNum('12432,25345,46')
=> 124322534546
```

##### 6.`numtoth(num)`

千分位分割，有小数位保留两位

```javascript
numtoth(124322534546)
"124,322,534,546"
```

##### 7.`checkNumber(theObj)`

验证字符串是否是数字

```javascript
checkNumber(124322534546)
=> true
checkNumber('12432-25345-46')
=> false
```

##### 8.`isJSON(str)`

判断是否是json字符串

```javascript
isJSON(123)
=> undefined
isJSON("123")
=> false
isJSON(JSON.stringify({a:1}))
=> true
```

##### 9.`RecursiveEliminationZero(value)`

消除数字前的0---value只能是字符串?

```javascript
RecursiveEliminationZero('001234567')
=> "1234567"
```

##### 10.`toThousands(num)`

将普通数字转成千位符类型的数字

```javascript
toThousands(001234567)
=> "342,391.00"
toThousands('001234567')
=> "001,234,567.00"
toThousands('001abc4567')
=> "0,01a,bc4,567.00"
```

##### 11.`thousands2Num(str)`

将千位符类型转成普通数字

```javascript
thousands2Num(001234567)
=> 342391
thousands2Num('001234567')
=> 1234567
thousands2Num('1234567')
=> 1234567
thousands2Num("342,391.00")
=> 342391
thousands2Num("001,234,567.00")
=> 1234567
```

##### 12.`sestrictType(id)`

初始化页面限制输入,系统自动调用,在元素上配置

```javascript
<input sestrictType='integer'>
等同 numeralBySelector($(item), false, false);
<input sestrictType='decimal-1'>
等同 numeralBySelector($(item), true, true, 1);
<input sestrictType='decimal-2'>
等同 numeralBySelector($(item), true, true, 2);
```



#### 日期时间

##### 1.`stampToDate(newstime, type)` 

时间戳转化

```javascript
timeStampNow()
==> 1594780715
stampToDate(1594780715, 1)
==> "2020-07-15 "
stampToDate(1594780715, 2)
==> "2020-07-15 10:38:"
stampToDate(1594780715)
==> "2020-07-15 10:38:35"
```

##### 2.`timeStampNow()` 

当前时间戳（10位）

```javascript
timeStampNow()
==> 1594780843
```

##### 3.`timeStamp(time)` 

 时间转化为时间戳

```javascript
timeStamp('2020-11-11')
==> 1605024000
timeStamp('2020/11/11')
==> 1605024000
timeStamp('2020-07-15 10:38:35')
==> 1594780715
```

##### 4.`getEndTime(endTime)` 

到某一个时间的倒计时

```javascript
getEndTime('2027/7/22 16:0:0')
==> {d: 2563, h: 5, m: 14, s: 39}
```

#####  5.`getWeekFromDate(dateString)` 

根据日期获取周数。日期的格式是"2018-12-11"，返回值是数组，数组第一个值是年，第二个值是周

```javascript
getWeekFromDate("2018-12-11")
==> [2018, 50]
getWeekFromDate("2027/7/22")
==>[2027, 26]
```

##### 6.`addOneWeek(year, weeks)` 

周数加一

```javascript
addOneWeek(2020,11)
=> [2020, 12]
addOneWeek(2020,53)
=> [2021, 1]
```

##### 7.`subOneWeek(year, weeks)` 

周数减一

```javascript
subOneWeek(2020,44)
=> [2020, 43]
subOneWeek(2020,1)
=> [2019, 53]
```

##### 8.`getNowFormatDate()` 

确认日期

```javascript
getNowFormatDate()
=> "2020-07-15"
```

##### 9.`getNewData(dateTemp, days)` 

计算日期加上指定天数得到新的日期

```javascript
getNewData("2020-07-15", 10)
=> "2020-07-25"
getNewData("2020-07-15", 100)
=> "2020-10-23"
getNewData("2020/07/15", 100)
=> "2020-10-23"
getNewData("2020-07-15", -100)
=> "2020-04-06"
```

##### 10.`dateDifference(sDate1, sDate2)` 

两个时间相差天数 兼容firefox chrome。sDate1和sDate2是2006-12-18格式

```javascript
getNewData("2020/07/15", 100)
=> "2020-10-23"
dateDifference("2020/07/15", "2020-10-23")
=> 100
```

##### 11.`dateDiffFromDateString(sDate1, sDate2)` 

计算两个日期之间的天数 。sDate1和sDate2是2017-9-25格式 

```javascript
dateDiffFromDateString("2020/07/15", "2020-10-23")
=> -100
```

##### 12.`dateDiffFromDate(date1, date2)` 

 计算两个日期之间的天数，sDate1和sDate2是13位时间戳格式 

```javascript
var t1 = timeStamp('2020/11/11')*1000
var t2 = timeStamp('2020-07-15 10:38:35')*1000

dateDiffFromDate(t1, t2)
=> 118
dateDiffFromDate(t2, t1)
=>118
```

##### 13.`getDatesFromWeek(year, weeks)` 

根据年和周数获取当周的天数区间

```javascript
getDatesFromWeek(2020, 20)
=> ["2020-05-10", "2020-05-11", "2020-05-12", "2020-05-13", "2020-05-14", "2020-05-15", "2020-05-16"]
```

##### 14.`getNowDate()`



##### 15.`addDate(date, days)` 

日期，在原有日期基础上，增加days天数，默认增加1天

```javascript
addDate('2020-11-1', 22)
=> "2020-11-23"
addDate('2020-11-1', -2)
=> "2020-10-30"
```

##### 16.`Date.prototype.format` 

日期格式化

##### 17.`GetDateStr = function (date, AddDayCount)` 

 获取AddDayCount天后的日期

```javascript
Date()
=> "Wed Jul 15 2020 11:22:57 GMT+0800 (中国标准时间)"
GetDateStr(Date(),10)
=> "2020-07-25"
GetDateStr("2020-07-25",10)
=> "2020-08-04"
```

##### 18.`datedifference(sDate1, sDate2)` 

计算两个时间相差天数

```javascript
datedifference("2020-08-04", "2020-08-06")
=> 2
```

##### 19.`timestampToDate(shijian)` 

时间戳(10位)转时间

```javascript
timestampToDate(Date.parse("2020-08-04")/1000)
"2020-08-04 08:00:00"
```

##### 20.`getNMYear(time, n)` 

获取当月后n个月的年份,time只能是 YYYY-MM-DD

```javascript
getNMYear("2020-08-04", 2)
=>2020
getNMYear("2020-08-04", 12)
=>2021
getNMYear("2020-08-04", 22)
=>2022
```

##### 22.`getNMCYear(time, n)` 

获取当月后n个月的完整年月日,time只能是 YYYY-MM-DD

```javascript
getNMCYear("2020-08-04", 2)
=>"2020-10-04"
getNMCYear("2020-08-04", 12)
=>"2021-08-04"
getNMCYear("2020-08-04", -2)
=>"2020-06-04"
```

























































##### 1.`getObjFromArrayById`

##### 2.`getObjFromArrayByField`

##### 3.`getJsonFromListForm(listId, 'contentForm')`

##### 4.`toThousandsfomatFloat(sums.priceTotal,6)`

##### 5.`toThousandsfomatFloat(src, pos)` 

##### 6.`summaryFields(updateFields, array)`
```

```