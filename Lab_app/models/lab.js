var mongoose=require("mongoose");

var labSchema = new mongoose.Schema({

  identifier: String,
  id:String,
  status: String,
  code: String,
  patientID: String,
  patient_name:  String,
  server: String,
  effective_date: String,
  issued_date: String,
  performer: {
    identifier: String,
    performer: String,
    role: String,
    actor: String
  } ,
  value : String,
  interpretation: String,
  result: String,
  codeDiagnosis: String,
  context: String,
  category: String,
  basedOn: String,
  specimen: String,
  imagingStudy: String,
  conclusion: String,
  presentedForm: String


})
module.exports = mongoose.model("Lab", labSchema);
