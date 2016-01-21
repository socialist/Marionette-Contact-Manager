/**
 * Created by socialist on 20.01.16.
 */
/* globals require */

var gulp = require('gulp'),


    browserSync = require('browser-sync');
// reload = browserSync.reload;


/**
BROWSER SYNC
*/

gulp.task('serve', function () {
  'use strict';
  browserSync.init({
    server: './'
  });

  gulp.watch('./**/*.html').on('change', browserSync.reload);
});


/**
 * DEFAULT TASK
 */
gulp.task('default', ['serve']);
