import gulp           from 'gulp'
import mainBowerFiles from 'main-bower-files'
import nodemon        from 'gulp-nodemon'
import clean          from 'gulp-clean'
import inject         from 'gulp-inject'
import concat         from 'gulp-concat'
import rev            from 'gulp-rev'
import sass           from 'gulp-sass'
import runSequence    from 'run-sequence'
import debug          from 'gulp-debug'
import browserify     from 'browserify'
import babelify       from 'babelify'
import source         from 'vinyl-source-stream'
import buffer         from 'vinyl-buffer'

let conf = {
  home:    './',
  src:     './src',
  assets:  './assets',
  dist:    './dist',
}

gulp.task('server', () => {
  nodemon({
    env:    { 'NODE_ENV': 'development' },
    exec:   'babel-node src/server.js',
    ignore: [conf.dist]
  })
})

function appJs() {
  return browserify({ entries: conf.src + '/client/app.jsx', extensions: ['.jsx'], debug: true, transform: [ babelify ] })
    .bundle()
    .on('error', (err)  => {
      console.error('ERROR: ', err.stack);
      this.emit('end');
    })
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(rev())
    .pipe(gulp.dest(conf.dist + '/js/'))
}

gulp.task('default', ['build']);

gulp.task('start', ['build', 'watch', 'server']);

gulp.task('watch', [ 'watch:js' ]);

gulp.task('watch:js', function() {
  return gulp.watch(conf.src + '/client/**/*', ['inject:app:js']);
})

function vendorJs() {
  return gulp.src(mainBowerFiles({filter: '**/*.js'}))
    .pipe(concat('vendor.js'))
    .pipe(rev())
    .pipe(gulp.dest(conf.dist + '/js/'));
}

function vendorCss() {
  return gulp.src(mainBowerFiles({filter: '**/*.{scss,css}'}))
    //.pipe(sass.sync().on('error', sass.logError))
    .pipe(concat('vendor.css'))
    .pipe(rev())
    .pipe(gulp.dest(conf.dist + '/css/'))
}

gulp.task('clean:vendor:css', function() {
  return gulp.src(conf.dist+'/css/vendor-*.css').pipe(clean());
})

gulp.task('inject:vendor:css', ['clean:vendor:css'], function() {
  return gulp.src(`${conf.src}/index.html`)
    .pipe(inject(vendorCss(), { name: 'vendor' }))
    .pipe(gulp.dest(conf.src));
});

gulp.task('clean:vendor:js', function() {
  return gulp.src(conf.dist+'/js/vendor-*.js').pipe(clean());
})

gulp.task('inject:vendor:js', ['clean:vendor:js'], function() {
  return gulp.src(`${conf.src}/index.html`)
    .pipe(inject(vendorJs(), { name: 'vendor' }))
    .pipe(gulp.dest(conf.src));
});

gulp.task('clean:app:js', function() {
  return gulp.src(conf.dist+'/js/app-*.js').pipe(clean());
});

gulp.task('inject:app:js', ['clean:app:js'], function() {
  return gulp.src(`${conf.src}/index.html`)
    .pipe(inject(appJs(), { name: 'app' }))
    .pipe(gulp.dest(conf.src));
});

gulp.task('build', () => {
  runSequence(
    'inject:vendor:css', 'inject:vendor:js', 'inject:app:js'
  );
});
