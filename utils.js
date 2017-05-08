const Table = require('cli-table')
const chalk = require('chalk')

const table = new Table({
  head: ['Template Name', 'Owner/Name', 'Branch'],
  style: {
    head: ['green']
  }
})

function listTable (tplList, lyric) {
  Object.keys(tplList).forEach((key) => {
    table.push([key, tplList[key]['owner/name'], tplList[key]['branch']])
    if (table.length === Object.keys(tplList).length) {
      console.log(table.toString())
      if (lyric) {
        console.log(chalk.green(`\u2714 ${lyric}`))
      }
      process.exit()
    }
  })
}

exports.listTable = listTable
