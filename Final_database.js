const express = require("express")
const bodyparser = require("body-parser")
const cor = require('cors')
const app = express()
const server = require('http').Server(app)
const sql = require('mssql')

const config = {
    user :"sqlserver",
    password:"password1234",
    server:"35.223.146.167",
    database: "webDB",
    options: {
        "encrypt": false,
        trustedconnection: true,
        "enableArithAort": true,
        instancename:"SQLEXPRESS"
    }
}

sql.connect(config,(err) =>{
    if (err){
        console.log(err)
    }else{
        console.log("mysql connected")
    } 
})

app.use(cor())
app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin","*")
    res.header("Access-Control-ALlow-header","origin, X-Request-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials",true);
    res.header("Access-Control-Methods","GET, POST, OPTIONS, PUT, PATCH, DELETE")
    next()
})
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));


// app.use(express.static('build'));

// app.get("/", async (req,res)=>{
//     var sql_request = new sql.Request()
//     console.log("test")
//     data = await sql_request.query('select count(*) from information')
//     console.log(data)
//     res.send(data.recordsets)
// })

app.get("/api/table_back", async(req, res)=>{
    var sql_request = new sql.Request()
    console.log("table")
    data = await sql_request.query('select site_type as type, published, country, title, uuid from information')
    // console.log(data)
    res.send(data.recordsets)
})

// app.post("/search", async(req,res)=>{
//     var sql_request = new sql.Request()
//     // console.log('===========')
//     // console.log(req.body)
//     var KW = [req.body.keyword] + "%"
//     console.log("search")
//     console.log("[  /search   ]     " + KW)
//     data = await sql_request.query(`select top 5 title from information where title like '${KW}' `)
//     // console.log(data)
//     res.send(data.recordsets)
// })

app.get("/api/graph_back", async(req, res)=>{
    var sql_request = new sql.Request()
    console.log("graph")
    data = await sql_request.query('select * from datePerUnit')
    res.send(data.recordsets)
})

app.get("/api/unit_back/:id", async(req, res)=>{
    var sql_request = new sql.Request()
    // console.log(req)
    console.log("unit: " + req.params.id)
    data = await sql_request.query(`select * from information where uuid = '${req.params.id}'`)
    // console.log(data.recordsets)
    res.send(data.recordsets)
})

app.get("/api/piechart_back", async(req, res)=>{
    var sql_request = new sql.Request()
    // console.log(req)
    console.log("piechart")
    data = await sql_request.query(`select site_type as type, COUNT(*) as count from information group by site_type`)
    console.log(data.recordsets)
    res.send(data.recordsets)
})

const PORT = process.env.PORT || 3000;


server.listen(PORT,(req,res)=>{
    console.log("ok App listen in port: " + PORT)
})