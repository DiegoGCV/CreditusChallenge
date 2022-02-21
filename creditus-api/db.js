var sqlite3 = require('sqlite3').verbose();
const DBSOURCE = "db.sqlite";

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        // Cannot open database
        console.error(err.message)
        throw err
    }else{
        console.log('Connected to the db.')
        db.run(`CREATE TABLE post (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title text, 
            content text, 
            createdAt text
            )`,
        (err) => {
            if (err) {
                // Table already created
            }
        });  
    }
});

module.exports = db
