var express = require('express')
var request = require('request')
var path = require('path')
var bodyParser = require('body-parser')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)
var roleArr = [];
var site = [1,2,3,4,5,6,7,8,9,10];
var selectRole = [];
var code = '';
// 路径简单，直接在这里配置
var router = express.Router()
//连接数据库
var mysql = require('mysql')
var fs = require('fs')
var dbData, sql
var content = fs.readFileSync('mysql.json')
sql = mysql.createConnection(JSON.parse(content.toString()))
sql.connect()

// 配置端口
var port = 3000
// 配置网页文件目录
app.set('views', './html')
// app.set('view engine','ejs')
app.use(bodyParser.urlencoded({ 'limit': '10000kb' }))
app.use(bodyParser.json())
app.use(express.static(__dirname))
function getAll(){
  sql.query('select * from user', function (err, rows) {
    selectRole = rows;
    code = rows.length;
    socket.broadcast.emit('selectRole', { selectRole: selectRole })
 })
}
// socket连接
io.on('connection', function (socket) {
  getAll()
  socket.on('random', function (res) {
    if(site.length>0){
      var num = Math.floor(Math.random() * site.length);
      var roleNum = site[num];
      site.splice(num,1)
      roleArr[roleNum] = {
        url: res.url
      }
      socket.broadcast.emit('role', { role: roleArr,type:0 })
    }else{
      socket.emit('random',{ms:'人数已满'})
    }
  })
  socket.on('init', function () {
    roleArr = [];
    var site = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    socket.broadcast.emit('role', {role: roleArr ,type:1})
  })
  socket.on('send-img',function(req){
    var imgData = req.img
    // 过滤data:URL
    var base64Data = imgData.replace(/^data:image\/\w+;base64,/, ' ')
    var dataBuffer = new Buffer(base64Data, 'base64')
    var time = new Date().getTime()
    fs.writeFile(__dirname + '/images/' + time + '.png', dataBuffer, function (err) {
      if (err) {
        console.log('保存失败')
      } else {
        var url = 'http://http://119.29.140.135:3000/images/'+time+'.png';
        sql.query('insert into user set ?', { id: code-0+1,url:url}, function (err) {
          if (err) {
            console.log('保存失败')
          } else {
            console.log('保存成功')
            getAll();
            socket.emit('send-img', { code: 1, ms: '保存成功' })
          }
        })
      }
    })    
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
