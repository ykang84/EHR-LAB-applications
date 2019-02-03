//require some patient data
var request = require('request');
var patientData = require ("../models/test_patient_data")
var labData = require ("../models/test_lab_data")
const Lab = require('../models/lab');


exports.welcome = function (req, res) {
    res.render("landing");
};

exports.search = function (req, res) {
    console.log("from search. check req.user: " +req.user)
    res.render("labs/searchLab");
};

exports.search_redirect = function (req, res) {
    let patientID = req.body.patientID.toUpperCase();
    let labID = req.body.labID.toUpperCase();
    if (patientID != "" && labID !="") {
      res.redirect("/lab/"+labID+"/patient/"+patientID);
    } else {
      if (patientID != "") {
        res.redirect("/lab/patient/"+patientID);
      } else {
        if (labID !="") {
          res.redirect("/lab/"+labID);
        } else {
          res.redirect("/lab/search");
        }
      }
    }

};

exports.register = function (req, res) {
    res.render("register",{page: 'register'});
};

exports.login = function (req, res) {
    res.render("login",{page: 'login'});
};

exports.patent_labs= function (req, res) {
  var labId = req.params.labId
  var patientId = req.params.patientId;
  var JSON= req.query.JSON
  console.log (req.query)
  let searchInfo = {
    identifier: labId,
    patientID:patientId
    //"paitent.Identifier": "396527"
    }
  Lab.find(searchInfo, function (err, labs){
    if (err) {
      if (JSON == 1) {
        res.json([]);
      }
      res.render ("labs/labSaved", {labs:[], info:"0 match of was found", patientId:patientId, labId:labId})
    }
    if (JSON == 1) {
      res.json(labs);
    }
      //console.log (labs);
      res.render('labs/labSaved', {labs:labs, info: "Search results: ", patientId:patientId, labId:labId});
  });
}

exports.search_lab= function (req, res) {
  var labId = req.params.labId
  var patientId = req.params.patientId;
  var JSON= req.query.JSON
  console.log (req.query)
  let searchInfo = {
    identifier: labId,
    }
  Lab.find(searchInfo, function (err, labs){
    if (err) {
      if (JSON == 1) {
        res.json([]);
      }
      res.render ("labs/labSaved", {labs:[], info:"0 match of was found", patientId:patientId, labId:labId})
    }
    if (JSON == 1) {
      res.json(labs);
    }
      //console.log (labs);
      res.render('labs/labSaved', {labs:labs, info: "Search results: ", patientId:patientId, labId:labId});
  });
}

exports.search_patent= function (req, res) {
  var labId = req.params.labId
  var patientId = req.params.patientId;
  var JSON= req.query.JSON
  console.log (req.query)
  let searchInfo = {
    patientID:patientId
    //"paitent.Identifier": "396527"
    }
  Lab.find(searchInfo, function (err, labs){
    if (err) {
      if (JSON == 1) {
        res.json([]);
      }
      res.render ("labs/labSaved", {labs:[], info:"0 match of was found", patientId:patientId, labId:labId})
    }
    if (JSON == 1) {
      res.json(labs);
    }
      //console.log (labs);
      res.render('labs/labSaved', {labs:labs, info: "Search results: ", patientId:patientId, labId:labId});
  });
}


exports.loginPost = function (req, res) {

    console.log ("login successful." +req.user);
    res.redirect("/Lab/search");
};

exports.patientInfo = function (req, res) {
  console.log ("you hit labInputGet route");
  res.render ("labs/getPatientInfo", {info: ""});
}

