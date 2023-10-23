const user = require("../controllers/users.controller.js");
const { authJwt } = require("../middleware");

module.exports = app => {
    
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });


  app.post("/api/user/create", user.createUser);

  app.get("/api/user/all", user.findAllUsers);

  app.get("/api/user/allClient", user.findAllClient);

  app.get("/api/user/allInstructor", user.findAllInstructor);

  app.post("/api/user/:id", user.findOneUser);

  app.put("/api/user/update/:id", user.updateUser);

  app.delete("/api/user/delete/:id", user.deleteUser);
  
  app.delete("/api/user/delete/", user.deleteAllUsers);

};