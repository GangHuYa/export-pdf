module.exports = function (content) {
  const query = this.query
  console.log('md document content', content, query)
  // const exportContent = `${content}`;
  // this.callback(null, `module.exports = function () { return '${JSON.stringify(exportContent)}' }`)
  return `export default ${JSON.stringify(content)}`
  // return `module.exports = function () { return ${JSON.stringify(exportContent)} }`
}
