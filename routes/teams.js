
const express = require('express')
const router = express.Router()
const Team = require('../models/Team')

router.route('/')
  .get((req, res) => {
    Team.findAll()
      .then(teams => {
        res.send(teams)
      })
      .catch(err => {
        res.status(400).send(err)
      })
  })
  .post((req, res) => {
    Team.create(req.body)
    .then(Team.findAll)
    .then(teams => {
      res.send(teams)
    })
    .catch(err => {
      res.status(400).send(err)
    })
  })


module.exports = router