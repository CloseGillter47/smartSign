require('./check-versions')()

// 设置当前环境为生产环境
process.env.NODE_ENV = 'production'

// loading 插件
// https://github.com/sindresorhus/ora
var ora = require('ora')
// 可以在 node 中执行`rm -rf`的工具
// https://github.com/isaacs/rimraf
var rm = require('rimraf')
// node自带的文件路径工具
var path = require('path')
// 在终端输出带颜色的文字
// https://github.com/chalk/chalk
var chalk = require('chalk')
var webpack = require('webpack')
// 配置文件
var config = require('../config')
var webpackConfig = require('./webpack.prod.conf')

// 在终端显示loading效果，并输出提示
var spinner = ora('正在生成项目...')
spinner.start()

// 删除这个文件夹 （递归删除）
rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  // 构建
  webpack(webpackConfig, function (err, stats) {
    // 构建成功

    // 停止 loading动画
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red('  异常导致构建失败.\n'))
      process.exit(1)
    }

    // 打印提示
    console.log(chalk.cyan('  构建完成.\n'))
    console.log(chalk.yellow(
      '  注意: 构建出来的项目需要放在一个 HTTP server 上才能运行.\n' +
      '  直接打开index.html 文件可能没法运行.\n'
    ))
  })
})
