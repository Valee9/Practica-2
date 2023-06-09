const express = require('express');

// const booksRoutes = require('./routes/books');
// const reservesRoutes = require('./routes/reserves');
// const usersRoutes = require('./routes/users');

const app = express();

//Conex BD
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/biblioteca');
const objectbd = mongoose.connection;
objectbd.on('connected', () => {console.log('Conexión correcta')})
objectbd.on('error', () => {console.log('Conexión incorrecta')})


//Routes
// app.use('/api/books',booksRoutes);
// app.use('/api/reserves',reservesRoutes);
// app.use('/api/users',usersRoutes);


app.get('/', (req,res) => {
    res.end('Bienvenidos')
})
app.listen(5000, function() {
    console.log('correcto')
})


