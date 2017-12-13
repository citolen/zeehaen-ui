var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: "./src/index.tsx",
    output: {
        filename: "bundle.js",
        path: __dirname + "/dist",
        publicPath : '/dist'
    },
    devServer: {
        contentBase: __dirname,
        historyApiFallback: {
            disableDotRule: true
        }
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loader: "babel-loader!awesome-typescript-loader" },

            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },

            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    publicPath: '/dist/',
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            query: {
                                sourceMap: true,
                                modules: true,
                                localIdentName: '[name]__[local]___[hash:base64:5]',
                                importLoaders: 1
                            },
                        },
                        'resolve-url-loader',
                        'postcss-loader'
                    ]
                }),
            },
            {
                test: /\.css$/,
                include: /node_modules/,
                use: ExtractTextPlugin.extract({
                    publicPath: '/dist/',
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            query: {
                                sourceMap: true,
                                importLoaders: 1
                            },
                        },
                        'resolve-url-loader',
                        'postcss-loader'
                    ]
                }),
            },
            {
                test: /\.gcss$/,
                use: ExtractTextPlugin.extract({
                    publicPath: '/dist/',
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            query: {
                                importLoaders: 1
                            }
                        },
                        'resolve-url-loader',
                        'postcss-loader'
                    ]
                }),
            },

            {
                test: /\.svg$/,
                loader: 'svg-react-loader'
            },

            {
                test: /\.(png|jpg|gif)$/,
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                        name: "images/[name].[ext]"
                    }
                  }
                ]
            },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader", exclude: [/node_modules/] }
        ]
    },
    plugins: [
        new ExtractTextPlugin("styles.css")
    ],

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    },
};