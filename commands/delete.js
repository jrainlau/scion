const { prompt } = require('inquirer')
const { writeFile } = require('fs')
const { listTable } = require(`${__dirname}/../utils`)

let tplList = require(`${__dirname}/../templates`)

const question = [
  {
    type: 'input',
    name: 'name',
    message: 'Which template you want to delete:',
    validate (val) {
      if (tplList[val]) {
        return true
      } else if (val === '') {
        return 'Name is required!'
      } else if (!tplList[val]) {
        return 'This template doesn\'t exists.'
      }
    }
  }
]

module.exports = prompt(question).then(({ name }) => {
  delete tplList[name]

  writeFile(`${__dirname}/../templates.json`, JSON.stringify(tplList), 'utf-8', (err) => {
    if (err) {
      console.log(err)
    }
    listTable(tplList, 'Template has been deleted successfully!')
  })
})
