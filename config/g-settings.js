import * as nodePath from "path";

const rootFolder = nodePath.basename(nodePath.resolve());
const buildFolder = `./dist`;
const srcFolder = `./src`;

// Пути к файлам
export const paths = {
    src: {
        html: `${srcFolder}/*.html`,
        scss: `${srcFolder}/assets/scss/style.scss`,
        js: `${srcFolder}/assets/js/main.js`,
        images: [
            `${srcFolder}/assets/img/**/*.{png,jpg,jpeg,gif,svg,webp}`,
            `!${srcFolder}/assets/img/favicon/**/*.*`,
        ],
        fonts: `${srcFolder}/assets/fonts/**/*`,
        svg: `${srcFolder}/assets/img/svg/**/*.svg`,
        favicon: `${srcFolder}/assets/img/favicon/favicon.ico`,
        favicons: `${srcFolder}/assets/img/favicon/*.{png,svg}`,
        manifest: `${srcFolder}/manifest.webmanifest`,
        videos: `${srcFolder}/assets/video/**/*`,
    },
    build: {
        html: `${buildFolder}/`,
        css: `${buildFolder}/assets/css/`,
        js: `${buildFolder}/assets/js/`,
        images: `${buildFolder}/assets/img/`,
        fonts: `${buildFolder}/assets/fonts/`,
        svg: `${buildFolder}/assets/img/svg/`,
        favicon: `${buildFolder}/`,
        favicons: `${buildFolder}/assets/img/favicon/`,
        manifest: `${buildFolder}/`,
        videos: `${buildFolder}/assets/video/`,
    },

    clean: buildFolder,
    rootFolder: rootFolder,
    buildFolder: buildFolder,
};