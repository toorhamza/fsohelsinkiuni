require('dotenv').config()

let PORT  = process.env.PORT
let MONGODB_URI = process.env.MONGODB_URI

console.log(`${PORT} from config file`)

module.exports = {
    PORT,
    MONGODB_URI
}