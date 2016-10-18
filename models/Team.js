const db = require('../config/db')
const squel = require('squel')

const TABLE_NAME = 'Teams'

db.query(`CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (
  teamId INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(80),
  PRIMARY KEY (teamId)
)`, err => {
  if(err) throw err
})

exports.findAll = () => new Promise((resolve, reject) => {
  db.query(`SELECT * FROM ${TABLE_NAME}`, (err, teams) => {
    if(err) return reject(err)
    resolve(teams)
  })
})


exports.create = function(team) {
  return new Promise((resolve, reject) => {
    let sql = squel.insert().into(TABLE_NAME).setFields(team).toString()

    db.query(sql, (err, result) => {
      if(err) return reject(err)
        resolve(result)
    })
  })
}
// exports.create = () => new Promise((resolve, reject) => {
//   let sql = squel.insert().into(TABLE_NAME).setFields(team).toString()
//   db.query(sql, (err, result) => {
//     if(err) return reject(err)
//     resolve(result)
//   })
// })