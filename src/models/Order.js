module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define(
        "Order",
        {
          id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true, 
          },
          address: {
            type: DataTypes.STRING,
            allowNull: false
          },
          payment: {
            type: DataTypes.ENUM('POMPTPAY', 'CASH'),
            allowNull: false
          },
          status: {
            type: DataTypes.ENUM('PAID', 'UNPAID'),
            allowNull: false
          },
        },
        {
          underscored: true,
        }
      );

      Order.associate = models => {
        Order.belongsTo(models.User, {
          foreignKey: {
            name: 'userId',
            allowNull: false
          },
          onDelete: 'RESTRICT'
        });

        Order.hasMany(models.OrderItem, {
            foreignKey: {
              name: 'orderId',
              allowNull: false
            },
            onDelete: 'RESTRICT'
          });
      }
      return Order
      
} 