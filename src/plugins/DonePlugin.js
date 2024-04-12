class DonePlugin {
  constructor (options) {
    console.log('options', options)
    this.options = options
  }
  apply (compiler) {
    let startTime = null
    compiler.hooks.afterPlugins.tap('DonePlugin', () => {
      startTime = new Date().getTime()
    })
    compiler.hooks.done.tapAsync('DonePlugin', (compilation, callback) => {
      // console.log('compilation', compilation)
      const endTime = new Date().getTime()
      console.log('finished time', Math.floor((endTime - startTime) / 1000))
      callback()
    })
  }
}

module.exports = DonePlugin