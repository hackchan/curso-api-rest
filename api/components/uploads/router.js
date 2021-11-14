const express = require('express')
const router = express.Router()

router.get('/', loadingExcel)

function loadingExcel(req, res, next) {
  try {
    res.send({ loading: true })
  } catch (err) {
    next(err)
  }
}

module.exports = router
