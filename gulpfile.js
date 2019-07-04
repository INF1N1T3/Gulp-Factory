

const gulp = require('gulp');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const pug = require('gulp-pug');
const ts = require("gulp-typescript");
// const typescript = require('gulp-tsc');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();

const css = done => {

	gulp.src('./scss/style.scss')
		.pipe(sourcemaps.init())
		.pipe( sass({
			errorLogToConsole: true
		}) )
		.on('error', console.error.bind(console))
		.pipe( autoprefixer({
			browsers: ['last 5 versions'],
			cascade: false
		}) )
		.pipe(sourcemaps.write('./'))
		.pipe( gulp.dest('./css/') )
		.pipe(browserSync.stream());

	done();
};

const html = done => {

	gulp.src('./index.pug')
	.pipe( pug( {
			errorLogToConsole: true
		} ) )
	.on('error', console.error.bind(console))
	.pipe( gulp.dest('./') )
	.pipe( sourcemaps.write('./') )
	.pipe(browserSync.stream());

	done();
};

const js = done => {

	// if (!tsProject) {
 //        tsProject = ts.createProject("tsconfig.json");
 //    }
 //    const tsResult = tsProject.src()
 //    .pipe(sourcemaps.init())
 //    .pipe(tsProject(reporter));
 //    return tsResult.js
 //        .pipe(sourcemaps.write())
 //        .pipe(gulp.dest("./js/"));

 // 	gulp.src('./ts/**/*.ts')
 // 	.pipe( typescript( {
	// 		errorLogToConsole: true
	// 	} ) )
	// .pipe( gulp.dest('./js/') )
	// .pipe(browserSync.stream());

	gulp.src('./ts/script.ts')
	.pipe( sourcemaps.init() )
	.pipe( ts() )
	.on('error', console.error.bind(console))
	.pipe( gulp.dest('./js/') )
	.pipe( sourcemaps.write('./js/') )
	.pipe( browserSync.stream() );

	done();
};

const sync = done => {

	browserSync.init({
        server: {
            baseDir: "./"
        },
        port: 3000
    });

	done();
}

const browserReload = done => {

	browserSync.reload();

	done();
}

const watch = () => {
	gulp.watch('./scss/**/*.scss', css);
	gulp.watch('./ts/**/*.ts', js);
	gulp.watch('./**/*.pug', html)
}

// const COMPILEALL = done => {

// 	html();
// 	css();
// 	js();

// 	done();
// };

// gulp.task('default', COMPILEALL);

// gulp.task(css);
// gulp.task(html);
// gulp.task(js);

gulp.task('default', gulp.series( sync, watch, done => {console.log('Это больше чем круто.'); done();} ) );

gulp.task(js);
gulp.task(html);
gulp.task(css);

gulp.task('all', gulp.series(html, css, js))

// const sayHello = (done) => {
// 		console.log("hello");


// 		done();
// };

// const defaultSomeTask = (done) => {
// 		console.log("all works");


// 		done();
// };

// exports.default = defaultSomeTask;
// exports.sayHello = sayHello;