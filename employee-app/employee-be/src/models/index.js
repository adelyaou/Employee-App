const sequelize = require('../config/database');
const User = require('./user.model');
const Employee = require('./employee.model');

const db = { sequelize, User, Employee };

// associations if needed
// e.g., User.hasMany(Employee);

module.exports = db;
