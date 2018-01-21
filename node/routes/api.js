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
        res.json(data);
    });
});

router.get('/entries', function (req, res) {
    var data = {
        "Data": ""
    };
    connection.query("SELECT * FROM entries_table WHERE toilet_id =" + req.data, function (err, rows, fields) {

        data["Data"] = rows;
        res.json(data);
    });
});

router.post('/toilets', function (req, res) {
    var sql = "INSERT INTO toilet_table (id, toilet_lat, toilet_lon, toilet_name) VALUES (NULL, \'" + req.data.toilet_lat + "\', \'" + req.data.toilet_lon + "\', \'" + req.data.name + "\')";
    connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
        res.set('Content-Type', 'text/number')
        var returnid = NULL;
        connection.query("SELECT id FROM toilets_table WHERE toilet_name = \'" + req.data.name + "\'", function(err, ret) {
            if(err) throw err;
            returnid = ret;
        });
        res.send(returnid);
    });
});

// router.post('/entries', function (req, res) {
//     var data = {
//         "Data": ""
//     };
//     connection.query("SELECT * FROM entries_table WHERE toilet_id =" + req.data, function (err, rows, fields) {

//         data["Data"] = rows;
//         console.log(data);
//         res.json(data);
//     });
// });

module.exports = router;