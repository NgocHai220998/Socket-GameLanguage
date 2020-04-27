const app = require('express')()
const bodyParser = require('body-parser')
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const router = require('./src/routes/index.js');
const dbConnection = require('./src/connection/databaseConnection.js')



dbConnection()
const morgan = require('morgan')
app.use(morgan('dev'))
const cors = require('cors')
// const whitelist = ['http://localhost:8080', 'http://localhost:8081', 'http://localhost:8082', 'https://japanese-vnu.herokuapp.com']
// const corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())


app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});



router(app);


const mySocket = require('./src/sockets/index')
io.on('connection', function(socket) {
    console.log('a user connected' + socket.id)
    mySocket.run(socket, io)
})

const PORT = process.env.PORT || 4000

http.listen(PORT, function(){
  console.log('listening on *:' + PORT)
})

const reset = require('./src/sockets/reset')
reset() // Khởi động lại các thuộc tính như, đi học, cướp học, nhiệm vụ...