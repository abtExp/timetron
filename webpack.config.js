const uglify = require('uglifyjs-webpack-plugin');
module.exports = {
    entry: {
        form: './ui/components/main/Container.js',
        timer: './ui/components/main/TimerContainer.js',
    },
    output: {
        path: `${__dirname}/build`,
        filename: '[name].UI.build.js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
                presets: ['react', 'es2015']
            }
        }]
    }
    // plugins: [
    //     new uglify()
    // ]
}