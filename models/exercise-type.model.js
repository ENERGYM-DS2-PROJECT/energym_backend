module.exports = (sequelize, DataTypes) => {
    const ExerciseType = sequelize.define('exercise_type', {
      name: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.STRING,
      },
    });
  
    return ExerciseType;
  };