module.exports = (sequelize, DataTypes) => {
    const Note = sequelize.define("notes", {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      note: { type: DataTypes.STRING, allowNull: false },
      category: {
        type: DataTypes.STRING,
      },
      date: {
        type: DataTypes.STRING,
      },
      deleted: {
        type: DataTypes.BOOLEAN,

      },
      userEmail:{
        type: DataTypes.STRING,
        validate: {
          isEmail: true,
        },

      }
    });
  
    return Note;
  };
  