//声明依赖加载项
var gulp = require("gulp");
var rev = require("gulp-rev"); //对gulp插件的依赖项，给每个文件添加版本号
var revReplace = require("gulp-rev-replace"); //更新index.html的引用
var useref = require("gulp-useref"); //合并文件，需要写注释，参考官方文档
var filter = require("gulp-filter"); //过滤器
var uglify = require("gulp-uglify"); //压缩JS代码的插件
var csso = require("gulp-csso"); //压缩CSS代码的插件

gulp.task("default",function(){
    var jsFilter = filter("**/*.js",{restore:true});
    var cssFilter = filter("**/*.css",{restore:true});
    var indexHtmlFilter = filter(["**/*","!xx/index.html"],{restore:true});

    return gulp.src("src/index.html")
        .pipe(useref())
        .pipe(jsFilter)
        .pipe(uglify())
        .pipe(jsFilter.restore)
        .pipe(cssFilter)
        .pipe(csso())
        .pipe(cssFilter.restore)
        .pipe(indexHtmlFilter)
        .pipe(rev())
        .pipe(indexHtmlFilter.restore)
        .pipe(revReplace())
        .pipe(gulp.dest("dist"));
});