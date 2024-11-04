
const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});


app.use(cors());
app.use(express.json());

// A temporary in-memory "database" until you integrate a real database
let mhs = [];

// Create data mahassiwa
app.post('/mhs', (req, res) => {
  const { nim, nama } = req.body;
  if (!nim || !nama) {
    return res.status(400).send('Missing nim or nama');
  }

  const newMhs = { id: mhs.length + 1, nim, nama };
  mhs.push(newMhs);
  res.status(201).send(newMhs);
});

// Get semua data mahasiswa
app.get('/mhs', (req, res) => {
  res.json(mhs);
});

// Get data mahasiswa
app.get('/mhs/:id', (req, res) => {
  const temp = mhs.find(b => b.id === parseInt(req.params.id));
  if (!temp) {
    return res.status(404).send('Data mahasiswa not found');
  }
  res.json(temp);
});

// Update data mahasiswa
app.put('/mhs/:id', (req, res) => {
  const temp = mhs.find(b => b.id === parseInt(req.params.id));
  if (!temp) {
    return res.status(404).send('Data mahasiswa not found');
  }

  const { nim, nama } = req.body;
  temp.nim = nim || temp.nim;
  temp.nama = nama || temp.nama;

  res.send(temp);
});

// Delete data mahasiswa
app.delete('/mhs/:id', (req, res) => {
  const bookIndex = mhs.findIndex(b => b.id === parseInt(req.params.id));
  if (bookIndex === -1) {
    return res.status(404).send('Data mahasiswa not found');
  }

  mhs.splice(bookIndex, 1);
  res.status(204).send();
});