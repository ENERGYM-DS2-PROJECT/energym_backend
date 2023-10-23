module.exports = (sequelize, Sequelize) => {

    const Instructor = sequelize.define("instructor", {
      first_name: {
        type: Sequelize.STRING
      },
      middle_name: {
        type: Sequelize.STRING
      },
      last_name: {
        type: Sequelize.STRING
      },
      second_last_name: {
        type: Sequelize.STRING
      },
      document_type: {
        type: Sequelize.STRING
      },
      document_number: {
        type: Sequelize.INTEGER
      },
      birth_date: {
        type: Sequelize.DATEONLY
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      salary: {
        type: Sequelize.STRING,
        
      },
      contract_type: {
        type: Sequelize.STRING,
      }
    });
    return Instructor;
  };