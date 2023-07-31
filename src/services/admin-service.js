const {
  GroupColor,
  BagType,
  Color,
  Model,
  Product,
  OrderItem,
  sequelize,
} = require("../models");
const { fn, Op, literal, col, where, QueryTypes } = require("sequelize");

exports.getGroupColorWithColor = () =>
  GroupColor.findAll({
    order: [["createdAt", "DESC"]],
    include: {
      model: Color,
    },
  });

//GroupColor
exports.getGroupColor = () =>
  GroupColor.findAll({
    order: [["createdAt", "DESC"]],
  });

//Color
exports.getColors = () =>
  Color.findAll({
    include: { model: GroupColor },
    order: [["createdAt", "DESC"]],
  });

exports.AddColor = (color) => Color.create(color);
exports.AddColour = (color) => Color.create(color);
exports.UpdateColor = (id, payload) =>
  Color.update(payload, {
    where: {
      id: id,
    },
  });

exports.UpdateColour = (id, payload) =>
  Color.update(payload, {
    where: {
      id: id,
    },
  });
exports.DeleteColor = (id) =>
  Color.destroy({
    where: {
      id: id,
    },
  });

exports.DeleteColour = (id) =>
  Color.destroy({
    where: {
      id: id,
    },
  });

//Bagtypes
exports.getBagTypes = () => BagType.findAll();
exports.AddBagType = (bagtype) => BagType.create(bagtype);
exports.UpdateBagtype = (id, payload) =>
  BagType.update(payload, {
    where: {
      id: id,
    },
  });

exports.DeleteBagtype = (id) =>
  BagType.destroy({
    where: {
      id: id,
    },
  });

//Models
exports.getModels = () =>
  Model.findAll({
    where: {
      status: 1,
    },
    order: [["createdAt", "DESC"]],
  });

exports.checkModelExist = async (name) => {
  const existModel = await Model.findOne({
    where: {
      name: name,
      status: 1,
    },
  });
  return !!existModel;
};

exports.AddModel = (model) => Model.create(model);
exports.UpdateModel = (id, payload) =>
  Model.update(payload, {
    where: {
      id: id,
    },
  });
exports.DeleteModel = (id, payload) =>
  Model.update(payload, {
    where: {
      id: id,
    },
  });

//Products
exports.getProducts = () =>
  Product.findAll({
    where: {
      status: 1,
    },
    include: [
      {
        model: Model,
      },
      {
        model: Color,
      },
    ],
    order: [["createdAt", "DESC"]],
  });

exports.getProductById = (id) =>
  Product.findOne({
    where: {
      id: id,
    },
    include: [
      {
        model: Model,
      },
      {
        model: Color,
      },
    ],
  });

exports.AddProduct = (product) => Product.create(product);
exports.UpdateProduct = (payload) =>
  Product.update(payload, {
    where: {
      id: payload.id,
    },
  });
exports.DeleteProduct = (id, payload) =>
  Product.update(payload, {
    where: {
      id: id,
    },
  });

exports.getDashboardGroupColor = async (startDate, endDate) => {
  const dashboardGroupColor = await sequelize.query(
    `SELECT gc.id, gc.name, gc.hexcode, SUM(oi.quantity) AS total_quantity FROM order_items oi LEFT JOIN products p ON oi.product_id = p.id LEFT JOIN colors c ON p.color_id = c.id LEFT JOIN group_colors gc ON c.group_color_id = gc.id  WHERE DATE(oi.created_at) BETWEEN '${startDate}' AND '${endDate}' group by gc.id order by total_quantity desc`,
    { type: QueryTypes.SELECT }
  );
  if (dashboardGroupColor.length > 6) {
    const mainDashboardGroupColor = dashboardGroupColor.slice(0, 5);
    const otherDashboardGroupColor = dashboardGroupColor.slice(5);
    const otherTotal = otherDashboardGroupColor.reduce(
      (acc, el) => acc + +el.total_quantity,
      0
    );
    mainDashboardGroupColor.push({
      id: 0,
      name: "Others",
      hexcode: "#eeeeee",
      total_quantity: otherTotal,
    });
    return mainDashboardGroupColor;
  }
  return dashboardGroupColor;
};

exports.getDashboardModel = async (startDate, endDate) => {
  const dashboardModel = await sequelize.query(
    `SELECT m.id, m.name, SUM(oi.quantity) AS total_quantity FROM order_items oi LEFT JOIN products p ON oi.product_id = p.id LEFT JOIN models m ON p.model_id = m.id WHERE DATE(oi.created_at) BETWEEN '${startDate}' AND '${endDate}' group by m.id order by total_quantity desc`,
    { type: QueryTypes.SELECT }
  );
  if (dashboardModel.length > 6) {
    const mainDashboardModel = dashboardModel.slice(0, 5);
    const otherDashboardModel = dashboardModel.slice(5);
    const otherTotal = otherDashboardModel.reduce(
      (acc, el) => acc + +el.total_quantity,
      0
    );
    mainDashboardModel.push({
      id: 0,
      name: "Others",
      total_quantity: otherTotal,
    });
    return mainDashboardModel;
  }
  return dashboardModel;
};

exports.getDashboardEarning = async (startDate, endDate) => {
  const Earning = await sequelize.query(
    `SELECT SUM(oi.quantity*p.price) AS total_earning FROM order_items oi LEFT JOIN products p ON oi.product_id = p.id WHERE DATE(oi.created_at) BETWEEN '${startDate}' AND '${endDate}'`,
    { type: QueryTypes.SELECT }
  );
  return Earning[0];
};

exports.getDashboardNumBag = async (startDate, endDate) => {
  const NumBag = await sequelize.query(
    `SELECT SUM(oi.quantity) AS total_bag FROM order_items oi LEFT JOIN products p ON oi.product_id = p.id WHERE DATE(oi.created_at) BETWEEN '${startDate}' AND '${endDate}'`,
    { type: QueryTypes.SELECT }
  );
  return NumBag[0];
};

exports.getDashboardCart = async (startDate, endDate) => {
  const NumCart = await sequelize.query(
    `SELECT SUM(c.quantity) AS total_cart FROM carts c WHERE DATE(c.created_at) BETWEEN '${startDate}' AND '${endDate}'`,
    { type: QueryTypes.SELECT }
  );
  return NumCart[0];
};

exports.getDashboardFav = async (startDate, endDate) => {
  const NumFav = await sequelize.query(
    `SELECT COUNT(f.id) AS total_fav FROM favorites f WHERE DATE(f.created_at) BETWEEN '${startDate}' AND '${endDate}'`,
    { type: QueryTypes.SELECT }
  );
  return NumFav[0];
};
