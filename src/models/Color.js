module.exports = (sequelize, DataTypes) => {
    const Color = sequelize.define(
        "Color",
        {
          id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true, 
          },
          name: {
            type: DataTypes.STRING,
            allowNull: false
          },
          hexcode: {
            type: DataTypes.STRING,
            allowNull: false
          }
        },
        {
          underscored: true,
        }
      );

      Color.associate = models => {
        Color.belongsTo(models.GroupColor, {
          foreignKey: {
            name: 'groupColorId',
            allowNull: false
          },
          onDelete: 'RESTRICT'
        });

        Color.hasMany(models.Product, {
          foreignKey: {
            name: 'colorId',
            allowNull: false
          },
          onDelete: 'RESTRICT'
        });
      }
      return Color
      
} 