const auth = require("../controllers/auth.controller.js");
const { verifySignUp } = require("../middleware");
module.exports = app => {
    
    /* app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, Content-Type, Accept"
      );
      next();
    }); */
  
    app.post(
      "/api/auth/signup",
      [
        verifySignUp.checkDuplicateUsernameOrEmail,
        verifySignUp.checkRolesExisted
      ],
      auth.signUp
    );
  
    app.post("/api/auth/signin", auth.login);
  
    /* app.post("/api/auth/signout", auth.signout); */
  };