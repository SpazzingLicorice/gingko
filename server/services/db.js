var Sequelize = require("sequelize");
var db;

/********************************************
            DETERMINE ENVIROMENT
*********************************************/

// Host application on Heroku
if (process.env.DATABASE_URL) {
  // The application is executed on Heroku ... use postgres
  var match = process.env.DATABASE_URL.match(/postgres:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/);

  db = new Sequelize(match[5], match[1], match[2], {
    dialect: 'postgres',
    protocol: 'postgres',
    port: match[4],
    host: match[3],
    logging: false,
    dialectOptions: {
      ssl: true
    }
  });

} else {
  // Host application locally
  db = new Sequelize("tablesurfer", "admin", "admin", {
    dialect: "postgres",
    port: 5432
  });
}

/********************************************
              DEFINE SCHEMAS
*********************************************/
var Users = db.define("Users", {
  username: {
    type: Sequelize.STRING,
    allowNull: false
  },
  facebookId: {
    type: Sequelize.STRING,
    allowNull: true
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: true
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: true
  },
  email: {
    type: Sequelize.STRING,
    allowNull: true
  },
  gender: {
    type: Sequelize.STRING,
    allowNull: true
  },
  profilePicture: {
    type: Sequelize.STRING,
    allowNull: false
  },
  friends: {
    type: Sequelize.JSON,
    allowNull: false
  }
});


var Meals = db.define("Meals", {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  date: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  }
});


var Restaurants = db.define("Restaurants", {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  contact: {
    type: Sequelize.STRING,
    allowNull: false
  },
  yelpData: {
    type: Sequelize.JSON,
    allowNull: false
  }
});

/********************************************
            DEFINE RELATIONSHIPS
*********************************************/

// Create Users foreign key for meal
Users.hasOne(Meals);
Meals.belongsTo(Users);

// This creates restaurant foreign key for meal
Restaurants.hasOne(Meals);
Meals.belongsTo(Restaurants);


// var Attendees = db.define("Attendees", {
// });

// Users.belongsToMany(Meals, {through: 'Attendees'});
// Meals.belongsToMany(Users, {through: 'Attendees'});


db.sync();

exports.Meals = Meals;
exports.Users = Users;
exports.Restaurants = Restaurants;
// exports.Attendees = Attendees;
