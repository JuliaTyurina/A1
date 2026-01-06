export const videos = () =>
    app.gulp.src(app.paths.src.videos, { encoding: false })
        .pipe(app.plugins.newer(app.paths.build.videos))
        .pipe(app.gulp.dest(app.paths.build.videos));
