const { User } = require('../models');

exports.createUser = user => User.create(user);

exports.checkEmailExist = async email => {
  const existUser = await User.findOne({
    where: {
      email: email
    }
  })
  return !!existUser;
};

exports.getUserByEmail = async email => {
    const user = await User.findOne({
      where: {
        email: email
      }
    })
    return user;
};

exports.getUserById = id => User.findByPk(id);