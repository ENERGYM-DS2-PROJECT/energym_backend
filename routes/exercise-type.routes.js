const type = require("../controllers/exercise-type.controller.js");
module.exports = app => {
    
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, Content-Type, Accept"
      );
      next();
    });
  
    app.post(
      "/api/exercise_type/create",
      type.createExerciseType
    );
  
    app.get("/api/exercise_type/all", type.findAllExerciseType);

    app.post("/api/exercise_type/", type.findOneExerciseType);

    app.put("/api/exercise_type/update/:id", type.updateExerciseType);

    app.delete("/api/exercise_type/delete/:id", type.deleteExerciseType);

    

    /* app.post("/api/auth/signout", auth.signout); */
  };