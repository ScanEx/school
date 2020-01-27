export default {
    id: {
        type: 'integer',
        title: 'id'
    },
    mmsi: {
        type: 'integer',
        title: 'mmsi'
    },
    imo: {
        type: 'integer',
        title: 'imo'
    },
    vessel_name: {
        type: 'string', 
        title: 'vessel_name'
    },
    callsign: {
        type: 'string',
        title: 'callsign'
    },
    vessel_type: {
        type: 'string',
        title: 'vessel_type'
    },
    vessel_type_code: {
        type: 'integer',
        title: 'vessel_type_code'
    },
    vessel_type_cargo: {
        type: 'string',
        title: 'vessel_type_cargo'
    },
    vessel_class: {
        type: 'string',
        title: 'vessel_class'
    },
    length: {
        type: 'integer',
        title: 'length'
    },
    width: {
        type: 'integer',
        title: 'width'
    },
    flag_country: {
        type: 'string',     
        title: 'flag_country'
    },
    flag_code: {
        type: 'integer',
        title: 'flag_code'
    },
    destination: {
        type: 'string',
        title: 'destination'
    },
    eta: {
        type: 'string',
        title: 'eta'
    },
    draught: {
        type: 'float',
        title: 'draught'
    },
    longitude: {
        type: 'float',
        title: 'longitude'
    },
    latitude: {
        type: 'float',
        title: 'latitude'
    },
    sog: {
        type: 'float',
        title: 'sog'
    },
    cog: {
        type: 'float',
        title: 'cog'
    },
    rot: {
        type: 'float',
        title: 'rot'
    },
    heading: {
        type: 'integer',
        title: 'heading'
    },
    nav_status: {
        type: 'string',     
        title: 'nav_status'
    },
    nav_status_code: {
        type: 'integer',  
        title: 'nav_status_code'
    },
    source: {
        type: 'string',
        title: 'source'
    },
    ts_pos_utc: {
        type: 'date',
        title: 'ts_pos_utc'
    },
    ts_static_utc: {
        type: 'date',
        title: 'ts_static_utc'        
    },
    ts_eta: {
        type: 'date',
        title: 'ts_eta'
    },
    ts_insert_utc: {
        type: 'date', 
        title: 'ts_insert_utc'
    },
    registry_name: {
        type: 'string',
        title: 'registry_name'
    },
    registry_name_en: {
        type: 'string',         
        title: 'registry_name_en'
    },
    vessel_type_main: {
        type: 'string',
        title: 'vessel_type_main'        
    },
    vessel_type_sub: {
        type: 'string',
        title: 'vessel_type_sub'
    },
    message_type: {
        type: 'integer',
        title: 'message_type'
    },      
};