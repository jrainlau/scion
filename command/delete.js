const co = require('co')
const prompt = require('co-prompt')
const config = require('../templates')
const chalk = require('chalk')
const fs = require('fs')

module.exports = run = () => {
 	co(function *() {
  	let tplName = yield prompt('Template name: ')

  	config.tpl[tplName] = undefined

		fs.writeFile('../templates.json', JSON.stringify(config), 'utf-8', (err) => {
			if (err) console.log(err)
			console.log(chalk.green('Template deleted!'))
			process.exit()
		})
  })
}