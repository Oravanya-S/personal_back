module.exports = (sequelize, DataTypes) => {
    const Favorite = sequelize.define(
        "Favorite",
        {
          id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true, 
          },
        },
        {
          underscored: true,
        }
      );

      Favorite.associate = models => {
        Favorite.belongsTo(models.User, {
          foreignKey: {
            name: 'userId',
            allowNull: false
          },
          onDelete: 'RESTRICT'
        });

        Favorite.belongsTo(models.Product, {
            foreignKey: {
              name: 'productId',
              allowNull: false
            },
            onDelete: 'RESTRICT'
          });
      }
      return Favorite
      
} 