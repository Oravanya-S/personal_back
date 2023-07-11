module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
      'User',
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true, 
        },
        firstName: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: true
          }
        },
        lastName: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: true
          }
        },
        email: {
          type: DataTypes.STRING,
          unique: true,
          validate: {
            isEmail: true
          }
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false
        },
        role: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 2,
        },
        addressLine: {
          type: DataTypes.STRING,
        },
        province: {
          type: DataTypes.STRING,
        },
        amphoe: {
          type: DataTypes.STRING,
        },
        tambon: {
          type: DataTypes.STRING,
        },
        zipcode: {
          type: DataTypes.STRING,
        },
      },
      {
        underscored: true
      }
    );
  
    User.associate = models => {
      User.hasMany(models.Cart, {
        foreignKey: {
          name: 'userId',
          allowNull: false
        },
        onDelete: 'RESTRICT'
      });

      User.hasMany(models.Favorite, {
        foreignKey: {
          name: 'userId',
          allowNull: false
        },
        onDelete: 'RESTRICT'
      });

      User.hasMany(models.Order, {
        foreignKey: {
          name: 'userId',
          allowNull: false
        },
        onDelete: 'RESTRICT'
      });
    };
  
    return User;
  };


 