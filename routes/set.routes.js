const set = require("../controllers/set.controller.js");
module.exports = app => {
    
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, Content-Type, Accept"
      );
      next();
    });
  
    app.post(
      "/api/set/create",
      set.createSet
    );
  
    app.get("/api/set/all", set.findAllSet);

    app.post("/api/set/", set.findOneSet);

    app.put("/api/set/update/:id", set.updateSet);

    app.delete("/api/set/delete/:id", set.deleteSet);

    

    /* app.post("/api/auth/signout", auth.signout); */
  };