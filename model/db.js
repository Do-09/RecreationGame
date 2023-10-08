let sql = require('mysql');

let db = sql.createConnection({
    host: 'softpbl.ctdz1ecezbrw.ap-northeast-2.rds.amazonaws.com',
    user: 'recreation',
    port: 3306,
    password: 'tn156bm48',
    database: 'softpbl'
})

db.connect((e)=>{
    if(e) throw e;
    console.log('DB성공')
})

module.exports = db;