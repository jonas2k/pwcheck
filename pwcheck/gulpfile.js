/// <binding BeforeBuild='gitrev' />
"use strict";

var gulp = require("gulp"),
    rimraf = require("rimraf"),
    concat = require("gulp-concat"),
    cssmin = require("gulp-cssmin"),
    uglify = require("gulp-uglify"),
    gitrev = require("git-rev");

var paths = {
    webroot: "./wwwroot/",
    node_modules: "node_modules/"
};

paths.js = paths.webroot + "js/**/*.js";
paths.minJs = paths.webroot + "js/**/*.min.js";
paths.css = paths.webroot + "css/**/*.css";
paths.minCss = paths.webroot + "css/**/*.min.css";
paths.concatJsDest = paths.webroot + "js/site.min.js";
paths.concatCssDest = paths.webroot + "css/site.min.css";

gulp.task("clean:js", function (cb) {
    rimraf(paths.concatJsDest, cb);
});

gulp.task("clean:css", function (cb) {
    rimraf(paths.concatCssDest, cb);
});

gulp.task("clean", ["clean:js", "clean:css"]);

gulp.task("min:js", function () {
    return gulp.src([paths.js, "!" + paths.minJs], { base: "." })
        .pipe(concat(paths.concatJsDest))
        .pipe(uglify())
        .pipe(gulp.dest("."));
});

gulp.task("min:css", function () {
    return gulp.src([paths.css, "!" + paths.minCss])
        .pipe(concat(paths.concatCssDest))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});

gulp.task("min", ["min:js", "min:css"]);

var deps = {
    "jquery": {
        "dist/*": ""
    },
    "bootstrap": {
        "dist/**/*": ""
    }
};

gulp.task("dependencies:bootstrap", () => {

    return gulp.src(paths.node_modules + "bootstrap/dist/**/*")
        .pipe(gulp.dest(paths.webroot + "lib/bootstrap/"));

});

gulp.task("dependencies:jquery", () => {

    return gulp.src(paths.node_modules + "jquery/dist/**/*")
        .pipe(gulp.dest(paths.webroot + "lib/jquery/"));

});

gulp.task("dependencies:jquery-validation", () => {

    return gulp.src(paths.node_modules + "jquery-validation/dist/**/*")
        .pipe(gulp.dest(paths.webroot + "lib/jquery-validation/"));

});

gulp.task("dependencies:jquery-validation-unobtrusive", () => {

    return gulp.src(paths.node_modules + "jquery-validation-unobtrusive/dist/**/*")
        .pipe(gulp.dest(paths.webroot + "lib/jquery-validation-unobtrusive/"));

});

gulp.task("dependencies:hsimp", () => {

    return gulp.src([paths.node_modules + "how-secure-is-my-password/build/hsimp.css", paths.node_modules + "how-secure-is-my-password/build/hsimp.min.js"])
        .pipe(gulp.dest(paths.webroot + "lib/hsimp/"));

});

gulp.task("dependencies", ["dependencies:bootstrap", "dependencies:jquery", "dependencies:jquery-validation", "dependencies:jquery-validation-unobtrusive", "dependencies:hsimp"]);

gulp.task("gitrev", () => {
    gitrev.short((shortval) => {
        require("fs").writeFileSync("currentcommit.json", JSON.stringify({ "commit": shortval, "branch": "master" }));
    });
});

gulp.task("default", ["dependencies", "gitrev"]);