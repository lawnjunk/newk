require('dotenv').config()
const server = require(`${__dirname}/src/index.js`)

async function main(){
  await server.start()
}

main()
