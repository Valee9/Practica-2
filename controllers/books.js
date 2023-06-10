const usersModel = require('../models/user');
const reservesModel = require('../models/reserve');
const booksModel = require('../models/book');

const getBooksList = async function(req, res) {
    try {
      const books = await booksModel.find().lean(); 

      for (let book of books) {
        const reserves = await reservesModel.find({ book_id: book.id }).lean(); 
        const userIds = reserves.map(reservation => reservation.user_id);
  
        const users = await usersModel.find({ id: { $in: userIds } }).lean();
        const reservedBy = users.map(user => {

          return { id: user.id, name: user.name, faculty: user.faculty };
        });

        book.reserves = reservedBy;
      }
  
      res.status(200).json(books);
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
};

module.exports = { getBooksList };
