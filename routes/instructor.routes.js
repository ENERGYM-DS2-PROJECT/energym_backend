const instructor = require("../controllers/instructor.controller.js");
const { verifySignUp } = require("../middleware");
module.exports = app => {
    
   /*  app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, Content-Type, Accept"
      );
      next();
    });
   */
    app.post(
      "/api/instructor/create",
/*       [
        verifySignUp.checkDuplicateUsernameOrEmail,
        verifySignUp.checkRolesExisted
      ], */
      instructor.createInstructor
    );
  
    app.get("/api/instructor/all", instructor.findAllInstructor);

    app.post("/api/instructor/", instructor.findOneInstructor);

    app.put("/api/instructor/update/:id", instructor.updateInstructor);

    app.delete("/api/instructor/delete/:id", instructor.deleteInstructor);
  
    /* app.post("/api/auth/signout", auth.signout); */
  };