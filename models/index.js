const {DB_CONFIG} = require("../config/db.config.js");
const Sequelize = require("sequelize");
const { PG_HOST, DB_NAME, PG_USERNAME, PG_PASSWORD } = process.env
/* 
const sequelize = new Sequelize( DB_NAME, PG_USERNAME, PG_PASSWORD, {
  host: PG_HOST,
  dialect: "postgres",
  logging: false,
  ...(process.env.NODE_ENV === 'production' && {
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  }),
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});
 */

const sequelize = new Sequelize(DB_CONFIG.database, DB_CONFIG.user, DB_CONFIG.password, {
  host: DB_CONFIG.host,
  dialect: "postgres",
  operatorsAliases: false,
  dialectOptions: {
    ssl: {
      require: true, // This will help you. But you will see nwe error
      rejectUnauthorized: false // This line will fix new error
    }
  },
  /* pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  } */
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.users = require("../models/user.model.js")(sequelize, Sequelize);
db.instructor = require("../models/instructor.model.js")(sequelize, Sequelize);
db.user_type = require("../models/user-type.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.set = require("../models/set.model.js")(sequelize, Sequelize);
db.exercise = require("../models/exercise.model.js")(sequelize, Sequelize);
db.exercise_type = require("../models/exercise-type.model.js")(sequelize, Sequelize);


// db.role.belongsToMany(db.users, {
//   through: "id",
//   foreignKey: "user_id",
//   otherKey: "user_id"
// }); 

// db.role.hasOne(db.users);

db.users.belongsTo(db.role, {
  through: "id",
  foreignKey: "role_id",
});

/* db.instructor.belongsTo(db.role, {
  as: 'Role',
  through: "id",
  foreignKey: "role_id",
}); */

/* 
User.sync() - This creates the table if it doesn't exist (and does nothing if it already exists)
User.sync({ force: true }) - This creates the table, dropping it first if it already existed
User.sync({ alter: true }) - This checks what is the current state of the table in the database (which columns it has, what are their data types, etc), and then performs the necessary changes in the table to make it match the model.
*/

db.exercise.belongsTo(db.exercise_type, {
  as: 'Type',
  through: "exercise_type",
  foreignKey: "exercise_type_id",
});

  
/* db.user_type.hasOne(db.users, {
  through: "id",
  foreignKey: "user_type_id",
});
 */

db.set.belongsTo(db.users, {
  as: 'User',
  through: "id",
  foreignKey: "user_id",
});

db.set.belongsTo(db.users, {
  as: 'Instructor',
  through: "id",
  foreignKey: "instructor_id",
});
  
db.set.belongsTo(db.exercise, {
  as: 'Exercise',
  through: "id",
  foreignKey: "exercise_id",
});

/* db.users.sync({ force: true }) */

module.exports = db;