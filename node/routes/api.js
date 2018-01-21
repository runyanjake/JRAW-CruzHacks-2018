var MysqlJson = require('mysql-json');
var router = require('./index.js');

var connection = new MysqlJson({
    host: 'aa1n8jh2opxn3kh.ciminup0pyrz.us-west-1.rds.amazonaws.com',
    user: 'jjraw',
    password: 'cruzhacks2018',
    port: '3306',
    database: 'toilet_database'
});

connection.connect(function (err) {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }

    console.log('Connected to database.');
});

router.get('/toilets', function (req, res) {
    var data = {
        "Data": ""
    };
    connection.query("SELECT * FROM toilet_table", function (err, rows, fields) {

        data["Data"] = rows;
        console.log(data);
        res.json(data);
    });
});

module.exports = router;