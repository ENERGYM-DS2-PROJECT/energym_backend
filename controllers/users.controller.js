const db = require("../models");
const User = db.users;
const Role = db.role;
const bcrypt = require("bcrypt");
const Op = db.Sequelize.Op;

exports.createUser = async (req, res) => {
  try {

    const salt = await bcrypt.genSalt(10);

    const users = {
        role_id: req.body.role_id,
        first_name: req.body.first_name,
        middle_name: req.body.middle_name,
        last_name: req.body.last_name,
        second_last_name: req.body.second_last_name,
        document_type: req.body.document_type,
        document_number: req.body.document_number,
        birth_date: req.body.birth_date,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, salt),
        has_membership: req.body.has_membership ? req.body.has_membership : false,
        salary: req.body.salary,
        contract_type: req.body.contract_type,
    };
  
    await User.create(users);
    res.send({ message: "User registered successfully!" });
    

    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  
};
exports.findAllUsers = (req, res) => {
  const role_id = req.query.first_role_id;
  var condition = role_id ? { role_id: { [Op.iLike]: `%${role_id}%` } } : null;

  User.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Users."
      });
    });
};
  
// Find a single User with an id
exports.findOneUser = (req, res) => {
  const id = req.params.id;

  User.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find User with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving User with id=" + id
      });
    });
};
  
// Update a User by the id in the request
exports.updateUser = (req, res) => {
  const id = req.params.id;

  User.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating User with id=" + id
      });
    });
};
  
// Delete a User with the specified id in the request
exports.deleteUser = (req, res) => {
  const id = req.params.id;

  User.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete User with id=" + id
      });
    });
};
  
// Delete all Users from the database.
exports.deleteAllUsers = (req, res) => {
  User.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Users were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Users."
      });
    });
};

exports.findAllClient = (req, res) => {
  
  User.findAll({
      include: [
        {
          model: Role,
          where: {
            name: 'user'
          }
        }
      ]
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Users."
      });
    });
};
exports.findAllInstructor = (req, res) => {
  User.findAll({
    where: { 
     include: {
      model: Role,
      where: {
        name: 'instructor'
      }
    }
   }
   })
   .then(data => {
     res.send(data);
   })
   .catch(err => {
     res.status(500).send({
       message:
         err.message || "Some error occurred while retrieving Users."
     });
   });
};
  
/*   
exports.findAllMembership = (req, res) => {
  User.findAll({ where: { has_membership: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Users."
      });
    });
};
 
 */