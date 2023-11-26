const { Sequelize } = require('sequelize');

const db = new Sequelize('mysql://u828725825_root:Beytulayse372@srv507.hstgr.io:3306/u828725825_bil372', {
  define: { freezeTableName: true },
});

try {
  db.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

module.exports = db;
