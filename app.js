const express = require('express')
const mysql = require('mysql')
const bodyParser = require('body-parser')
const app = express()
const TABLE_NAME = 'Air_Quality'

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({
   extended: true
}));

var fs = require("fs"),
    json;

// config.json is in application root
json = readJsonFileSync('config.json')
// console.log('username: ', json.mysql.username);
var connection = mySqlConnect()

// app.get('/', (req, res) => res.send('Hello World!'))
app.listen(5001, () => console.log('listening on port 5001!'))

app.get('/api/sum', (req, res) => res.send('Sum is 15'))

app.post('/api/Analyzer/putData', putData)

app.post('/', putData)

function putData(req, res, next){
  console.log('Connected');
  insertIntoMysql(req.body)
  next()
}

function testFunction(req, res1){
  console.log(req.body)
  var testvar = 'variable'
  // res1.send('Test Successful!')
}

function readJsonFileSync(filepath, encoding){

    if (typeof (encoding) == 'undefined'){
        encoding = 'utf8';
    }
    var file = fs.readFileSync(filepath, encoding)
    return JSON.parse(file)
}

function mySqlConnect(){
  var connection = mysql.createConnection({
    host     : json.mysql.hostname,
    user     : json.mysql.username,
    password : json.mysql.password,
    database : json.mysql.database
  });

  connection.connect(function(err) {
  if (err) throw err
  console.log('You are now connected...')})

  return connection
}

function insertIntoMysql(data) {
  console.log(data);
  // jsonData = JSON.parse(data)
  console.log(data.CO);
  connection.query('INSERT INTO ' + TABLE_NAME + '(CO, LPG, SMOKE, PM10, PM25) VALUES('
                  + data.CO + ', ' + data.LPG + ', ' + data.Smoke + ', ' + data.Particles10 + ', '
                  + data.Particles25 + ')' , function(err, result){
                    if (err) throw err
                  })
}
