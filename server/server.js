const express = require('express')
var cors = require('cors')
const app = express()
app.use(cors())
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('database.db', sqlite3.OPEN_READWRITE)

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))

app.use(express.json())
const moviesRouter = require('./routes/movies')
const genresRouter = require('./routes/genres')
app.use('/movies', moviesRouter)
app.use('/genres', genresRouter)

// sql = 'SELECT * FROM genre'
// db.all(sql, [], (err, rows)=> {
//     if (err) return console.error(err.message)
//     db.all(sql, [], (err, rows)=> {
//         if (err) return console.error(err.message)
//         rows.forEach((row) => {
//             console.log(row)
//         })
//     })
// })
// sql = 'INSERT INTO movies (title, year, genre, poster) VALUES (?,?,?,?)'
// db.run(sql, ['Ant-Mand and the Wasp: Quantumania', '2023', 'Action', 'https://m.media-amazon.com/images/M/MV5BODZhNzlmOGItMWUyYS00Y2Q5LWFlNzMtM2I2NDFkM2ZkYmE1XkEyXkFqcGdeQXVyMTU5OTA4NTIz._V1_FMjpg_UX1000_.jpg'], (err)=> {
//     if (err) return console.error(err.message)

//     console.log("A new row has been created")
// })

// db.run('INSERT INTO genre (genreName) VALUES (?)', ['Drama'], (err) => {
//     if (err) return console.error(err.message)
//     console.log("New genre added")
// })

// DELETE ROW
// db.run('DELETE FROM movies WHERE id=17', (err) => {
//     if (err) return console.error(err.message)
//     console.log("Row deleted")
// })

// sql = 'SELECT *  FROM movies'
// db.all(sql, [], (err, rows)=> {
//     if (err) return console.error(err.message)
//     rows.forEach(row=> {
//         console.log(row)
//     })
// })

// sql = `SELECT * FROM movies WHERE title LIKE '%Spider%'`
// db.all(sql, [], (err, rows) => {
//     if (err) return console.error(err.message)
//     rows.forEach(row=> {
//         console.log(row)
//     })
// })

app.listen(5000, () => {console.log("Server started on port 5000")})