import { prompt } from 'inquirer'
import DB from '../db'
import listTable from '../table'
import initiator from '../initiator'

async function initTemplate () {
  const tplList:any = await DB.find({})
  listTable(tplList, '', false)

  const questions = [{
    type: 'rawlist',
    name: 'tplName',
    message: 'Select a template:',
    choices: () => tplList.map(tpl => {
      return {
        name: tpl.name,
        value: tpl.name,
      }
    })
  }, {
    type: 'input',
    name: 'project',
    message: 'Project name:',
    default: (lastAnswer) => {
      return lastAnswer.tplName
    }
  }]

  prompt(questions).then(async ({ tplName, project }) => {
    const tpl = tplList.filter(({ name }) => name === tplName)[0]
    const { path, branch, from }:any = tpl
    const pwd = process.cwd()
    initiator({ path, branch, from, dist: `${pwd}/${project}` })
  })
}

export default initTemplate
