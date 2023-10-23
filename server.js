const express = require("express");
const path = require("path");
const cors = require("cors");
const cookieSession = require("cookie-session");
const PORT = process.env.PORT || 5000;
const { Sequelize } = require('sequelize');
const app = express();

var corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));
app.use(express.json());


if(process.env.NODE_ENV === 'production') {

  app.use(express.static(path.join(__dirname, '../client/build')));
  app.get("/api", (req, res) => {
    res.json({ message: "ghgjgggggggggggggggghghjgjhg." });
  });
  
  require("./routes/user.routes")(app);
  require("./routes/auth.routes")(app);
  require("./routes/exercise-type.routes")(app);
  require("./routes/exercise.routes")(app);
  require("./routes/set.routes")(app);
  require("./routes/instructor.routes")(app);
  require("./routes/home.routes")(app);
  
  app.use(express.urlencoded({ extended: true }));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client', 'build', 'index.html'));
  })
}else {

}
app.use(express.urlencoded({ extended: true }));

require("./routes/user.routes")(app);
require("./routes/auth.routes")(app);
require("./routes/exercise-type.routes")(app);
require("./routes/exercise.routes")(app);
require("./routes/set.routes")(app);
require("./routes/instructor.routes")(app);
require("./routes/home.routes")(app);

app.use(
  cookieSession({
    name: "henlo-session",
    secret: "COOKIE_SECRET",
    httpOnly: true,
    sameSite: 'strict'
  })
);

//Base de datos

const db = require("./models");

/* db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync Db');
  
}); */


db.sequelize.sync();

app.get("/api", (req, res) => {
  res.json({ message: "ghgjgggggggggggggggghghjgjhg." });
});

require("./routes/user.routes")(app);
require("./routes/auth.routes")(app);
require("./routes/exercise-type.routes")(app);
require("./routes/exercise.routes")(app);
require("./routes/set.routes")(app);
require("./routes/instructor.routes")(app);
require("./routes/home.routes")(app);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
  