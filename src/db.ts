import datastore from 'nedb'
import { resolve } from 'path'

const db = new datastore({
  filename: resolve(__dirname, './db'),
  autoload: true
})

class DB {
  static find (condition:Object) {
    return new Promise((resolve, reject) => {
      db.find(null, condition, (err: TypeError, docs: Array<any>) => {
        if (err) reject(err)
        resolve(docs)
      })
    })
  }
  static insert (doc: Object) {
    return new Promise((resolve, reject) => {
      db.insert(doc, (err: TypeError, newDoc: Array<any>) => {
        if (err) reject(err)
        resolve(newDoc)
      })
    })
  }
  static remove (condition:Object) {
    return new Promise((resolve, reject) => {
      db.remove(condition, (err: Error, newDoc: any) => {
        if (err) reject(err)
        resolve(newDoc)
      })
    })
  }
}

export default DB
