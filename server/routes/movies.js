const express = require("express")
const router = express.Router()
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('database.db', sqlite3.OPEN_READWRITE)

router.get('/', (req, res) => {
    const title = req.query.title
    const genre = req.query.genre
    if (title === undefined && genre === undefined) {
        sql = `SELECT * FROM movies ORDER BY title ASC LIMIT 21`
    }
    else if (genre == 0) {
        sql = `SELECT * FROM movies WHERE (title LIKE '%${title}%') ORDER BY title ASC`
    }
    else {
        sql = `SELECT * FROM movies WHERE (title LIKE '%${title}%') AND (genreID == ${genre}) ORDER BY title ASC`   
    }
    // console.log(sql)
    const allMovies = []
    db.all(sql, [], (err, rows)=> {
        if (err) return console.error(err.message)
        rows.forEach((row) => {
            allMovies.push(row)
        })
        res.send(allMovies)
    })
})

router.get('/:id', (req, res) => {
    sql = `SELECT movies.id, movies.title, movies.year, movies.poster, movies.genreID, genre.genreName FROM movies LEFT JOIN genre ON (movies.genreID = genre.id) WHERE movies.id=${req.params.id}`
    db.all(sql, [], (err, rows)=> {
        if (err) return console.error(err.message)
        rows.forEach(row=> {
            res.send(row)
        })
    })
})

router.post('/', (req, res) => {
    console.log(req.body)
    sql = 'INSERT INTO movies (title, year, genreID, poster) VALUES (?,?,?,?)'
    db.run(sql, [req.body.title, req.body.year, req.body.genreID, req.body.poster], (err)=> {
        if (err) return console.error(err.message)
        console.log("A new row has been created")
    })
})

router.put('/:id', (req, res) => {
    sql = 'UPDATE movies SET title=(?), year=(?), genreID=(?), poster=(?) WHERE id=(?)'
    db.run(sql, [req.body.title, req.body.year, req.body.genreID, req.body.poster, req.params.id], (err) => {
        if (err) return console.error(err.message)
        console.log("Successful update")
    })
})

router.delete('/:id', (req, res) => {
    sql = `DELETE FROM movies WHERE id=${req.params.id}`
    res.send(`Delete movie with ID ${req.params.id}`)
    db.run(sql)
})

module.exports = router