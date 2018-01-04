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

// config.json contains credentials for the database
// Need to read this file synchronously 
json = readJsonFileSync('config.json')
var connection = mySqlConnect()

// Listen on port 5001
app.listen(5001, () => console.log('listening on port 5001!'))


app.post('/api/Analyzer/putData', putData)

// Callback function for app.post
function putData(req, res, next){
  console.log('Connected')
  insertIntoMysql(req.body, res)
  res.sendStatus(200)
  next()
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

function insertIntoMysql(data, res) {
  connection.query('INSERT INTO ' + TABLE_NAME + '(CO, LPG, SMOKE, PM10, PM25) VALUES('
                  + data.CO + ', ' + data.LPG + ', ' + data.Smoke + ', ' + data.Particles10 + ', '
                  + data.Particles25 + ')' , function(err, result){
                    if (err){
                      console.log(err)
                      res.sendStatus(500)
                    } 
                  })
}
