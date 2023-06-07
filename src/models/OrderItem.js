module.exports = (sequelize, DataTypes) => {
    const OrderItem = sequelize.define(
        "OrderItem",
        {
          id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true, 
          },
          quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
          },
        },
        {
          underscored: true,
        }
      );

      OrderItem.associate = models => {
        OrderItem.belongsTo(models.Product, {
          foreignKey: {
            name: 'productId',
            allowNull: false
          },
          onDelete: 'RESTRICT'
        });

        OrderItem.belongsTo(models.Order, {
            foreignKey: {
              name: 'orderId',
              allowNull: false
            },
            onDelete: 'RESTRICT'
          });
      }
      return OrderItem
      
} 