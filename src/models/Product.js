module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define(
        "Product",
        {
          id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true, 
          },
          price: {
            type: DataTypes.INTEGER,
            allowNull: false
          },
          stock: {
            type: DataTypes.INTEGER,
            allowNull: false
          },
          image: {
            type: DataTypes.STRING,
            
          },
          status: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
          },
          productDefaultPrice: {
            type: DataTypes.STRING,
          }
        },
        {
          underscored: true,
        }
      );

      Product.associate = models => {
        Product.belongsTo(models.Model, {
          foreignKey: {
            name: 'modelId',
            allowNull: false
          },
          onDelete: 'RESTRICT'
        });

        Product.belongsTo(models.Color, {
          foreignKey: {
              name: 'colorId',
              allowNull: false
            },
            onDelete: 'RESTRICT'
          });

        Product.hasMany(models.Cart, {
          foreignKey: {
            name: 'productId',
            allowNull: false
          },
          onDelete: 'RESTRICT'
        });

        Product.hasMany(models.Favorite, {
          foreignKey: {
            name: 'productId',
            allowNull: false
          },
          onDelete: 'RESTRICT'
        });

        Product.hasMany(models.OrderItem, {
            foreignKey: {
              name: 'productId',
              allowNull: false
            },
            onDelete: 'RESTRICT'
          });
      }
      return Product
      
} 