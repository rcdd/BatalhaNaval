/* jshint node: true */
'use strict';
let gulp   = require('gulp'),
sass   = require('gulp-sass'),
tsc = require("gulp-typescript"),
sourcemaps = require('gulp-sourcemaps'),
tsProject = tsc.createProject("angular/tsconfig.json"),
tslint = require('gulp-tslint'),
spawn = require('child_process').spawn,
node;

const tsDir = "angular/app/**/*.ts",
scssDir = "angular/app/scss/**/*.scss";

/**
 * Launch the server. If there's a server already running, kill it.
 */
 gulp.task('server', function() {
  if (node) node.kill();
  node = spawn('node', ['index.js'], {stdio: 'inherit'});
  node.on('close', function (code) {
    if (code === 8) {
      gulp.log('Error detected, waiting for changes...');
  }
});
});

/**
 * compilar o scss em css na respectiva pasta
 */
 gulp.task('build-css', function() {
  return gulp.src(scssDir)
  .pipe(sass())
  .pipe(gulp.dest('angular/css'));
});


/**
 * Lint all custom TypeScript files.
 */
 gulp.task('tslint', () => {
    return gulp.src(tsDir)
    .pipe(tslint({
        formatter: 'prose'
    }))
    .pipe(tslint.report());
});

/**
 * Compile tsScripts from angular folder
 */
 gulp.task("compile", ["tslint"], () => {
    let tsResult = gulp.src(tsDir)
    .pipe(sourcemaps.init())
    .pipe(tsProject());
    return tsResult.js
    .pipe(sourcemaps.write(".", {sourceRoot: '/angular/app'}))
    .pipe(gulp.dest("angular/app"));
});

/**
 * Build app
 */
 gulp.task("build", ['compile', 'build-css'], () => {
    console.log("Building the project ...");
});


 gulp.task('watch', function() {
    gulp.watch(tsDir, ['compile']);
    gulp.watch(scssDir, ['build-css']);
});

 /**
 * $ gulp
 * description: start the development environment
 */
 gulp.task('default', function() {
    gulp.run('server');

    gulp.watch('./*.js', function() {
        gulp.run('server');
    });
    gulp.watch(tsDir, ['compile']);
    gulp.watch(scssDir, ['build-css']);
});

 // clean up if an error goes unhandled.
 process.on('exit', function() {
    if (node) node.kill();
});