// config/tasks/scripts.js
import webpackStream from 'webpack-stream';
import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const createConfig = ({ minimize }) => ({
    mode: 'production',
    entry: {
        main: app.paths.src.js, // главный entry будет называться main
    },
    output: {
        filename: minimize ? '[name].min.js' : '[name].js',      // main.js / main.min.js
        chunkFilename: minimize ? '[name].min.js' : '[name].js', // vendors.js / vendors.min.js
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: minimize ? '../css/vendors.min.css' : '../css/vendors.css',
        }),
    ],
    optimization: {
        usedExports: true,
        minimize,
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',   // получится vendors.js / vendors.min.js
                    chunks: 'all',
                    enforce: true,
                },
            },
        },
    },
    infrastructureLogging: { level: 'error' },
    stats: 'errors-only',
});

export const scripts = () => {
    const config = createConfig({ minimize: false });

    return webpackStream(config, webpack)
        .on('error', function (err) {
            console.error(err.toString());
            this.emit('end');
        })
        .pipe(
            app.plugins.prettier({
                trailingComma: 'es5',
                tabWidth: 4,
                semi: true,
                singleQuote: true,
            }),
        )
        .pipe(app.gulp.dest(app.paths.build.js));
};

export const scriptsMin = () => {
    const config = createConfig({ minimize: true });

    return webpackStream(config, webpack)
        .on('error', function (err) {
            console.error(err.toString());
            this.emit('end');
        })
        .pipe(app.gulp.dest(app.paths.build.js));
};
