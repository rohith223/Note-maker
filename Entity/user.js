module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("users", {
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: { type: DataTypes.STRING, allowNull: false },
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: true,
        },
        allowNull: false,
        unique: true,
      },
    });
  
    return User;
  };
  