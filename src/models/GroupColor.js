module.exports = (sequelize, DataTypes) => {
    const GroupColor = sequelize.define(
        "GroupColor",
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

      GroupColor.associate = models => {
        GroupColor.hasMany(models.Color, {
          foreignKey: {
            name: 'groupColorId',
            allowNull: false
          },
          onDelete: 'RESTRICT'
        });
      }
      return GroupColor
}
