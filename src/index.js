co
const debug = require('debug')('main')
const express = require('express')

const state = {
  port: process.env.PORT, 
  expressApp: null, // 
  httpServer: null,
  isOn: false, 
  httpsCredentials: {
    key: process.env.HTTPS_KEY,
    cert: process.env.HTTPS_CERT,
  },
}

const start = () => {
  return new Promise((resolve, reject) => {
    if (state.isOn) return reject('SERVER IN USE')
    state.expressApp = express.createServer(state.httpsCredentials)
    return state.httpServer = state.app.listen(state.port, (err) => {
      if (err) return reject(err)
      debug('_SERVER_UP_', state.port)
      state.isOn = true
      return resolve(state)
    })
  })
}

const stop = () => {
  return new Promise((resolve, reject) => {
    if (!state.isOn) return reject('SERVER NOT ON')
    return state.server.close((err) => {
      if (err) return reject(err)
      debug('_SERVER_DOWN_')
      state.isOn = false
      state.app = null
      state.server =  null
      return resolve()
    })
  })
}

module.exports = {start, stop, state}
