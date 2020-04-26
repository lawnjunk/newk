const debug = require('debug')('main')
const express = require('express')
const morgan = require('morgan')
const https = require('https')
const cors = require('cors')

const state = {
  port: process.env.PORT, 
  httpsCredentials: {
    key: process.env.HTTPS_KEY,
    cert: process.env.HTTPS_CERT,
  },
  requestHandler: express()
    .use(morgan('combined'))
    .use(cors()),
  httpServer: null,
  isOn: false, 
}

const start = () => {
  return new Promise((resolve, reject) => {
    if (state.isOn) return reject('SERVER IN USE')
    state.httpServer = https.createServer(state.httpsCredential, state.requestHandler)
    state.httpServer.listen(state.port, (err) => {
        if (err) return reject(err)
        debug('_SERVER_UP_', state.port)
        state.isOn = true
        resolve(state)
      })
  })
}

const stop = () => {
  return new Promise((resolve, reject) => {
    if (!state.isOn) return reject('SERVER NOT ON')
    state.httpServer.close((err) => {
      if (err) return reject(err)
      debug('_SERVER_DOWN_')
      state.isOn = false
      state.httpServer =  null
      return resolve()
    })
  })
}

module.exports = {start, stop, state}
