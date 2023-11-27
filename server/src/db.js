const { Sequelize } = require('sequelize');

const db = new Sequelize('postgres://postgres:2002@localhost:5432/project', {
  define: { freezeTableName: true },
});

try {
  db.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

module.exports = db;
