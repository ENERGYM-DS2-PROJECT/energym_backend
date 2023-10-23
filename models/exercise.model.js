module.exports = (sequelize, DataTypes) => {
    const Exercise = sequelize.define('exercise', {
      name: DataTypes.STRING,
    });
  
    return Exercise;
  };