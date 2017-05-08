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

### gulp有什么作用？

gulp是可以自动化执行任务的工具，比如下面这些需要手工重复得执行的操作:

- 把文件从开发目录拷贝到生产目录
- 把多个 JS 或者 CSS 文件合并成一个文件
- 对JS文件和CSS进行压缩
- 把sass或者less文件编译成CSS
- 压缩图像文件
- 创建一个可以实时刷新页面内容的本地服务器

只要你觉得有些动作是要重复去做的,就可以把这些动作创建成一个gulp任务；然后在指定的条件下自动执行就可以；或者设置为编辑器的快捷键，这样就不用你花时间去重复做某些没有意义的事情了；

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

假设你已经配置好了node，可以直接在命令行里安装

全局安装

    $ npm install --global gulp

作为项目的开发依赖（devDependencies）安装：

    $ npm install --save-dev gulp

如果您在安装的时候遇到了麻烦，您可以点击  [gulp安装教程](https://translate.google.cn/) 进行详细查看；

### 运行gulp

注意： 在项目根目录下创建一个名为 gulpfile.js 的文件：（需要手动创建，gulpfile这个文件非常重要，如果您没有创建，那就肯定用不了gulp）

    var gulp = require('gulp');
     gulp.task('hello', function () {
       console.log('您好');
     });

在命令行里，直接输入下面代码即可执行；打开命令行工具，进入到项目所在的目录，然后输入：

    $ gulp hello

好了，现在你已经完成gulp的hello word了；下面看些入门的东西（如果这部分你搞不定，可以看[gulp运行教程](https://translate.google.cn/) 进行研究下）；

### gulp核心API

gulp因为简单易用，所以也只有4个核心API，虽然API比较少，但并不等于啥事都做不了，实际上，掌握这四个API就可以完成日常的大多数构建了；

- gulp.task()       //定义一个任务，任务的名字推荐仔细填写，方便维护
- gulp.src()        //指定gulp需要处理哪些文件（以哪些文件为初始文件）
- gulp.dest()       //指定gulp处理好的文件储存到哪里；（如果某文件夹不存在，将会自动创建它）
- gulp.watch()      //监视文件，并定义了文件发生改动时要做的事情；

##### gulp.src的用法

    gulp.src('client/js/**/*.js') // 匹配 'client/js/somedir/somefile.js' 并且将 `base` 解析为 `client/js/`
      .pipe(minify())
      .pipe(gulp.dest('build'));  // 写入 'build/somedir/somefile.js'

    gulp.src('client/js/**/*.js', { base: 'client' })
      .pipe(minify())
      .pipe(gulp.dest('build'));  // 写入 'build/js/somedir/somefile.js'

如果你需要处理复杂的源文件筛选，可查看[gulp.src()从文件夹中排除或筛选多个文件](https://translate.google.cn/)；

加上 [gulp配合node globs配置文件筛选 ](https://translate.google.cn/)更佳；

##### gulp.task的写法

    gulp.task('somename', function() {
      // 做一些事
    });

比如你可以把上面的这么写；

    gulp.task('somename', function() {
        gulp.src('client/js/**/*.js') // 匹配 'client/js/somedir/somefile.js' 并且将 `base` 解析为 `client/js/`
          .pipe(minify())
          .pipe(gulp.dest('build'));  // 写入 'build/somedir/somefile.js'
    });

如果感兴趣，可以查看 [gulp.task的用法和参数](https://translate.google.cn/)

##### gulp.dest的写法

能被 pipe 进来，并且将会写文件。并且重新输出（emits）所有数据，因此你可以将它 pipe 到多个文件夹。如果某文件夹不存在，将会自动创建它。

    gulp.src('./client/templates/*.jade')
      .pipe(jade())
      .pipe(gulp.dest('./build/templates'))
      .pipe(minify())
      .pipe(gulp.dest('./build/minified_templates'));

了解更多，请点击 [gulp.dest对应输出目录和参数详解](https://translate.google.cn/)

##### gulp.watch的参数和使用方法

      gulp.task('uglify',function(){
        //do something
      });
      gulp.task('reload',function(){
        //do something
      });
      gulp.watch('js/**/*.js', ['uglify','reload']);

[gulp.watch的参数和使用方法](https://translate.google.cn/)

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