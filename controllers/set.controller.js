const db = require("../models");
const Set = db.set;
const Op = db.Sequelize.Op;
 

exports.createSet = async (req, res) => {
    try {
  
        const set = {
            numReps: parseInt(req.body.numReps),
            weight: parseFloat(req.body.weight),
            name: req.body.name,
            series: parseInt(req.body.series),
        };
        
        const sets = await Set.create(set);
        await sets.setUser(req.body.user_id)
        await sets.setExercise(req.body.exercise_id)
        await sets.setInstructor(req.body.instructor_id)

        res.send({ message: "Set registered successfully!" });
      
  
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
    
};
     
exports.findAllSet = (req, res) => {
    const name = req.query.first_name;
    var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;
  
    Set.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Set."
        });
      });
};
  

exports.findOneSet = (req, res) => {
    const id = req.params.id;
  
    Set.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Set with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Set with id=" + id
        });
      });
};
  

exports.updateSet = (req, res) => {
    const id = req.params.id;
  
    Set.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Set was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Set with id=${id}. Maybe Set was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Set with id=" + id
        });
      });
};
  
  // Delete a Set with the specified id in the request
exports.deleteSet = (req, res) => {
    const id = req.params.id;
  
    Set.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Set was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Set with id=${id}. Maybe Set was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Set with id=" + id
        });
      });
};
  
  // Delete all Set from the database.
exports.deleteAllSet = (req, res) => {
    Set.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Set were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Set."
        });
      });
};

 