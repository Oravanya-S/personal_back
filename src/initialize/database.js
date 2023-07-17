const {sequelize, GroupColor, BagType, Color, Model, Product } = require('../models');

sequelize
  .sync({force: true})
  .then(() => {
    return GroupColor.bulkCreate([
      {id: 1, name: "Black", hexcode: "#000000"},
      {id: 2, name: "Blue", hexcode: "#3E7DCC"},
      {id: 3, name: "Brown", hexcode: "#954618"},
      {id: 4, name: "Gray", hexcode: "#808080"},
      {id: 5, name: "Green", hexcode: "#7BA246"},
      {id: 6, name: "Orange", hexcode: "#F47725"},
      {id: 7, name: "Purple", hexcode: "#6E3A9E"},
      {id: 8, name: "Red", hexcode: "#EA4335"},
      {id: 9, name: "Tans", hexcode: "#D2B48C"},
      {id: 10, name: "White", hexcode: "#FFFFFF"},
      {id: 11, name: "Yellow", hexcode: "#F9D84A"},
    ])
  }).then(() => {
    return BagType.bulkCreate([
      {id: 1, name: "Handbag"},
      {id: 2, name: "Shoulder bag"},
      {id: 3, name: "Crossbody bag"},
      {id: 4, name: "Wallet"},
    ])
  }).then(()=>process.exit(0))
  .catch((err) => console.log(err.message));

  