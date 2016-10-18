const db = require('../config/db')
const squel = require('squel')

const TABLE_NAME = 'Players'

db.query(`CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (
  id INT NOT NULL AUTO_INCREMENT,
  teamId INT,
  name VARCHAR(80),
  PRIMARY KEY (id)
)`, err => {
  if(err) throw err
})

// exports.findAll = () => new Promise((resolve, reject) => {
//   db.query(`SELECT * FROM ${TABLE_NAME}`, (err, players) => {
//     if(err) return reject(err)
//       resolve(players)
//   })
// })

exports.findAll = () => new Promise((resolve, reject) => {
  let sql = squel.select()
                 .field('Players.id')
                 .field('Players.name')
                 .field('Teams.name', 'teamName')
                 .from(TABLE_NAME)
                 .join('Teams', null, 'Players.teamId = Teams.teamId')
                 // .where('Players.teamId = 2')
                 .toString()
  db.query(sql, (err, players) => {
    if(err) return reject(err)
      resolve(players)
  })
})

exports.create = function(player) {
  return new Promise((resolve, reject) => {
    let sql = squel.insert().into(TABLE_NAME).setFields(player).toString()

    db.query(sql, (err, result) => {
      if(err) return reject(err)
        resolve(result)
    })
  })
}

exports.update = (playerId, updateObj) => {
  return new Promise((resolve, reject) => {
    let sql = squel.update().table(TABLE_NAME).setFields(updateObj).where(`id = ${playerId}`).toString()

    db.query(sql, (err, result) => {
      if(err) return reject(err)
      resolve(result)
    })
  })
}