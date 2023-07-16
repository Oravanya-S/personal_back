module.exports = (sequelize, DataTypes) => {
    const Payment = sequelize.define("Payment", {
        paymentId: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
    },
    {
        underscored: true
    }
    )

 Payment.associate = models => {

    Payment.belongsTo(models.Order, {
      foreignKey: {
        name: 'orderId',
        allowNull: false
      },
      onDelete: "RESTRICT"
    });
    
    Payment.belongsTo(models.User, {
      foreignKey: {
        name: 'userId',
        allowNull: false
      },
      onDelete: "RESTRICT"
    });

  };
    return Payment;
  };