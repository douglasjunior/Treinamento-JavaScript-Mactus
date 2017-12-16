const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('database.sqlite');

db.serialize(function () {
    db.run('CREATE TABLE IF NOT EXISTS lorem (info TEXT)');

    const stm = db.prepare('INSERT INTO lorem VALUES (?)');
    for (let i = 0; i < 100; i++) {
        stm.run("ipsum " + i);
    }
    stm.finalize();

    db.each("SELECT rowid as id, info FROM lorem", function(err, row) {
        console.log(row.id, row.info);
    })
});