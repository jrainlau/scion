import { Template } from '../types'
import { prompt } from 'inquirer'
import DB from '../db'
import listTable from '../table'

async function addTemplate () {
  const tplList:any = await DB.find({})

  const questions = [{
    type: 'input',
    name: 'name',
    message: 'Set the custom name of the template:',
    validate (val: Template['name']) {
      let result: string|boolean = true
      if (!val) {
        result = 'Template name cannot be empty.'
      } else if (tplList.some(({ name }) => name === val)) {
        result = `Template with name "${val}" is exist.`
      }
      return result
    }
  },
  {
    type: 'list',
    name: 'from',
    message: 'Where is the template from?',
    choices: ['GitHub', 'GitLab', 'Bitbucket', 'Others']
  },
  {
    type: 'input',
    name: 'from',
    when: ({ from }) => {
      if (from === 'Others') {
        return true
      }
    },
    filter: (val:string) => {
      if (val.startsWith('.')) {
        val = process.cwd() + '/' + val
      }
      return val
    }
  },
  {
    type: 'input',
    name: 'path',
    message: 'Owner/name of the template:',
    when: ({ from }) => {
      if (!['GitHub', 'GitLab', 'Bitbucket'].includes(from)) {
        return false
      } else {
        return true
      }
    },
    validate (val: Template['path']) {
      if (val !== '') {
        return true
      }
      return 'Path is required!'
    }
  },
  {
    type: 'input',
    name: 'branch',
    message: 'Branch of the template:',
    default: 'master',
    when: ({ from }) => {
      if (!['GitHub', 'GitLab', 'Bitbucket'].includes(from)) {
        return false
      } else {
        return true
      }
    },
  }]

  prompt(questions).then(async ({ name, path = '---', branch = '---', from }:any) => {
    const template:Template = {
      name,
      path,
      branch,
      from
    }
    await DB.insert(template)
    const newList:any = await DB.find({})
    listTable(newList, 'New template has been added successfully!')
  })
}

export default addTemplate
