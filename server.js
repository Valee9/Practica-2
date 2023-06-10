const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 5000;

const booksRoutes = require('./routes/books');
const reservesRoutes = require('./routes/reserves');
const usersRoutes = require('./routes/users');

const booksModel = require('./models/book');
const reservesModel = require('./models/reserve');
const usersModel = require('./models/user');

const dataBook = require('./seeders/book.json');
const dataReserve = require('./seeders/reserve.json');
const dataUser = require('./seeders/user.json');


mongoose.connect('mongodb://127.0.0.1:27017/practica', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;

db.on('connected', async() => {
  console.log('Conexión correcta a la base de datos');

  try {
    await booksModel.deleteMany();
    await reservesModel.deleteMany();
    await usersModel.deleteMany();

    await  booksModel.insertMany(dataBook),
    await reservesModel.insertMany(dataReserve),
    await usersModel.insertMany(dataUser)
    console.log('Datos cargados exitosamente en la base de datos');
  }
  catch (err) {
    console.error('Error al cargar los datos:', err);}
});

db.on('error', (err) => {
  console.error('Error de conexión a la base de datos:', err);
});


app.use('/api/books',booksRoutes);
app.use('/api/books/list1',booksRoutes);
app.use('/api/reserves',reservesRoutes);
app.use('/api/users',usersRoutes);

app.get('/', (req, res) => {
  res.end('Bienvenidos');
});

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});