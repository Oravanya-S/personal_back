module.exports = (sequelize, DataTypes) => {
    const Model = sequelize.define(
        "Model",
        {
          id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true, 
          },
          name: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          brand: {
            type: DataTypes.STRING,
            allowNull: false
          },
          meterial: {
            type: DataTypes.STRING,
            allowNull: false
          },
          description: {
            type: DataTypes.STRING,
            allowNull: false
          },
          status: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
          }
        },
        {
          underscored: true,
        }
      );

      Model.associate = models => {
        Model.belongsTo(models.BagType, {
          foreignKey: {
            name: 'bagTypeId',
            allowNull: false
          },
          onDelete: 'RESTRICT'
        });

        Model.hasMany(models.Product, {
            foreignKey: {
              name: 'modelId',
              allowNull: false
            },
            onDelete: 'RESTRICT'
          });
      }
      return Model
      
} 