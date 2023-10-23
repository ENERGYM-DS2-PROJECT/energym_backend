const exercise = require("../controllers/exercise.controller.js");
module.exports = app => {
    
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, Content-Type, Accept"
      );
      next();
    });
  
    app.post(
      "/api/exercise/create",
      exercise.createExercise
    );
  
    app.get("/api/exercise/all", exercise.findAllExercise);

    app.post("/api/exercise/", exercise.findOneExercise);

    app.put("/api/exercise/update/:id", exercise.updateExercise);

    app.delete("/api/exercise/delete/:id", exercise.deleteExercise);

    app.delete("/api/exercise/delete/", exercise.deleteAllExercise);

    

    /* app.post("/api/auth/signout", auth.signout); */
  };