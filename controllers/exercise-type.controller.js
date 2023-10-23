const db = require("../models");
const ExerciseType = db.exercise_type;
const Op = db.Sequelize.Op;
 

exports.createExerciseType = async (req, res) => {
    try {
  
        const exercise_type = {
        name: req.body.name,
        description: req.body.description,
        };

        await ExerciseType.create(exercise_type);

        res.send({ message: "ExerciseType registered successfully!" });
      
  
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
    
};
     
exports.findAllExerciseType = (req, res) => {
    const name = req.query.first_name;
    var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;
  
    ExerciseType.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving ExerciseType."
        });
      });
};
  

exports.findOneExerciseType = (req, res) => {
    const id = req.params.id;
  
    ExerciseType.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find ExerciseType with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving ExerciseType with id=" + id
        });
      });
};
  

exports.updateExerciseType = (req, res) => {
    const id = req.params.id;
  
    ExerciseType.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "ExerciseType was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update ExerciseType with id=${id}. Maybe ExerciseType was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating ExerciseType with id=" + id
        });
      });
};
  
  // Delete a ExerciseType with the specified id in the request
exports.deleteExerciseType = (req, res) => {
    const id = req.params.id;
  
    ExerciseType.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "ExerciseType was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete ExerciseType with id=${id}. Maybe ExerciseType was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete ExerciseType with id=" + id
        });
      });
};
  
  // Delete all ExerciseType from the database.
exports.deleteAllExerciseType = (req, res) => {
    ExerciseType.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} ExerciseType were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all ExerciseType."
        });
      });
};

 