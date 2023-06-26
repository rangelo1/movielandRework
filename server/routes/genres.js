const express = require("express")
const router = express.Router()
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('database.db', sqlite3.OPEN_READWRITE)

router.get("/", (req, res) => {
    sql = 'SELECT * FROM genre'
    const allGenres = []
    db.all(sql, [], (err, rows) => {
        if (err) return console.error(err.message)
        rows.forEach((row) => {
            allGenres.push(row)
        })
        res.send(allGenres)
    })
})

router.get("/:id", (req, res) => {
    sql = `SELECT * FROM genre WHERE id=${req.params.id}`
    db.all(sql, [], (err, rows) => {
        if (err) return console.error(err.message)
        rows.forEach((row) => {
            res.send(row)
        })
    })
})

router.post("/", (req, res) => {
    sql = "INSERT INTO genre (genreName) VALUES (?)"
    db.run(sql, [req.body.genreName], (err) => {
        if (err) return console.error(err.message)
    })
})

router.put("/:id", (req, res) => {
    sql = 'UPDATE genre SET genreName=(?) WHERE id=(?)'
    db.run(sql, [req.body.genreName, req.params.id], (err) => {
        if (err) return console.error(err.message)
        console.log("Successful update")
    })
})

router.delete("/:id", (req, res) => {
    sql = `DELETE FROM genre WHERE id=${req.params.id}`
    db.run(sql, (err) => {
        if (err) return console.error(err.message)
        console.log("Successful deletion")
    })
})

module.exports = router