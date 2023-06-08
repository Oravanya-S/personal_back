const {sequelize, GroupColor, BagType, Color, Model, Product } = require('../models');

sequelize
  .sync({force: true})
  .then(() => {
    return GroupColor.bulkCreate([
      {id: 1, name: "Black"},
      {id: 2, name: "Blue"},
      {id: 3, name: "Brown"},
      {id: 4, name: "Gray"},
      {id: 5, name: "Green"},
      {id: 6, name: "Orange"},
      {id: 7, name: "Purple"},
      {id: 8, name: "Red"},
      {id: 9, name: "Tans"},
      {id: 10, name: "White"},
      {id: 11, name: "Yellow"},
    ])
  }).then(() => {
    return BagType.bulkCreate([
      {id: 1, name: "Handbag"},
      {id: 2, name: "Shoulder bag"},
      {id: 3, name: "Crossbody bag"},
      {id: 4, name: "Wallet"},
    ])
  }).then(() => {
    return Color.bulkCreate([
      {name: "Dark black", hexcode: "#000000", groupColorId: 1},
      {name: "Dark gray", hexcode: "#4a4444", groupColorId: 4},
      {name: "Light gray", hexcode: "#eeeeee", groupColorId: 4},
      {name: "Dark red", hexcode: "#871108", groupColorId: 8},
      {name: "Light red", hexcode: "#ff1111", groupColorId: 8},
      {name: "Pearl white", hexcode: "#ffffff", groupColorId: 10},
    ])
  }).then(() => {
    return Model.bulkCreate([
      {name: "Jamie", brand: "Marietta", meterial: "leather", description: "26 cm x 17 cm x 6 cm", bagTypeId: 2},
      {name: "Charlotte", brand: "Marietta", meterial: "leather", description: "26 cm x 17 cm x 6 cm", bagTypeId: 1},
      {name: "Charlotte2", brand: "Marietta", meterial: "leather", description: "26 cm x 17 cm x 6 cm", bagTypeId: 1},
      {name: "Charlotte3", brand: "Marietta", meterial: "leather", description: "26 cm x 17 cm x 6 cm", bagTypeId: 1},
      {name: "Anissa", brand: "Marietta", meterial: "leather", description: "26 cm x 17 cm x 6 cm", bagTypeId: 4},
    ])
  }).then(() => {
    return Product.bulkCreate([
      {price: 1590, stock: 30, modelId: 1, colorId: 2},
      {price: 1590, stock: 30, modelId: 1, colorId: 3},
      {price: 1690, stock: 20, modelId: 1, colorId: 4},
      {price: 1390, stock: 30, modelId: 2, colorId: 2},
      {price: 1290, stock: 20, modelId: 2, colorId: 5},
      {price: 1590, stock: 15, modelId: 3, colorId: 1},

    ])
  }).then(()=>process.exit(0))
  .catch((err) => console.log(err.message));

  