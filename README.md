### gulp

- gulp是什么,有什么作用,能做哪些事情？
- gulp的原理和工作方式
- 安装gulp
- 运行gulp
- gulp核心API详解
    - glob语法
- gulp参数
- gulp任务实例
- gulp插件和用法
- gulpfile.js源码解析
- 编写基于gulp的插件
- gulp资源地址


---

这里假设你已经在使用Node.js和npm了，如果您还不了解或者没有安装node，可以根据自己当前的系统查看nodeJs的配置方法；

- [window nodejs安装以及环境配置]()
- [mac下安装nodejs以及环境变量配置]()
- [linux下的node.js安装和境变量配置]()

### gulp有什么作用？

gulp是可以自动化执行任务的工具，比如下面这些需要手工重复得执行的操作:

- 把文件从开发目录拷贝到生产目录
- 把多个 JS 或者 CSS 文件合并成一个文件
- 对JS文件和CSS进行压缩
- 把sass或者less文件编译成CSS
- 压缩图像文件
- 创建一个可以实时刷新页面内容的本地服务器

只要你觉得有些动作是要重复去做的,就可以把这些动作创建成一个gulp任务；然后在指定的条件下自动执行就可以；或者设置为编辑器的快捷键，这样就不用你花时间去重复做某些没有意义的事情了；

当前大多数的情况下是，你配置了一些任务，检测文件夹下某些的文件，如果目标文件有发生改变，立刻执行你指定的任务，比如你观察src下面的所有js文件，当任何Js文件发生改变时，把js文件发布到测试环境上，这样就大大节约了你的时间；

别人的工具也可以实现类似功能，但是因为gulp配置超级简单，并且基于nodeJs的流原理实现，所以被很多开发者青睐；

