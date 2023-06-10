const usersModel = require('../models/user');

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

module.exports = { getUserList };