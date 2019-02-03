const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let patientSchema = new Schema({
    PatientID: {type: String, required: true, max: 100},
    FullName: {type: String, required: true, max: 100},
    FamilyName: {type: String, required: true, max: 100},
    GivenName: {type: String, required: true, max: 100},
    Gender: {type: String, required: true, max: 100},
    DateOfBirth: {type: String, required: true, max: 100},
    lastUpdated: {type: String, required: true, max: 100},
    healthInfomation: {type: String, required: true, max: 1000},
});


// Export the model
module.exports = mongoose.model('Patient', patientSchema);