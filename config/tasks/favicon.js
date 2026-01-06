export const favicon = () => {
    app.gulp.src(app.paths.src.favicon, { encoding: false })
        .pipe(app.gulp.dest(app.paths.build.favicon));

    app.gulp.src(app.paths.src.manifest, { encoding: false })
        .pipe(app.gulp.dest(app.paths.build.manifest));

    return app.gulp.src(app.paths.src.favicons, { encoding: false })
        .pipe(app.gulp.dest(app.paths.build.favicons));
};