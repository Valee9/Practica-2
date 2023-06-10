const usersModel = require('../models/user');
const reservesModel = require('../models/reserve');
const booksModel = require('../models/book');

const getUsers = async function (req, res) {
    try {
        const users = await usersModel.find();
        res.status(200).send(users)
    } catch (e) {
        res.status(404).json({message: e.message });
    }
};

const getUserList = async function(req, res) {
    try {
      const userList = await usersModel.aggregate([
        {
          $lookup: {
            from: 'reserves',
            localField: 'id',
            foreignField: 'user_id',
            as: 'reservations'
          }
        },
        {
          $lookup: {
            from: 'books',
            localField: 'reservations.book_id',
            foreignField: 'id',
            as: 'reserves'
          }
        },
        {
          $addFields: {
            date_last_reserve: { $max: '$reservations.reserved_at' },
            cant_reserves_last_mont: {
              $size: {
                $filter: {
                  input: '$reservations',
                  as: 'reservation',
                  cond: {
                    $gte: [
                      '$$reservation.reserved_at',
                      new Date(new Date().setMonth(new Date().getMonth() - 1))
                    ]
                  }
                }
              }
            }
          }
        },
        {
          $project: {
            _id: 0,
            name: 1,
            faculty: 1,
            date_last_reserve: 1,
            cant_reserves_last_mont: 1,
            reserves: 1
          }
        }
      ]);
  
      res.status(200).json(userList);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
};

const getBooksList = async function(req, res) {
    try {
      const books = await booksModel.find({}, { _id: 0, id: 0, code: 0 }).lean(); // Obtener todos los libros de la biblioteca
  
      // Recorrer cada libro y obtener la lista de usuarios que lo han reservado
      for (let book of books) {
        const reserves = await reservesModel.find({ book_id: book.id }).lean(); // Obtener reservas del libro
        const userIds = reserves.map(reservation => reservation.user_id); // Obtener los IDs de usuario
  
        // Obtener los detalles de los usuarios que han reservado el libro
        const users = await usersModel.find({ id: { $in: userIds } }).lean();
        const reservedBy = users.map(user => {
          // Aquí puedes seleccionar los campos que deseas mostrar para cada usuario
          return { id: user.id, name: user.name, faculty: user.faculty };
        });
  
        // Puedes seleccionar los campos que deseas mostrar para cada libro
        book.reserves = reservedBy;
      }
  
      res.status(200).json(books);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
};

module.exports = { getUsers, getUserList, getBooksList };