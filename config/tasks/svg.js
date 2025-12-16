import svgmin from "gulp-svgmin"
import svgSprite from "gulp-svg-sprite";

const svgConfig = {
    mode: {
        symbol: {
            dest: '.',
            sprite: 'sprite.svg',
            example: false,
        },
    },
    shape: {
        id: {
            separator: '-',
        },
    },
};


// Оптимизация SVG
export const svg = () =>
    app.gulp.src(app.paths.src.svg, { encoding: false })
        .pipe(svgmin())
        .pipe(svgSprite(svgConfig))
        .pipe(app.gulp.dest(app.paths.build.svg));