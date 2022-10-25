const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');

module.exports = (env) => {
  return {
    mode: env.production ? 'production' : 'development',
    entry: path.resolve(__dirname, 'src/index.ts'),
    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/',
    },
    resolve: {
      extensions: ['.js', '.ts'],
      alias: {
        core: path.resolve(__dirname, 'src/core'),
        components: path.resolve(__dirname, 'src/components'),
        helpers: path.resolve(__dirname, 'src/helpers'),
        pages: path.resolve(__dirname, 'src/pages'),
        config: path.resolve(__dirname, 'src/config'),
        utils: path.resolve(__dirname, 'src/utils'),
        services: path.resolve(__dirname, 'src/services'),
        api: path.resolve(__dirname, 'src/api'),
        store: path.resolve(__dirname, 'src/store'),
        handlebars: 'handlebars/dist/handlebars',
        'handlebars/runtime': 'handlebars/dist/cjs/handlebars.runtime',
      },
    },
    module: {
      rules: [
        {
          test: /\.ts?$/,
          loader: 'babel-loader',
          exclude: path.resolve(__dirname, 'node_modules'),
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            'style-loader',
            'css-loader',
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              },
            },
          ],
          exclude: path.resolve(__dirname, 'node_modules'),
        },
      ],
    },
    devServer: {
      hot: true,
      static: {
        directory: path.resolve(__dirname, 'dist'),
        watch: true,
      },
      historyApiFallback: {
        index: 'index.html',
      },
      compress: true,
      port: 3000,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'static/index.html',
      }),
    ],
    optimization: {
      minimize: env.production,
      minimizer: env.production ? [new TerserPlugin()] : [],
    },
  };
};
