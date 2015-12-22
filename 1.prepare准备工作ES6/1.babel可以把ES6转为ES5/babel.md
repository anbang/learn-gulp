#安装babel 5.8.3
npm install babel@5.8.3 -g

#基本命令
- babel 执行转换
- babel -o 指定输出的文件
- babel -w 启动监控，发现文件改动后立刻转成ES5
- babel -d 指定编译目录；把指定目录内的文件全都转为ES5；
- babel -s 编译后的代码对编译前代码的映射？？不确定，相当于sourcemap
- babel --help 查看帮助

#操作命令
### babel -o  把箭头函数.js转为jiantou.js文件；
-  babel 箭头函数.js -o jiantou.js  

