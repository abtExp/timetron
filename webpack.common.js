const {merge} = require('webpack-merge'),
webpack = require('webpack'),
path = require('path');


module.exports = {
    target:'electron',
    entry:{
        index:'./index.js',
        form :'./ui/components/main/Container.ui.js',
        timer:'./ui/components/main/TimerContainer.ui.js'
    },
    output:{
        path:path.resolve(__dirname,'build'),
        filename:'[name].build.js'
    },
    module: {
        rules: [{
            test: /\.ui\.js$/,
            exclude: /node_modules/,
            loader:'babel-loader',
            query:{
                presets:['env','react']
            }
        },{
            test:/\.js$/,
            exclude:/node_modules/,
            loader: 'babel-loader',
            options: {
                cacheDirectory: true,
                presets:['env']
            },
        }]
    },
    plugins: [
        new webpack.EnvironmentPlugin({
            NODE_ENV: 'production'
        }),
        new webpack.NamedModulesPlugin(),
    ],
}