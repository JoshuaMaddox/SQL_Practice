const express = require('express')
const router = express.Router()
const Player = require('../models/Player')

router.route('/')
  .get((req, res) => {
    Player.findAll()
      .then(players => {
        res.send(players)
      })
      .catch(err => {
        res.status(400).send(err)
      })
  })
  .post((req, res) => {
    Player.create(req.body)
    .then(Player.findAll)
    .then(players => {
      res.send(players)
    })
    .catch(err => {
      res.status(400).send(err)
    })
  })

router.route('/:id')
  .put((req, res) => {
    Player.update(req.params.id, req.body)
      .then(Player.findAll)
      .then(players => {
        res.send(players)
      })
      .catch(err => {
        res.status(400).send(err)
      })

  })

module.exports = router