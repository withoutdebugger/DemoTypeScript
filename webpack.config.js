var path = require('path');
var webpack = require('webpack');

module.exports = {

    devtool: 'source-map',
    entry: ['./src/app.ts'],
    output:{
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.js'
    },
    module:{
        loaders:[
        {
            test: /\.ts$/,
            include: path.resolve(__dirname, 'src'),
            loader: 'ts-loader'
        }]
    },
    resolve:{
        extensions: [".webpack.js",".web.js", ".ts", ".js"]
    }
};