module.exports = (sequelize, DataTypes) => {
    const BagType = sequelize.define(
        "BagType",
        {
          id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
          },
          name: {
            type: DataTypes.STRING,
            allowNull: false
          }
          
        },
        {
          underscored: true,
        }
      );

      BagType.associate = models => {
        BagType.hasMany(models.Model, {
          foreignKey: {
            name: 'bagTypeId',
            allowNull: false
          },
          onDelete: 'RESTRICT'
        });
      }
      
      return BagType
}