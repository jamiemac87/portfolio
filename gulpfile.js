// Require all the things
var gulp = require('gulp');
var gUtil = require('gulp-util');
var child = require('child_process');
var browserSync = require('browser-sync').create();
var config = require('./gulp.config')();

/**
 * Jekyll build task
 */
gulp.task('jekyll', function () {
  const jekyll = child.spawn('jekyll', ['build', '--watch', '--incremental', '--drafts']);

  const jekyllLogger = function(buffer) {
    buffer.toString()
      .split(/\n/)
      .forEach(function(message) {
        gUtil.log('Jekyll: ' + message);
      });

    jekyll.stdout.on('data', jekyllLogger);
    jekyll.stderr.on('data', jekyllLogger);
  }
});

gulp.task('serve', ['jekyll'], function () {
  browserSync.init({
    files: [config.siteRoot + '/**'],
    port: 4000,
    server: {
      baseDir: config.siteRoot
    }
  });
});

gulp.task('default', ['serve']);


