//require some patient data
var Patient = require ("../models/patient")
var request = require('request');
var Fhir = require('fhir').Fhir;

exports.welcome = function (req, res) {
    //console.log("welcome");
    res.render("landing");
};

exports.register = function (req, res) {
    res.render("register",{page: 'register'});
};

exports.login = function (req, res) {
    res.render("login",{page: 'login'});
};

exports.loginPost = function (req, res) {
    console.log("login successful." +req.user);
    res.redirect("/patient/search");
};

exports.searchPatient = function (req, res) {
    res.render("patient/searchPatient");
};

exports.searchPatient_redirect = function (req, res) {
    const patientInfo = req.body ; // contains patient ID, name (optional), and server = "EHR" or "FHIR" or "LAB"
    const patientID = req.body.patientID;
    const patientName = req.body.patientName.trim();
    const server = req.body.server;

    if (server === 'EHR') {
        if (patientID && patientName) {
            res.redirect("/patient/ehr/" + patientID + "/name/" + patientName);
        } else if (patientID) {
            res.redirect("/patient/ehr/" + patientID);
        } else {
            console.log("This should not happen!");
            res.redirect("/patient/searchPatient");
        }
    } else if (server === 'FHIR') {
        if (patientID && patientName) {
            console.log("search from FHIR with id and name");
            res.redirect("/patient/fhir/" + patientID + "/name/" + patientName);
        } else if (patientID) {
            console.log("search from FHIR with id");
            res.redirect("/patient/fhir/" + patientID);
        } else {
            console.log("This should not happen!");
            res.redirect("/patient/searchPatient");
        }
    } else { // LAB, no search by name, just by patientid
        if (patientID) {
            res.redirect("/patient/lab/" + patientID);
        } else {
            console.log("This should not happen!");
            res.redirect("/patient/searchPatient");
        }
    }
};

exports.searchPatientFromEHRWithId = function (req, res) {
    var patientId = req.params.patientId;
    var JSON　= req.query.JSON
    console.log (req.query)
    let searchInfo = {
        PatientID: patientId,
    }

    Patient.find(searchInfo, function (err, patients){
      if (err) {
        if (JSON == 1) {
          res.json([]);
        }
        res.render ("patient/patientResults_ehr", {patientInfo: [], info: "No records found!", patientId: patientId})
      }
      if (JSON == 1) {
        res.json(patients);
      }
      if (patients && patients.length > 0) {
        res.render('patient/patientResults_ehr', {patientInfo: patients, info: patients.length + " records found from EHR!", patientId: patientId});
    } else {
        res.render ("patient/patientResults_ehr", {patientInfo: [], info: "No records found from EHR!", patientId: patientId})
    }
   });
}

exports.searchPatientFromEHRWithIdName = function (req, res) {
    var patientId = req.params.patientId;
    var patientName = req.params.patientName.trim();
    var JSONS　= req.query.JSON
    let searchInfo = {
        PatientID: patientId,
        FullName: patientName
    }
    Patient.find(searchInfo, function (err, patients){
        if (err) {
            if (JSONS == 1) {
                res.json([]);
            }
            res.render ("patient/patientResults_ehr", {patientInfo: [], info: "No records found!", patientId: patientId, patientName: patientName})
        }
        if (JSONS == 1) {
            res.json(patients);
        }
        if (patients && patients.length > 0) {
            res.render('patient/patientResults_ehr', {patientInfo: patients, info: patients.length + " records found from EHR!", patientId: patientId, patientName: patientName});
        } else {
            res.render ("patient/patientResults_ehr", {patientInfo: [], info: "No records found from EHR!", patientId: patientId, patientName: patientName})
        }
    });
}

exports.searchPatientFromFHIRWithId = function (req, res) {
    var patientId = req.params.patientId;
    var serverURL = "http://hapi.fhir.org/baseDstu3/Patient?_id=" + patientId + "&_format=json";
    request(serverURL, function (error, response, body){
        if (error) {
            console.log("error in request from fhir server")
            console.log (error);
            res.render('patient/searchPatient', {info: "Error in request from fhir server"});
        } else {
            var patientData = JSON.parse(body);
            if (patientData.total > 0) {
                console.log ("server connected, number of enties from fhir: " + patientData.total);
                res.render ('patient/patientResults_fhir', {patientInfo: patientData, server: "FHIR", info: patientData.total + " records found  from FHIR!"});
            } else {
                res.render ('patient/patientResults_fhir', {patientInfo: [], server: "FHIR", info: patientData.total + " records found from FHIR!"});
            }
        }
    });
}

