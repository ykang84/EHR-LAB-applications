exports.diagnosticReport = [{
              identifier: 62413,
              id:'f005',
              status: 'final',
              code: 'Glucose [Moles/volume] in Blood',
              patient: {
                identifier: 4152,
                name:  'P. van de Heuvel'
              },
              effective_date: '2007-05-01',
              issued_date: '03/04/2013',
              performer: {
                identifier: 825,
                performer: 'L. Beiman',
                role: 'Doctor',
                actor: 'blue cross & blue shield'
              } ,
              value : '6.3 mmol/l',
              interpretation: 'High',
              result: '',
              codeDiagnosis: '',
              context: '',
              category: '',
              basedOn: '',
              specimen: '',
              imagingStudy: '',
              conclusion: '',
              presentedForm: ''
      },
      {
              identifier: 8761,
              id:'f001',
              status: 'completed',
              code: 'Heart valve replacement',
              patient:  {
                identifier: 811,
                name:  'S. Sanders'
              },
              effective_date: '2007-03-01',
              issued_date: '03/04/2013',
              performer: {
                identifier: 32,
                performer: 'A. Langeveld',
                role: 'Nurse',
                actor: 'blue cross & blue shield'
              } ,
              value: '6.3 mmol/l',
              interpretation: 'High',
              result: '',
              codeDiagnosis: '',
              context: '',
              category: '',
              basedOn: '',
              specimen: '',
              imagingStudy: '',
              conclusion: '',
              presentedForm: ''
            },
            {
              identifier: 95877,
              id:'f005',
              status: 'final',
              code: 'Calcium [Moles/volume] in Blood',
              patient: {
                identifier: 4152,
                  name:  'P. van de Heuvel'
                },
              effective_date: '2008-05-01',
              issued_date: '03/04/2017',
              performer: {
              identifier: 825,
                performer: 'L. Beiman',
                role: 'Doctor',
                actor: 'blue cross & blue shield'
              } ,
                value : '2.2 mmol/l',
                interpretation: 'Normal',
                result: '',
                codeDiagnosis: '',
                context: '',
                category: '',
                basedOn: '',
                specimen: '',
                imagingStudy: '',
                conclusion: '',
                presentedForm: ''
            }

]



exports.LabInfo = {
                    patientId: 888666,
                    labs: [
                            {
                              LabID: 55679,
                              Name_of_the_test: "glucose test",
                              Ordered: "yes",
                              Testing_Date: "Jan, 01, 2018",
                              result: {
                                Completed: "yes",
                                Value: 66,
                                Unit: "mg/L",
                                Normal_range: "55 - 66 mg/L",
                                Comments: 'This patient did the lab tests in the morning, everything is nomral. He will be back in a month, Here, I just want to test the table behavior when I have a really long discription.'
                              }
                            },
                            {
                                LabID: 55677,
                                Name_of_the_test: "ALT test",
                                Ordered: "yes",
                                Testing_Date: "Jan, 01, 2018",
                                result: {
                                  Completed: "yes",
                                  Value: 135,
                                  Unit: "mg/L",
                                  Normal_range: "100 - 150 mg/L",
                                  Comments: 'tested after breakfest'
                                }
                              },
                              {
                                  LabID: 55679,
                                  Name_of_the_test: "Sodium test",
                                  Order: "yes",
                                  Testing_Date: "Jan, 01, 2018",
                                  result: {
                                    Completed: "No",
                                    Value: undefined,
                                    Unit: "mg/mL",
                                    Normal_range: "55 - 60 mg/mL",
                                    Comments: undefined
                                  }
                                },
                    ]
}
