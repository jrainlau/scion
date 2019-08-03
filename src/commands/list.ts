import DB from '../db'
import listTable from '../table'

async function listTemplates () {
  const tplList:any = await DB.find({})

  listTable(tplList, '')
}

export default listTemplates
