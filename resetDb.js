

//insert some sample data
require('dotenv').config()
const db = require('./config/db')
const squel = require('squel')

// drop the tables
db.query('drop table Teams')
db.query('drop table Players', err => {
  if(err) throw err
  //recreate the tables with the new schema
  require('./models/Team')
  require('./models/Player')

  let playerSql = squel.insert().into('Players').setFieldsRows([
    { name: 'Joshua' },
    { name: 'Kelly' },
    { name: 'Kaelynn' }
  ]).toString()

  db.query(playerSql, err => {
    if(err) throw err
  })

  let teamSql = squel.insert().into('Teams').setFieldsRows([
    { name: 'Maddox Family' },
    { name: 'Smith Family' },
    { name: 'Cole Family' }
  ]).toString()

  db.query(teamSql, err => {
    if(err) throw err
  })

  db.end(() => console.log('Done!'))
})