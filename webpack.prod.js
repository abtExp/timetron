const {merge} = require('webpack-merge'),
common = require('./webpack.common'),
uglify = require('uglifyjs-webpack-plugin');

module.exports = merge(common,{
    plugins:[
        new uglify()
    ]
})

