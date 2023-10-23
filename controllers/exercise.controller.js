const db = require("../models");
const Exercise = db.exercise;
const ExerciseType = db.exercise_type;
const Op = db.Sequelize.Op;
 

exports.createExercise = async (req, res) => {
    try {
  
      const exercise = {
        name: req.body.name,
      };
    
      const exercises = await Exercise.create(exercise);
  
        if (req.body.exercise_type_id) {
          
          /* const exercise_type_id = await ExerciseType.findAll({
            attributes: ['id'],
            where: {
              id:  req.body.exercise_type_id,
            
            },
          });

          console.log(exercise_type_id) */

    
          const result = await exercises.setType(req.body.exercise_type_id);
          if (result) res.send({ message: "Exercise registered successfully!" });
        } else {

            res.status(500).send({ message: error.message })
          
        }
  
      } catch (error) {
        res.status(500).send({ message: error.message });
      }
    
};
     
exports.findAllExercise = (req, res) => {
    const name = req.query.first_name;
    var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;
  
    Exercise.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Exercise."
        });
      });
};
  
  // Find a single Exercise with an id
exports.findOneExercise = (req, res) => {
    const id = req.params.id;
  
    Exercise.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Exercise with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Exercise with id=" + id
        });
      });
};
  
  // Update a Exercise by the id in the request
exports.updateExercise = (req, res) => {
    const id = req.params.id;
  
    Exercise.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Exercise was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Exercise with id=${id}. Maybe Exercise was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Exercise with id=" + id
        });
      });
};
  
  // Delete a Exercise with the specified id in the request
exports.deleteExercise = (req, res) => {
    const id = req.params.id;
  
    Exercise.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Exercise was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Exercise with id=${id}. Maybe Exercise was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Exercise with id=" + id
        });
      });
};
  
  // Delete all Exercise from the database.
exports.deleteAllExercise = (req, res) => {
    Exercise.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Exercise were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Exercise."
        });
      });
};
  
exports.findAllMembership = (req, res) => {
    Exercise.findAll({ where: { has_membership: true } })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Exercise."
        });
      });
};
 