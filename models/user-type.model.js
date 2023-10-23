module.exports = (sequelize, Sequelize) => {

    const UserType = sequelize.define("user_type", {
      first_name: {
        type: Sequelize.STRING
      },
    });
    return UserType;
  };