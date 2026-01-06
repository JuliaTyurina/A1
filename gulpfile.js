import gulp from "gulp";
import { paths } from "./config/g-settings.js";
import { plugins } from "./config/g-plugins.js";

// Импорт задач
import { reset } from "./config/tasks/reset.js";
import { html } from "./config/tasks/html.js";
import { styles } from "./config/tasks/styles.js";
import { images } from "./config/tasks/images.js";
import { svg } from "./config/tasks/svg.js";
import { fonts } from "./config/tasks/fonts.js";
import {scripts, scriptsMin} from "./config/tasks/scripts.js";
import { serve } from "./config/tasks/serve.js";
import {favicon} from "./config/tasks/favicon.js";
import { videos } from "./config/tasks/videos.js";

global.app = {
    gulp: gulp,
    paths: paths,
    plugins: plugins
}


// Экспорт задач с очисткой перед сборкой
export default app.gulp.series(
    reset, // 📌 Сначала очищает `dist/`
    app.gulp.parallel(html, styles, images, fonts, svg, scripts, scriptsMin, favicon, videos), // 📌 Затем запускает сборку
    serve // 📌 Потом сервер и слежку за файлами
);