exports.searchPatientFromFHIRWithIdName = function (req, res) {
    var patientId = req.params.patientId;
    var patientName = req.params.patientName.replace(/\s/g, "");
    var serverURL = "http://hapi.fhir.org/baseDstu3/Patient?_id=" + patientId + "&name=" + patientName + "&_format=json";

    request(serverURL, function (error, response, body){
        if (error) {
            console.log("error in request from fhir server")
            console.log (error);
            res.render('patient/searchPatient', {info: "Error in request from fhir server"});
        } else {
            var patientData = JSON.parse(body);
            if (patientData.total > 0) {
                console.log ("server connected, number of enties from fhir: " + patientData.total);
                res.render ('patient/patientResults_fhir', {patientInfo: patientData, server: "FHIR", info: patientData.total + " records found from FHIR!"});
            } else {
                res.render ('patient/patientResults_fhir', {patientInfo: [], server: "FHIR", info: patientData.total + " records found from FHIR!"});
            }
        }
    });
}

exports.searchPatientFromLabWithId = function (req, res) {
    var patientId = req.params.patientId;
    var serverURL = "https://cs6440-f18-prj5.apps.hdap.gatech.edu/lab/patient/" + patientId + "?JSON=1";

    request(serverURL, function (error, response, body){
        if (error) {
            console.log("error in request from LAB server");
            console.log (error);
            res.render('patients/searchPatient', {info: "Error in request from LAB server"});
        } else {
            console.log (body);
            var patientData = JSON.parse(body);
            if (patientData.length > 0) {
                console.log ("server connected, number of enties from LAB: " + patientData.length);
                res.render ('patient/patientResults_lab', {labs: patientData, server: "LAB", info: patientData.length + " records found from LAB!"});
            } else {
                //console.log("No patient was found from LAB server.");
                res.render ('patient/patientResults_lab', {labs: [], server: "LAB", info:  "0 records found from LAB!"});
            }
        }
    });
}


exports.savePatient_ehr = function (req, res) {
    res.render("patient/savePatient_ehr");
};

exports.savePatient_fhir = function (req, res) {
    res.render("patient/savePatient_fhir");
};

exports.savePatientToEHR = function (req, res) {

    var date = new Date();
    let patient = new Patient(
        {
            PatientID: req.body.id,
            FullName: req.body.given.trim() + " " + req.body.family.trim(),
            FamilyName: req.body.family.trim(),
            GivenName: req.body.given.trim(),
            Gender: req.body.gender,
            DateOfBirth: req.body.birthDate,
            lastUpdated: date,
            healthInfomation: req.body.healthInfo,
        }
    );

    patient.save(function (err){
      if (err) {
        console.log ("database error");
        res.send ("database error. error information: \r");
        return next(err);
      }
      res.render('patient/patientResults_ehr', {patientInfo: [patient], info: "Patient record successfully saved!"});
    });
}

exports.savePatientToFHIR = function (req, res) {

    // test fhir package with fack data
    var resource = {
        resourceType: 'Patient',
        "id": "408652",
        "meta": {
            "versionId": "1",
            "lastUpdated": "2018-11-01T11:52:45.134+00:00"
        },
        "text": {
            "status": "generated",
            "div": "<div xmlns=\"http://www.w3.org/1999/xhtml\"> </div>"
        },
        "identifier": [
            {
            "use": "usual",
            "type": {
                "text": "Computer-Stored Abulatory Records (COSTAR)"
            },
            "value": "10006579",
            "assigner": {
                "display": "AccMgr"
            }
            }
        ],
        "active": true,
        "gender": "unknown",
        "birthDate": "1924-10-10",
        "deceasedBoolean": false
    };

    var fhir = new Fhir();
    var xml = fhir.objToXml(resource);
    var json = fhir.xmlToJson(xml);
    var obj = fhir.xmlToObj(xml);
    var results = fhir.validate(xml, { errorOnUnexpected: true });
    results = fhir.validate(obj, {});
    console.log("sample data in xml: " + xml)
    console.log("sample data in Json: " +json)

    // This function needs refactoring
    lab.save(function (err){
      if (err) {
        console.log ("database error");
        res.send ("database error. error information: \r");
        return next(err);
      }
      res.render('patient/patientResults_fhir', {labs:[lab2], info: "Lab results successfully saved!"});
    });
}
