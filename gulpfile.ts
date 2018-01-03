const gulp = require("gulp"),
    del = require("del"),
    gulpMocha = require("gulp-mocha"),
    runSequence = require("run-sequence"),
    sourceMaps = require("gulp-sourcemaps"),
    tsc = require("gulp-typescript"),
    uglify = require("gulp-uglify");

/**
 * 移除 dist 文件夹.
 */
gulp.task("clean", (done) => {
    return del(["dist/.bin", "dist/backend"], done);
});

/**
 * 复制启动后台的脚步.
 */
gulp.task("copy", () => {
    return gulp.src("backend/bin/*")
        .pipe(gulp.dest("dist/.bin"));
});

/**
 * 创建 server 后台代码.
 */
gulp.task("build:express", () => {
    const project = tsc.createProject("backend/tsconfig.json");
    const result = gulp.src("backend/src/**/*.ts")
        .pipe(sourceMaps.init())
        .pipe(project());
    return result.js
        .pipe(uglify())
        .pipe(gulp.dest("dist/backend"));
});

/**
 * 创建 server 后台代码.
 */
gulp.task("dev:express", () => {
    const project = tsc.createProject("backend/tsconfig.json");
    const result = gulp.src("backend/src/**/*.ts")
        .pipe(sourceMaps.init())
        .pipe(project());
    return result.js
        .pipe(sourceMaps.write())
        .pipe(gulp.dest("dist/backend"));
});

/**
 * 测试 server 后台代码
 */
gulp.task("test:express", () => {
    gulp.src("dist/backend/tests", { read: false })
        .pipe(gulpMocha());
});

/**
 * 创建工程.
 */
gulp.task("default", (done) => {
    runSequence("clean", "copy", "build:express", "test:express");
});

/**
 * 发布产品
 */
gulp.task("product", (done) => {
    runSequence("clean", "copy", "dev:express");
});