了解更多用途，请点击 [gulp是什么,有什么作用,能做哪些事情？](https://translate.google.cn/)

### gulp的工作原理

![](./img/pipe.jpg)

上面这张图片可以简单粗暴的诠释gulp的工作原理，gulp是基于nodejs的流原理实现构建的（上一级的输出，直接变成下一级的输入）；

gulp的使用流程一般是
- 首先通过gulp.src()方法获取到想要处理的文件流
- 然后把文件流通过pipe方法导入到gulp的插件中
- 最后把经过插件处理后的流再通过pipe方法导入到gulp.dest()中
- gulp.dest()方法则把流中的内容写入到文件中

了解更多原理，请点击 [gulp的原理和工作方式](https://translate.google.cn/)

### 安装gulp

假设你已经配置好了node，可以直接在命令行里安装（如果没有配置好nodeJs，参见上面的nodeJs安装方法）；

建议您gulp全局安装

    $ npm install --global gulp

但是大多数的情况下，我们都是作为项目的开发依赖（devDependencies）安装：

    $ npm install --save-dev gulp

如果您在安装的时候遇到了麻烦，您可以点击  [gulp安装教程](https://translate.google.cn/) 进行详细查看；

这里的 `--save-dev`是 npm管理项目中的经典配置，这样你在GitHub或者别的途径分享给别人的时候，只需要给对象一个`package.json`的文件就可以了，如果你对npm 配置文件还不了解，可查看 [npm中package.json的作用和详解]()

### 准备运行gulp

注意： **在项目根目录下创建一个名为 gulpfile.js 的文件**：（需要手动创建，gulpfile这个文件名敏感，必须为gulpfile.js，这个文件非常重要，如果您没有创建，那就肯定用不了gul，下面的文章也没有必要看了p，切记！！！）

在gulp文件中输入下面的代码

    var gulp = require('gulp');
     gulp.task('hello', function () {
       console.log('您好');
     });

在命令行里，直接输入下面代码即可执行；打开命令行工具，进入到项目所在的目录，然后输入：

    $ gulp hello

好了，如果执行成功，那么你已经完成gulp的hello word了；下面看些入门的东西（如果这部分你搞不定，可以看[gulp运行教程](https://translate.google.cn/) 进行研究下）；

感兴趣的可以看看 [gulp和grunt哪个好？有什么区别？]() 和 [为什么选择Gulp]()

### gulp核心API

gulp因为简单易用，所以也只有4个核心API，虽然API比较少，但并不等于啥事都做不了，实际上，掌握这四个API就可以完成日常的大多数构建了；

- gulp.task()       //定义一个任务，任务的名字推荐仔细填写，方便维护
- gulp.src()        //指定gulp需要处理哪些文件（以哪些文件为初始文件）
- gulp.dest()       //指定gulp处理好的文件储存到哪里；（如果某文件夹不存在，将会自动创建它）
- gulp.watch()      //监视文件，并定义了文件发生改动时要做的事情；

##### gulp.src的用法

它的参数表示所要处理的文件，这些指定的文件会转换成数据流

    gulp.src('client/js/**/*.js') // 匹配 'client/js/somedir/somefile.js' 并且将 `base` 解析为 `client/js/`
      .pipe(minify())
      .pipe(gulp.dest('build'));  // 写入 'build/somedir/somefile.js'

    gulp.src('client/js/**/*.js', { base: 'client' })
      .pipe(minify())
      .pipe(gulp.dest('build'));  // 写入 'build/js/somedir/somefile.js'

      js/app.js：指定确切的文件名。
      js/*.js：某个目录所有后缀名为js的文件。
      js/**/*.js：某个目录及其所有子目录中的所有后缀名为js的文件。
      !js/app.js：除了js/app.js以外的所有文件。

src方法的参数还可以是一个数组，用来指定多个成员。

    gulp.src(['js/**/*.js', '!js/**/*.min.js'])


如果你需要处理复杂的源文件筛选，可查看[gulp.src()从文件夹中排除或筛选多个文件](https://translate.google.cn/)；

加上 [gulp配合node globs配置文件筛选 ](https://translate.google.cn/)更佳；

##### gulp.dest的写法

dest方法将管道的输出写入文件，同时将这些输出继续输出，所以可以依次调用多次dest方法，将输出写入多个目录。如果有目录不存在，将会被新建。

    gulp.src('./client/templates/*.jade')
      .pipe(jade())
      .pipe(gulp.dest('./build/templates'))
      .pipe(minify())
      .pipe(gulp.dest('./build/minified_templates'));

est方法还可以接受第二个参数，表示配置对象

    gulp.dest('build', {
      cwd: './app',
      mode: '0644'
    })

配置对象有两个字段。cwd字段指定写入路径的基准目录，默认是当前目录；mode字段指定写入文件的权限，默认是0777。

了解更多，请点击 [gulp.dest对应输出目录和参数详解](https://translate.google.cn/)

##### gulp.task的写法

task方法用于定义具体的任务。它的第一个参数是任务名，第二个参数是任务函数。下面是一个非常简单的任务函数。

    gulp.task('somename', function() {
         //做一些事
         console.log('Hello world!');
    });

比如你可以把上面的这么写；

    gulp.task('somename', function() {
        gulp.src('client/js/**/*.js') // 匹配 'client/js/somedir/somefile.js' 并且将 `base` 解析为 `client/js/`
          .pipe(minify())
          .pipe(gulp.dest('build'));  // 写入 'build/somedir/somefile.js'
    });

task方法还可以指定按顺序运行的一组任务。

    gulp.task('build', ['css', 'js', 'imgs']);

上面代码先指定build任务，它由css、js、imgs三个任务所组成，task方法会并发执行这三个任务。注意，由于每个任务都是异步调用，所以没有办法保证js任务的开始运行的时间，正是css任务运行结束。

如果希望各个任务严格按次序运行，可以把前一个任务写成后一个任务的依赖模块。

    gulp.task('css', ['greet'], function () {
       // Deal with CSS here
    });

上面代码表明，css任务依赖greet任务，所以css一定会在greet运行完成后再运行。

task方法的回调函数，还可以接受一个函数作为参数，这对执行异步任务非常有用。

    // 执行shell命令
    var exec = require('child_process').exec;
    gulp.task('jekyll', function(cb) {
      // build Jekyll
      exec('jekyll build', function(err) {
        if (err) return cb(err); // return error
        cb(); // finished task
      });
    });

如果一个任务的名字为default，就表明它是“默认任务”，在命令行直接输入gulp命令，就会运行该任务。

    gulp.task('default', function () {
      // Your default task
    });
    // 或者
    gulp.task('default', ['styles', 'jshint', 'watch']);

执行的时候，直接使用gulp，就会运行styles、jshint、watch三个任务。

如果感兴趣，可以查看 [gulp.task的用法和参数](https://translate.google.cn/)

##### gulp.watch的参数和使用方法

watch方法用于指定需要监视的文件。一旦这些文件发生变动，就运行指定任务。

    gulp.task('watch', function () {
       gulp.watch('templates/*.tmpl.html', ['build']);
    });

上面代码指定，一旦templates目录中的模板文件发生变化，就运行build任务。

      gulp.task('uglify',function(){
        //do something
      });
      gulp.task('reload',function(){
        //do something
      });
      gulp.watch('js/**/*.js', ['uglify','reload']);

watch方法也可以用回调函数，代替指定的任务。

    gulp.watch('templates/*.tmpl.html', function (event) {
       console.log('Event type: ' + event.type);
       console.log('Event path: ' + event.path);
    });

另一种写法是watch方法所监控的文件发生变化时（修改、增加、删除文件），会触发change事件。可以对change事件指定回调函数。

    var watcher = gulp.watch('templates/*.tmpl.html', ['build']);

    watcher.on('change', function (event) {
       console.log('Event type: ' + event.type);
       console.log('Event path: ' + event.path);
    });

除了change事件，watch方法还可能触发以下事件。

- end：回调函数运行完毕时触发。
- error：发生错误时触发。
- ready：当开始监听文件时触发。
- nomatch：没有匹配的监听文件时触发。

watcher对象还包含其他一些方法。

- watcher.end()：停止watcher对象，不会再调用任务或回调函数。
- watcher.files()：返回watcher对象监视的文件。
- watcher.add(glob)：增加所要监视的文件，它还可以附件第二个参数，表示回调函数。
- watcher.remove(filepath)：从watcher对象中移走一个监视的文件。

[gulp.watch的参数和使用方法详解](https://translate.google.cn/)

[gulp watch 多个任务]()

### gulp基本任务的写法

##### 复制单个文件

     var gulp = require('gulp');
         gulp.task('copy-html',function(){
             return gulp.src('app/index.html').pipe(gulp.dest('dist'));
         });

##### 复制多个文件

    var gulp = require('gulp');
    //复制图片
    gulp.task('copy-images',function(){
        return gulp.src('app/imgs/*.jpg')
        .pipe(gulp.dest('dist'));
    });

    /**
     * 1. {} 里可以指定多个扩展名
     * 2. * 匹配所有的字符，除了路径分隔符 /
     * 3. ** 匹配所有的字符，包括路径分隔符 /
     */
    gulp.task('copy-images',function(){
        return gulp.src('app/imgs/**/*.{jpg,png}')
        .pipe(gulp.dest('dist'));
    });

    /**
     * 1. 匹配多个目录 glob
     * 2. 可以填写一个数组
     */
    gulp.task('copy-other',function(){
        return gulp.src(['app/css/*.css','app/js/*.js'],{base:'app'})
        .pipe(gulp.dest('dist'));
    });

    /**
     * 1. 匹配多个目录 glob
     * 2. !表示 排除一个文件
     */
    gulp.task('copy-other',function(){
        return gulp.src(['app/css/*.css','app/js/*.js'
        ,'!app/js/*.tmp.js'],{base:'app'})
        .pipe(gulp.dest('dist'));
    });

##### 组合任务

    var gulp = require('gulp');
    gulp.task('copy-html',function(){
        return gulp.src('app/index.html').pipe(gulp.dest('dist'));
    });

    gulp.task('copy-images',function(){
        return gulp.src('app/imgs/**/*.{jpg,png}').pipe(gulp.dest('dist'));
    });

    gulp.task('copy-other',function(){
        return gulp.src(['app/css/*.css','app/js/*.js','app/js/*.tmp.js'],{base:'app'}).pipe(gulp.dest('dist'));
    });


    gulp.task('default',['copy-html','copy-images','copy-other'],function(){
        console.log('全部拷贝任务执行完毕!');
    });

##### 监听任务

使用 gulp 的 watch 这个方法，我们可以去监视一些文件，当这些文件发生变化的时候，立即去执行一些指定的任务

    var gulp = require('gulp');
    gulp.task('copy-html',function(){
        return gulp.src('app/index.html')
        .pipe(gulp.dest('dist'));
    });

    gulp.task('copy-images',function(){
        return gulp.src('app/imgs/**/*.{jpg,png}',{base:'app'})
        .pipe(gulp.dest('dist'));
    });

    gulp.task('copy-other',function(){
        return gulp.src(['app/css/*.css','app/js/*.js'
        ,'app/js/*.tmp.js'],{base:'app'}).pipe(gulp.dest('dist'));
    });

    //在执行watch的时候会监控index.html文件的变化，发生变化后可以执行拷贝html的任务
    gulp.task('default',function(){
        gulp.watch('app/index.html',['copy-html']);
        gulp.watch('app/imgs/**/*.{jpg,png}',['copy-images']);
        gulp.watch(['app/css/*.css','app/js/*.js'
        ,'app/js/*.tmp.js'],['copy-other']);
    });

[gulp任务完成后执行指定任务]()

### gulp插件和用法

gulp提供了一些很实用的接口，但本身并不能做太多的事情 可以读取文件、写入文件以及监控文件等一少部分功能 其它实用的功能都是依靠插件来进行扩展的 这些插件可以实现比如

- 编译 Sass：gulp-sass
- 编译 Less：gulp-less
- 合并文件：gulp-concat
- 压缩js 文件：gulp-uglify
- 重命名js文件：gulp-rename
- 优化图像大小：gulp-imagemin
- 压缩css 文件：gulp-minify-css
- 创建本地服务器：gulp-connect
- 实时预览 gulp-connect


###### 资源

https://zhongsp.gitbooks.io/typescript-handbook/content/doc/handbook/tutorials/Gulp.html

http://i5ting.github.io/stuq-gulp/