const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
    entry: {
        main: './src/index.ts'
    },
    output: {
        path: path.resolve(__dirname, '../Service/wwwroot/build'),
        publicPath: "/build/",
        filename: '[name].js',
        chunkFilename: '[name]-[chunkhash].js'
    },
    module: {
        rules: [{
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: {
                    appendTsSuffixTo: [/\.vue$/],
                }
            },
            {
                test: /\.css$/,
                loader: ['style-loader', 'css-loader']
            },

            {
                test: /.*\.(png|je?g|gif|svg|eot|ttf|woff|woff2)$/i,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '/images/[name].[ext]'
                    }
                }]
            },
        ]
    },
    resolve: {
        extensions: ['.ts', '.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@src': path.join(__dirname, 'src')
        }
    },
    devtool: '(none)',
    devServer: {
        port: 8080,
        open: true,
        overlay: false,
        stats: 'none',
        https: false,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS"
        }
    },
    mode: 'development', // use yarn release to do prod build
    plugins: [
        //new Visualizer(),
        new CleanWebpackPlugin('build', {
            root: path.resolve(__dirname, '../Service/wwwroot/')
        }),
    ],
    node: {
        fs: "empty",
        module: "empty"
    }
}