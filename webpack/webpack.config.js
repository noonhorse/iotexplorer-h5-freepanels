const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const autoPreFixer = require('autoprefixer');
const postcssPxToViewport = require('postcss-px-to-viewport');
const postcss = require('postcss-pxtorem');
const panelConfig = require('./panel-conf');
const viewportConfig = require('./pxToViewport');

class ModifiedMiniCssExtractPlugin extends MiniCssExtractPlugin {
  getCssChunkObject(mainChunk) {
    return {};
  }
}

module.exports = (env, argv) => {
  const { mode } = argv;
  const isDevMode = mode === 'development';
  const rootPath = path.join(__dirname, '../');
  const srcPath = path.join(rootPath, 'src');
  const outputPath = path.join(rootPath, 'dist', isDevMode ? 'debug' : 'release');
  console.log('build mode', mode, isDevMode, 'outPath:', outputPath);

  const entry = {};
  const theme = 'normal';

  Object.keys(panelConfig).forEach((categoryKey) => {
    const { enable, panels } = panelConfig[categoryKey];

    if (enable && panels && panels.length) {
      panels.forEach((panelInfo) => {
        let panelName;
        const options = { enable: true, entry: 'app.tsx' };

        if (typeof panelInfo === 'string') {
          panelName = panelInfo;
        } else if (panelInfo.splice) {
          const [_name, _options] = panelInfo;

          panelName = _name;
          Object.assign(options, _options);
        }

        if (options.enable) {
          entry[`${categoryKey}_${panelName}`] = path.join(srcPath, 'panels', `${categoryKey}/${panelName}`, options.entry);
        }
      });
    }
  });
  console.log('build entry', entry);

  return {
    name: 'iotexplorer-h5-freepanels',
    mode,
    entry,
    output: {
      path: outputPath,
      filename: isDevMode ? '[name].js' : '[name].[contenthash:10].js',
      libraryTarget: 'umd',
    },
    externals: {
      react: 'React',
      'react-dom': 'ReactDOM',
      'qcloud-iotexplorer-h5-panel-sdk': 'h5PanelSdk',
    },
    devServer: {
      contentBase: outputPath,
      compress: true,
      port: 9000,
      watchContentBase: true,
      disableHostCheck: true, //  新增该配置项
      // hot: true,
      https: true,
    },
    module: {
      // 现在的 babel 配置已经很简单了，我们只需要加入默认的配置即可
      rules: [
        {
          test: /\.(j|t)sx?$/,
          exclude: /node_modules|vendors/,
          use: {
            loader: 'babel-loader',
            options: {
              sourceType: 'unambiguous',
              presets: ['@babel/preset-env', '@babel/preset-react'],
              plugins: [
                '@babel/plugin-proposal-class-properties',
                [
                  '@babel/plugin-transform-runtime',
                  {
                    absoluteRuntime: false,
                    corejs: false,
                    helpers: true,
                    regenerator: false,
                    useESModules: false,
                  },
                ],
                ['babel-plugin-styled-components-px2vw', viewportConfig],
              ],
            },
          },
        },
        {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
          },
        },
        {
          test: /\.(le|c)ss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            {
              loader: 'css-loader',
              options: {
                url: true,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: [
                  autoPreFixer(),
                  postcss({
                    rootValue: 46.875,
                    propList: ['*'],
                  }),
                  postcssPxToViewport(viewportConfig),
                ],
              },
            },
            {
              loader: 'less-loader',
            },
            {
              loader: 'style-resources-loader',
              options: {
                patterns: path.resolve(__dirname, '../src/styles/themes/variable.less'),
              },
            },
          ],
        },
        {
          test: /\.svg$/,
          use: [
            'url-loader',
            'svg-transform-loader',
            {
              loader: 'svgo-loader',
              options: {
                plugins: [{ removeTitle: true }, { convertStyleToAttrs: true }],
              },
            },
          ],
          exclude: [path.resolve(__dirname, '../src/themes')],
        },
        {
          test: /\.svg$/,
          include: [path.resolve(__dirname, '../src/themes')],
          use: [
            {
              loader: 'svg-sprite-loader',
              options: {
                symbolId: 'icon-[name]',
              },
            },
            {
              loader: 'svgo-loader',
              options: {
                plugins: [
                  {
                    name: 'removeAttrs',
                    params: {
                      attrs:
                        theme === 'dark' || theme === 'colorful'
                          ? ''
                          : '(fill|stroke)',
                    },
                  },
                ],
              },
            },
          ],
        },
      ],
    },
    resolve: {
      // 添加 jsx 后缀支持
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      alias: {
        '@src': path.resolve(__dirname, '../src'),
        '@components': path.resolve(__dirname, '../src/components'),
        '@hooks': path.resolve(__dirname, '../src/hooks'),
        '@utillib': path.resolve(__dirname, '../src/libs/utillib.ts'),
        '@libs': path.resolve(__dirname, '../src/libs'),
        '@constants': path.resolve(__dirname, '../src/constants/index.ts'),
        '@icons': path.resolve(__dirname, '../src/assets'),
        '@underscore': path.resolve(__dirname, '../src/vendor/underscore/index'),
        '@wxlib': path.resolve(__dirname, '../src/libs/wxlib/index.js'),
      },
    },
    devtool: isDevMode ? 'eval-source-map' : false,
    optimization: !isDevMode ? {
      chunkIds: 'named',
      minimize: !isDevMode,
      minimizer: [
        new TerserPlugin({
          extractComments: false,
        }),
        new CssMinimizerPlugin(),
      ],
    } : {},
    plugins: [
      new webpack.ids.HashedModuleIdsPlugin(),
      new webpack.ProgressPlugin(),
      new CleanWebpackPlugin(),
      isDevMode && new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(mode),
        _BUSINESS_: JSON.stringify({
          theme_type: theme,
        }),
      }),
      new ModifiedMiniCssExtractPlugin({
        filename: isDevMode ? '[name].css' : '[name].[contenthash:10].css',
      }),
    ].filter(Boolean),
    // stats: { children: false },
  };
};
