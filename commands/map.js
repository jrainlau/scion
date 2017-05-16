const Metalsmith = require('metalsmith')
const { resolve } = require('path')
const { prompt } = require('inquirer')
const currentFoler = process.cwd()

let template = require('handlebars').compile

const question = [
  {
    type: 'input',
    name: 'folderPath',
    message: 'Path of your Map folder:',
    default: '/map',
    validate (val) {
      if (!val) {
        return 'Path is required!'
      }
      return true
    }
  }
]

const myPlugin = (file) => {
  return (files, metalsmith, done) => {
    let content = files[file.name].contents.toString()
    let tpl = template(content)
    files[file.name].contents = tpl(file.data)
    if (file.rename) {
      files[file.rename] = files[file.name]
      delete files[file.name]
    }
    metalsmith
      .destination(resolve(currentFoler + file.dist))
      .clean(true)
    done()
  }
}

const ignore = (fileMap, fileName, folderPath) => {
  let ignoreArr = [resolve(currentFoler + folderPath + '/' + 'map.js')]
  fileMap.forEach((file) => {
    if (file.name !== fileName) {
      ignoreArr.push(resolve(currentFoler + folderPath + '/' + file.name))
    }
  })
  return ignoreArr
}

module.exports = prompt(question).then(({ folderPath }) => {
  const fileMap = require(resolve(currentFoler + folderPath + '/map.js'))

  for (let i = 0, len = fileMap.length; i < len; i++) {
    Metalsmith(__dirname)
      .source(resolve(currentFoler + folderPath))
      .ignore(ignore(fileMap, fileMap[i].name, folderPath))
      .use(myPlugin(fileMap[i]))
      .build((err, files) => {
        if (err) throw err
      })
  }
})
