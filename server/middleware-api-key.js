'use strict'

const app = require('./server')
const storedApiKey = app.get('apiKey')

module.exports = function() {
  return function xApiKey(req, res, next) {
    if(req.url.startsWith('/explorer/')) return next()

    const xApiKey = req.headers['x-api-key']
    if (xApiKey && xApiKey === storedApiKey) return next()

    const err = Error('API Key Required')
    err.status = 401
    return next(err)
  }
}