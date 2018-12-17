const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HTMLPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const PurifyCss = require('purifycss-webpack');
// const InlineChunkWebpackPlugin = require('html-webpack-inline-chunk-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const glob = require('glob-all');
const isDev = process.env.NODE_ENV === 'development'

const config = {
  mode: process.env.NODE_ENV || 'production', //加上这一句试试
  target: 'web',
  entry: path.join(__dirname, 'src/index.js'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist'),
    publicPath: '/'
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    },
    // minimizer: [],
    runtimeChunk: true
  },
  plugins: [
    // make sure to include the plugin for the magic
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: isDev ? '"development"' : '"production"'
      }
    }),
    new VueLoaderPlugin(),
    new HTMLPlugin({
      template: path.join(__dirname, 'template.html')
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    })

  ],
  resolve: {
    alias: {
      'vue': 'vue/dist/vue.js'
    }
  },
  module: {
    rules: [{
      test: /\.(js|vue)$/,
      loader: 'eslint-loader',
      enforce: 'pre',
      include: [path.resolve(__dirname, 'src/router/router.js')],
      options: {
        formatter: require('eslint-friendly-formatter')
      }
    }, {
      test: /\.vue$/,
      loader: 'vue-loader'
    }, {
      test: /\.jsx$/,
      loader: 'babel-loader',
      exclude: '/node_module/'
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }, {
      test: /\.scss$/,
      loader: 'style-loader!css-loader!sass-loader'
    }, { //处理图片，会在 output 目录中生成图片文件，js 中需要使用 require("*.jpg")先行引入才可以，同样 html 中通过 background-image 设置的图片不可以，但 css 中通过 background-image 设置的图片可以
      test: /\.(gif|jpeg|svg|jpg|png|woff|eot|ttf|woff2)$/,
      use: {
        loader: "url-loader",
        options: {
          // outputPath: "images/", //这里的 images 貌似没什么作用，但不写不行，可以是任意的一个或多个字符
          name: "[name].[hash:8].[ext]", //8表示截取 hash 的长度
          // useRelativePath: true //这个必须与 outputPath 结合使用才可以处理 css 中的引入的图片
        }
      }
    }, ]
  },


}
//区分开发环境和生产环境
if (isDev) {
  config.devtool = '#cheap-module-eval-source-map'
  config.devServer = {
    port: 8000,
    host: '0.0.0.0',
    overlay: {
      errors: true,
    },
    historyApiFallback: {
      index: './template.html'
    },
    hot: true
  }
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(), new webpack.NoEmitOnErrorsPlugin()
  )

} else {
  config.plugins.push(
    new PurifyCss({
      paths: glob.sync([ // 传入多文件路径
        path.resolve(__dirname, './*.html'), // 处理根目录下的html文件
        path.resolve(__dirname, './src/*.js') // 处理src目录下的js文件
      ])
    }),
    // new InlineChunkWebpackPlugin({
    //  inlineChunks: ['manifest']
    // }),
    new CleanWebpackPlugin(['dist']),
  )
  config.optimization.runtimeChunk = {
    name: 'manifest'
  };
  // config.optimization.minimizer.push(new UglifyJsPlugin({
  //  uglifyOptions: {
  //    compress: false
  //  }
  // }));
  config.optimization.splitChunks = {
    cacheGroups: {
      commons: {
        name: "commons",
        chunks: "initial",
        minChunks: 2
      }
    }
  }

}
module.exports = config