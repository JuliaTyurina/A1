import { html } from "./html.js"
import { styles } from "./styles.js"
import { images } from "./images.js"
import { svg } from "./svg.js"
import { scripts } from "./scripts.js"
import browserSync from "browser-sync"

const bs = browserSync.create();

// Запуск сервера
export const serve = () => {
    bs.init({
        server: "dist",
        notify: false,
        open: false,
        ui: false,

        // ✅ Добавляем middleware для отключения кэша
        middleware: [
            {
                route: '',
                handle: (req, res, next) => {
                    // Отключаем кэш для всех ответов
                    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
                    res.setHeader('Pragma', 'no-cache');
                    res.setHeader('Expires', '0');

                    // Разрешаем CORS (если нужно для IP доступа)
                    res.setHeader('Access-Control-Allow-Origin', '*');

                    next();
                }
            }
        ]
    });

    app.gulp.watch("src/**/*.html", app.gulp.series(html, bsReloader));
    app.gulp.watch("src/assets/**/*.scss", app.gulp.series(styles, bsReloader));
    app.gulp.watch("src/assets/**/*.js", app.gulp.series(scripts, bsReloader));
    app.gulp.watch("src/assets/images/**/*.{png,jpg,jpeg,gif,webp}", app.gulp.series(images, bsReloader));
    app.gulp.watch("src/assets/images/**/*.svg", app.gulp.series(svg, bsReloader));
};

function bsReloader (done) {
    bs.reload();
    done();
}
