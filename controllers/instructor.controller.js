const db = require("../models");
const bcrypt = require("bcrypt");
const Instructor = db.instructor;
const Role = db.role;
const Op = db.Sequelize.Op;

exports.createInstructor = async (req, res) => {
  try {

    const salt = await bcrypt.genSalt(10);

    const instructor = {
        first_name: req.body.first_name,
        middle_name: req.body.middle_name,
        last_name: req.body.last_name,
        second_last_name: req.body.second_last_name,
        document_type: req.body.document_type,
        document_number: req.body.document_number,
        birth_date: req.body.birth_date,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, salt),
        salary: req.body.salary,
        contract_type: req.body.contract_type,
        
    };
  
    const instructors = await Instructor.create(instructor)
    
      if (req.body.role_id) {
        
        const roles = await Role.findAll({
          where: {
            id: {
              [Op.eq]: req.body.role_id,
            },
          },
        });
      
  
        const result = instructors.setRole(req.body.role_id);
        if (result) res.send({ message: "Instructor registered successfully!" });
      } /* else {
        // user has role = 1
        const result = user.setRole([1]);
        if (result) res.send({ message: "User registered successfully!" });
      } */

    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  
  };
    
  exports.findAllInstructor = (req, res) => {
    const name = req.query.first_name;
    var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;
  
    Instructor.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Instructor."
        });
      });
};
  

exports.findOneInstructor = (req, res) => {
    const id = req.params.id;
  
    Instructor.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Instructor with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Instructor with id=" + id
        });
      });
};
  

exports.updateInstructor = (req, res) => {
    const id = req.params.id;
  
    Instructor.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Instructor was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Instructor with id=${id}. Maybe Instructor was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Instructor with id=" + id
        });
      });
};
  
  // Delete a Instructor with the specified id in the request
exports.deleteInstructor = (req, res) => {
    const id = req.params.id;
  
    Instructor.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Instructor was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Instructor with id=${id}. Maybe Instructor was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Instructor with id=" + id
        });
      });
};
  
  // Delete all Instructor from the database.
exports.deleteAllInstructor = (req, res) => {
    Instructor.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Instructor were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Instructor."
        });
      });
};

 