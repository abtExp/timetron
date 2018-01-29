const {merge} = require('webpack-merge'),
common = require('./webpack.common'),
webpack = require('webpack'),
uglify = require('uglifyjs-webpack-plugin');

module.exports = merge(common,{
    plugins:[
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
          }),
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            children:true,
            async:true
        }),
        new uglify()
    ]
})

