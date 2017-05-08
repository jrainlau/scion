const { prompt } = require('inquirer')
const { writeFile } = require('fs')
const { listTable } = require(`${__dirname}/../utils`)
const { resolve } = require('path')
const chalk = require('chalk')
const download = require('download-git-repo')
const ora = require('ora')

let tplList = require(`${__dirname}/../templates`)

const question = [
  {
    type: 'input',
    name: 'name',
    message: 'Template name:',
    validate (val) {
      if (tplList[val]) {
        return true
      } else if (val === '') {
        return 'Name is required!'
      } else if (!tplList[val]) {
        return 'This template doesn\'t exists.'
      }
    }
  },
  {
    type: 'input',
    name: 'project',
    message: 'Project name:',
    validate (val) {
      if (val !== '') {
        return true
      }
      return 'Project name is required!'
    }
  },
  {
    type: 'input',
    name: 'place',
    message: 'Where to init the project:',
    default: './'
  }
]

module.exports = prompt(question).then(({ name, project, place }) => {
  const gitPlace = tplList[name]['owner/name']
  const gitBranch = tplList[name]['branch']
  const spinner = ora('Downloading template...')

  spinner.start()

  download(`${gitPlace}#${gitBranch}`, `${place}/${project}`, (err) => {
    if (err) {
      console.log(chalk.red(err))
      process.exit()
    }
    spinner.stop()
    console.log(chalk.green('New project has been initialized successfully!'))
  })
})
