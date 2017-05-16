#!/usr/bin/env node

process.env.NODE_PATH = __dirname + '/../node_modules/'

const { resolve } = require('path')

const res = command => resolve(__dirname, '../commands/', command)

const program = require('commander')

program
  .version(require('../package').version )

program
  .usage('<command>')

program
  .command('add')
  .description('Add a new template')
  .alias('a')
  .action(() => {
    require(res('add'))
  })

program
  .command('list')
  .description('List all the templates')
  .alias('l')
  .action(() => {
    require(res('list'))
  })

program
  .command('init')
  .description('Generate a new project')
  .alias('i')
  .action(() => {
    require(res('init'))
  })

program
  .command('delete')
  .description('Delete a template')
  .alias('d')
  .action(() => {
    require(res('delete'))
  })

program
  .command('map')
  .description('Place files to diffirent position')
  .alias('m')
  .action(() => {
    require(res('map'))
  })

program.parse(process.argv)

if(!program.args.length){
  program.help()
}
