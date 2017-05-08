const Table = require('cli-table')
const chalk = require('chalk')

const table = new Table({
  head: ['Template Name', 'Owner/Name', 'Branch'],
  style: {
    head: ['green']
  }
})

function listTable (tplList, lyric) {
  const list = Object.keys(tplList)
  if (list.length) {
    list.forEach((key) => {
      table.push([key, tplList[key]['owner/name'], tplList[key]['branch']])
      if (table.length === list.length) {
        console.log(table.toString())
        if (lyric) {
          console.log(chalk.green(`\u2714 ${lyric}`))
        }
        process.exit()
      }
    })
  } else {
    console.log(table.toString())
    if (lyric) {
      console.log(chalk.green(`\u2714 ${lyric}`))
    }
    process.exit()
  }
}

exports.listTable = listTable
