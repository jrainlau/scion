'use strict'
const co = require('co')
const prompt = require('co-prompt')
const config = require('../templates')
const chalk = require('chalk')
const fs = require('fs')

module.exports = () => {
 	co(function *() {
  	let tplName = yield prompt('Template name: ')
  	let gitUrl = yield prompt('Git https link: ')
  	let branch = yield prompt('Branch: ')

    if (!config.tpl[tplName]) {
      config.tpl[tplName] = {}
      config.tpl[tplName]['url'] = gitUrl.replace(/[\u0000-\u0019]/g, '')
      config.tpl[tplName]['branch'] = branch
    } else {
      console.log(chalk.red('Template has already existed!'))
      process.exit()
    }

		fs.writeFile(__dirname + '/../templates.json', JSON.stringify(config), 'utf-8', (err) => {
			if (err) console.log(err)
			console.log(chalk.green('New template added!\n'))
      console.log(chalk.grey('The last template list is: \n'))
      console.log(config)
      console.log('\n')
			process.exit()
		})
  })
}