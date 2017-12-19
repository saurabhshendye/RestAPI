const express = require('express')
const mysql = require('mysql')
const bodyParser = require('body-parser')
const app = express()

var fs = require("fs"),
    json;

function readJsonFileSync(filepath, encoding){

    if (typeof (encoding) == 'undefined'){
        encoding = 'utf8';
    }
    var file = fs.readFileSync(filepath, encoding)
    return JSON.parse(file)
}

// config.json is in application root
json = readJsonFileSync('config.json')
// console.log('username: ', json.mysql.username);
mySqlConnect()


// connection.query('SELECT * FROM Air_Quality', function (err, rows, fields) {
//   if (err) throw err
//
//   console.log('The solution is: ', rows[0].CO)
// })

// connection.end()




app.get('/', (req, res) => res.send('Hello World!'))
app.get('/api/sum', (req, res) => res.send('Sum is 15'))

app.post('/Analyzer/api/putData', putData)

function putData(req, res){
  console.log(req.body);
  next()
}

function testFunction(req, res1){
  console.log(req.body)
  var testvar = 'variable'
  // res1.send('Test Successful!')
}

function mySqlConnect(){
  var connection = mysql.createConnection({
    host     : json.mysql.hostname,
    user     : json.mysql.username,
    password : json.mysql.password,
    database : json.mysql.database
  });

  connection.connect()
}

function insertIntoMysql(data) {

}


// app.listen(5000, () => console.log('Example app listening on port 5000!'))