exports.inputLabInfo = function (req,  res) {
  //res.send (req.query.patientID);
  const patientInfo = req.query ; // contains patient ID, name (optional), and server = "EHR" or "fhir"
  const patientID = req.query.patientID;
  const patientName = req.query.name.replace(/\s/g, "");
  const server = req.query.server;
  var serverURL = "";
  var serverURL2 = "";
  //get patent information from either fhir or EHR through ajax call
  if (server === "fhir") {
    serverURL = "http://hapi.fhir.org/baseDstu3/Patient?_id="+patientID
  } else {
    //serverURL = "https://cs6440-f18-prj5.apps.hdap.gatech.edu/patient/ehr/"+patientID // this line will be change to our server
  }
  if (patientName.length != 0){
    serverURL = serverURL + "&name="+patientName
  }

  serverURL = serverURL+ "&_format=json"
  request(serverURL, function (error, response, body){
      if (error) {
          console.log("error in request from fhir server")
          console.log (error);
          res.render('labs/getPatientInfo', {info:"Error in request from fhir server"});
      } else {
          var patientData = JSON.parse(body);
          console.log(body);
          if (server === "fhir") {
            if (patientData.total > 0) {
              console.log ("server connected,number of enties from fhir: "+patientData.total);
              res.render ('labs/inutLabResult', {patientInfo: patientData, server:server, info: "successfully get patient information from the server"});
            } else {
              res.render('labs/getPatientInfo', {info:"Error: No patient was found from fhir server. Please input correct patient information."});
            }

          }  else {
            res.render('labs/getPatientInfo', {info:"Date not from Fhir"});
          }

      }
  });
}

exports.inputLabInfo_EHR = function (req,  res) {
  //res.send (req.query.patientID);
  const patientInfo = req.query ; // contains patient ID, name (optional), and server = "EHR" or "fhir"
  const patientID = req.query.patientID;
  const server = req.query.server;
  var serverURL = "https://cs6440-f18-prj5.apps.hdap.gatech.edu/patient/ehr/"+patientID;
  //get patent information from either fhir or EHR through ajax call



  serverURL = serverURL+ "?JSON=1"
  request(serverURL, function (error, response, body){
      if (error) {
          console.log("error in request from fhir server")
          console.log (error);
          res.render('labs/getPatientInfo', {info:"Error in request from fhir server"});
      } else {
          var patientData = JSON.parse(body);
          console.log(body);
          if (server === "EHR") {
            if (patientData.length > 0) {
              console.log ("server connected,number of enties from fhir: "+patientData.length);
              res.render ('labs/inutLabResult_EHR', {patientInfo: patientData[0], server:server, info: "successfully get patient information from the server"});
            } else {
              res.render('labs/getPatientInfo', {info:"Error: No patient was found from EHR server. Please input correct patient information."});
            }

          }  else {
            res.render('labs/getPatientInfo', {info:"Date not from EHR"});
          }

      }
  });
}

exports.inputLabInfoPost=function (req, res) {
  let lab = new Lab(
      {
        identifier: req.body.identifier,
        id:req.body.id,
        status: req.body.status,
        code: req.body.code,
        patientID: req.body.patient_identifier,
        patient_name:  req.body.patient_name,
        server: req.body.patient_server,
        effective_date: req.body.effective_date,
        issued_date: req.body.issued_date,
        performer: {
          identifier: req.body.performer_ID,
          performer: req.body.performer_name,
          role: req.body.performer_role,
          actor: req.body.insurance
        } ,
        value : req.body.value,
        interpretation: req.body.interpretation,
        result: req.body.result,
        codeDiagnosis: req.body.codeDiagnosis,
        context: req.body.context,
        category: req.body.category,
        basedOn: req.body.basedOn,
        specimen: req.body.specimen,
        imagingStudy: req.body.imagingStudy,
        conclusion: req.body.conclusion,
        presentedForm: req.body.presentedForm
      }
  );

  lab2 = {
    identifier: req.body.identifier,
    id:req.body.id,
    status: req.body.status,
    code: req.body.code,
    patient: {
      identifier: req.body.patient_identifier,
      name:  req.body.patient_name,
      server: req.body.patient_server
    },
    effective_date: req.body.effective_date,
    issued_date: req.body.issued_date,
    performer: {
      identifier: req.body.performer_ID,
      performer: req.body.performer_name,
      role: req.body.performer_role,
      actor: req.body.insurance
    } ,
    value : req.body.value,
    interpretation: req.body.interpretation,
    result: req.body.result,
    codeDiagnosis: req.body.codeDiagnosis,
    context: req.body.context,
    category: req.body.category,
    basedOn: req.body.basedOn,
    specimen: req.body.specimen,
    imagingStudy: req.body.imagingStudy,
    conclusion: req.body.conclusion,
    presentedForm: req.body.presentedForm
  }
  lab.save(function (err){
    if (err) {
      console.log ("database error");
      res.send ("database error. error information: \r");
      return next(err);
    }
    res.render('labs/labSaved', {labs:[lab2], info: "Lab results successfully saved!"});

  });

}
