const Sequelize = require('sequelize');
const sequelize = require('../db.js');

const AIS = sequelize.define('ais', {
    id: { type: Sequelize.BIGINT, field: 'id', primaryKey: true},
    mmsi: { type: Sequelize.INTEGER, field: 'mmsi' },
    imo: { type: Sequelize.INTEGER, field: 'imo' },
    vessel_name: { type: Sequelize.TEXT, field: 'vessel_name' },
    callsign: { type: Sequelize.TEXT, field: 'callsign' },
    vessel_type: { type: Sequelize.TEXT, field: 'vessel_type' },
    vessel_type_code: { type: Sequelize.INTEGER, field: 'vessel_type_code' },
    vessel_type_cargo: { type: Sequelize.TEXT, field: 'vessel_type_cargo' },
    vessel_class: { type: Sequelize.TEXT, field: 'vessel_class' },
    length: { type: Sequelize.INTEGER, field: 'length' },
    width: { type: Sequelize.INTEGER, field: 'width' },
    flag_country: { type: Sequelize.TEXT, field: 'flag_country' },
    flag_code: { type: Sequelize.INTEGER, field: 'flag_code' },
    destination: { type: Sequelize.TEXT, field: 'destination' },
    eta: { type: Sequelize.TEXT, field: 'eta' },
    draught: { type: Sequelize.REAL, field: 'draught' },
    longitude: { type: Sequelize.DOUBLE, field: 'longitude' },
    latitude: { type: Sequelize.DOUBLE, field: 'latitude' },
    sog: { type: Sequelize.REAL, field: 'sog' },
    cog: { type: Sequelize.REAL, field: 'cog' },
    rot: { type: Sequelize.REAL, field: 'rot' },
    heading: { type: Sequelize.INTEGER, field: 'heading' },
    nav_status: { type: Sequelize.TEXT, field: 'nav_status' },
    nav_status_code: { type: Sequelize.INTEGER, field: 'nav_status_code' },
    source: { type: Sequelize.TEXT, field: 'source' },
    ts_pos_utc: { type: Sequelize.DATE, field: 'ts_pos_utc' },
    ts_static_utc: { type: Sequelize.DATE, field: 'ts_static_utc' },
    ts_eta: { type: Sequelize.DATE, field: 'ts_eta' },
    ts_insert_utc: { type: Sequelize.DATE, field: 'ts_insert_utc' },
    registry_name: { type: Sequelize.TEXT, field: 'registry_name' },
    registry_name_en: { type: Sequelize.TEXT, field: 'registry_name_en' },
    vessel_type_main: { type: Sequelize.TEXT, field: 'vessel_type_main' },
    vessel_type_sub: { type: Sequelize.TEXT, field: 'vessel_type_sub' },
    message_type: { type: Sequelize.INTEGER, field: 'message_type' },
    wkb_geometry: { type: Sequelize.TEXT, field: 'wkb_geometry' }
},{
    schema: 'ais',
    createdAt: false,
    updatedAt: false,
    tableName: 'iiai_ais_data'
});

module.exports = AIS;