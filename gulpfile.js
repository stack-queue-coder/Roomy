const gulp = require('gulp');

// const sass = require('gulp-sass');
const sass = require('gulp-sass')(require('sass'));
const cssnano = require('gulp-cssnano');
const rev = require('gulp-rev');

const imagemin = require('gulp-imagemin');

const del = require('del');

gulp.task('css', function(done){
    console.log('minifying css...');
    gulp.src('./assets/sass/**/*.scss')
    .pipe(sass())
    .pipe(cssnano())
    .pipe(gulp.dest('./assets.css'));

     gulp.src('./assets/**/*.css')
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
    done();
})


gulp.task('images', function(done){
    console.log('compressing images...');
    gulp.src('./assets/**/*.+(png|jpg|gif|svg|jpeg)')
    .pipe(imagemin())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
    done();
    
});


gulp.task('clean:assets', function(done){
    del.sync('./public/assets');
    done();
});

gulp.task('build', gulp.series('clean:assets', 'css', 'images'), function(done){
    console.log('building assets...');
    done();
});