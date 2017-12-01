/**
 * Created by broszhu on 2017/5/10.
 */
var gulp = require('gulp');
var uglify = require('gulp-uglify');

//https://github.com/scniro/gulp-clean-css
var cleanCSS = require('gulp-clean-css');//gulp-minify-css 已经不推荐使用

var gutil = require('gulp-util');

var rename = require("gulp-rename");//https://www.npmjs.com/package/gulp-rename

//压缩JS

var miniJSAry=[
    './src/payopen-app.js',
    './src/payopen-apps-index.js'
];
gulp.task('mini-js', function () {
    // 1. 找到文件
    gulp.src(miniJSAry)
    // 2. 压缩文件
        .pipe(uglify({
            //"gulp-uglify": "^3.0.0" 排除关键字 由 except 改为了 reserved
            mangle: {reserved: ['require', 'exports', 'module', '$']}//排除混淆关键字
        }))
        .on('error', function (err) {
            gutil.log(gutil.colors.red('[Error]'), err.toString());
        })
        // 3. 另存压缩后的文件
        .pipe(gulp.dest('dist/'))
});

//压缩CSS
gulp.task('minify-css', function () {
    gulp.src('css/**/*.css')
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('mini-css'));
});

gulp.task('hello', function () {
    console.log('您好');
});

gulp.task("default", ['hello', 'mini-js']);

//监听文件
gulp.task("watch-js", function () {
    gulp.watch('src/*.js', ['mini-js']);
});

//修改名字
gulp.task("rename-js", function () {
    gulp.src("./src/**/*.js")
        .pipe(rename(function (path) {
            // path.dirname += "/dirname";//一般不需要全部多加一层；
            path.basename += "-modi";
            path.extname = ".js"
        }))
        .pipe(gulp.dest("./dist")); //移动到dist里
});


