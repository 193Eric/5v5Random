var express = require('express')
var request = require('request')
var path = require('path')
var bodyParser = require('body-parser')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)
// 路径简单，直接在这里配置
var router = express.Router()
// 配置端口
var port = 3000
// 配置网页文件目录
app.set('views', './html')
// app.set('view engine','ejs')
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(express.static(__dirname))
// socket连接
io.on('connection', function (socket) {
  console.log('一个新连接')
  socket.on('random', function (res) {
    console.log(res.arr)
    socket.broadcast.emit('msg', {go: 'yes',arr: res.arr})
  })
  socket.on('init', function () {
    socket.broadcast.emit('msg', {go: 'no' })
  })
})
http.listen(port, function () {
  console.log('正在监听3000端口')
})
// 配置api路径
// get请求示例:http://172.0.0.1:3000/c/page1
app.get('/', function (req, res) {
  res.sendfile('index.html')
})
