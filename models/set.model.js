module.exports = (sequelize, DataTypes) => {
    const Set = sequelize.define('set', {
      numReps: DataTypes.INTEGER,
      weight: DataTypes.DOUBLE,
      name: DataTypes.STRING,
      series: DataTypes.INTEGER
    });
  
    return Set;
  };