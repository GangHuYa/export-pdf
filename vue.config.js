const { defineConfig } = require("@vue/cli-service");
const DonePlugin = require('./src/plugins/DonePlugin.js')
const path = require('path')


const resolve = (filepath) => {
  return path.resolve(__dirname, filepath)
}
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: config => {
    config.resolveLoader.alias.set('md-loader', resolve('./src/loaders/md-loader.js'))
    // add a new loader
    config.module.rule('md-loader').test(/\.md$/).include.add(resolve('./src/assets')).end().use('md-loader').loader('md-loader').options({
      filename: 'md-name.md',
      options: {
        params: 1,
        params2: 2
      }
    }).end()

    // update loader
    // config.module.rule('md-loader').exclude.add(resolve('./node_modules')).end().use('md-loader').tap(options => {
    //   console.log('options', options)
    //   options.addAttribute = 'add a new attribute'
    //   return options
    // })

    // add a new loader again
    // config.module.rule('md-loader').use('md-loader1').loader('md-loader1').options({ filename: 'add a new loader'}).end()

    // delete  certain loader
    // const mdLoader = config.module.rule('md-loader')
    // mdLoader.uses.delete('md-loader1')

    // mdLoader.use('md-loader2').loader('md-loader2')

    // mdLoader.use('')

    // add a new plugin
    config.plugin('done-plugin').use(DonePlugin, [{ filename: 'pluginFile', version: '0.0.1'}])

    // update option of a plugin
    config.plugin('done-plugin').tap(args => [{
      ...args[0],
      filename: 'new parameter'
    }])
  }
});
