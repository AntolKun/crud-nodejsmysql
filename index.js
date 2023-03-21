const express = require('express');
const bodyParser = require('body-parser');
const koneksi = require('./config/db');
const app = express();
const PORT = process.env.PORT || 5000;

// set body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//create data
app.post('/api/bootcamp', (req, res) => {
  //variabel penampung data mysql
  const data = { ...req.body };
  const querySql = 'INSERT INTO bootcamp SET ?'

  //jalankan query mysql
  koneksi.query(querySql, data, (err, rows, field) => {
    //handle error
    if (err) {
      return res.status(500).json({ message: 'Gagal insert data!', error:err })
    }
    //jika request berhasil
    res.status(201).json({ success: true, message: 'Berhasil insert data!' })
  })
})

//read data
app.get('/api/bootcamp', (req, res) => {
  //query mysql
  const querySql = 'SELECT * FROM bootcamp'

  //jalankan query mysql
  koneksi.query(querySql, (err, rows, field) => {
    //handle error
    if (err) {
      return res.status(500).json({ message: 'Gagal Get Data!', error:err })
    }

    //jika berhasil
    res.status(200).json({ success: true, message: 'Berhasil Get Data!', data: rows })
  })
})

//update data
app.put('/api/bootcamp/:id', (req, res) => {
  //variabel data dan penampung sql
  const data = { ...req.body }
  const querySearch = 'SELECT * FROM bootcamp WHERE id = ?'
  const queryUpdate = 'UPDATE bootcamp SET ? WHERE id = ?'

  //jalankan query pencarian data
  koneksi.query(querySearch, req.params.id, (err, rows, field) => {
    //handle error
    if (err) {
      return res.status(500).json({ message: 'Ada kesalahan!', error: err })
    }

    //jika id yang dimasukan sesuai dengan database
    if (rows.length){
      //jalankan query update
      koneksi.query(queryUpdate, [data, req.params.id], (err, rows, field) => {
        //handle error
        if (err) {
          return res.status(500).json({ message: 'Ada kesalahan!', error: err })
        }

        //jika update berhasil
        res.status(200).json({ success: true, message: 'Berhasil update data!' })
      })
    } else {
      return res.status(500).json({ message: 'Ada kesalahan!', error: err })
    }
  })
})

//delete data

// buat server nya
app.listen(PORT, () => console.log(`Server running at port: ${PORT}`));