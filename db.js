const Sequelize = require('sequelize');
const fs = require('fs');
const YAML = require ('yaml');
const file = fs.readFileSync('./config.yml', 'utf8');
const cfg = YAML.parse(file);
const sequelize = new Sequelize(cfg.connectionString);
module.exports = sequelize;