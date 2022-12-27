const mongoose = require("mongoose");
mongoose.set('strictQuery', true);

mongoose.connect("mongodb+srv://harshak02:jntucse1234@cluster0.sttwkrc.mongodb.net/newSemTab", {useNewUrlParser: true});

//concurrent Medical Conditions Helper
const MedicalCondition = {
    name : {
        type : String,
        required : true,
    },
    diagnosisDate : {
        type : Date,
        required : true,
    },
    treatmentMedications : {
        type : [String],
        required : true,
    }
};

//Past Medical Conditions Helper-1
const MedicinalProduct = {
    name : {
        type : String,
        required : true,
    },
    frequency : {
        type : Number,
        required : true,
    },
    usageRecomendations : {
        type : String,
        required : true,
    }
};

//Past Medical Conditions Helper-2
const MedicalConditionP = {
    name : {
        type : String,
        required : true,
    },
    diagnosisStartDate : {
        type : Date,
        required : true,
    },
    diagnosisEndDate : {
        type : Date,
        required : true,
    },
    medicines : {
        type : [MedicinalProduct],
        required : true,
    }
    
};

//Risk Factors Helper
const RiskFactorsHelper = {

    isPregnent : {
        type : Boolean,
        required : true,
    },

    pregnencyCondition : {
        type : String,
        required : true,
    },

    isSmoking : {
        type : Boolean,
        required : true,
    },

    ifStoppedDate : {
        type : Date,
        required : true,
    },

    isAlcohol : {
        type : Boolean,
        required : true,
    },

    frequency : {
        type : Number,
        required : true,
    },

    isDrugAllergic : {
        type : Boolean,
        require : true
    },

    names : {
        type : [String],
        required : true,
    }

};


const PatientSchema = new mongoose.Schema({

    Pid : {
        type : Number,
        required : true
    },

    Name : {
        type : String,
        required : true
    },
    
    Age : {
        type : Number,
        required : true
    },

    Gender: {
        type : String,
        required : true
    },

    Weight : {
        type : Number,
        required : true
    },

    RiskFactors : RiskFactorsHelper,

    ConcurrentMedicalConditions : {
        nameOfMedicalCondition : {
            type : [MedicalCondition],
        }
    },

    PastMedicalConditions : {
        nameOfMedicalCondition : {
            type : [MedicalConditionP],
        }
    }

});

const Patient = mongoose.model('Patient',PatientSchema);

function addFunc(data){
    const newPatient = new Patient({

        Pid : 1001,
        Name : "vivek",
        Age : 23,
        Gender : "male",
        Weight : 56,

        RiskFactors : {
            isPregnent : true,
            pregnencyCondition : "Lactation",
            isSmoking : true,
            ifStoppedDate : Date("23-10-2002"),
            isAlcohol : true,
            frequency : 78,
            isDrugAllergic : true,
            names : ["Abc","Xyz","Def"]      
        },

        ConcurrentMedicalConditions : {
            nameOfMedicalCondition : [{
                name : "fever",
                diagnosisDate : Date("23-10-2002"),
                treatmentMedications : ["Ab","Cd","Ef"],
            },
            {
                name : "fever",
                diagnosisDate : Date("23-10-2002"),
                treatmentMedications : ["Ab","Cd","Ef"],
            }]         
        },

        PastMedicalConditions : {
            nameOfMedicalCondition : [{
                name : "Ache",
                diagnosisStartDate : Date("31-10-2002"),
                diagnosisEndDate : Date("21-09-2002"),
                medicines : [{
                    name : "xyzz",
                    frequency : 30,
                    usageRecomendations : "Lorem Ipsum"
                },{
                    name : "xyzz",
                    frequency : 30,
                    usageRecomendations : "Lorem Ipsum"
                }]
            }]
        }

    }); 
    newPatient.save();
}


//invoke function to add into database
// addFunc();

Patient.findOne({Name : "vivek"},function(err,foundList){
    if(err){
        console.log(err);
    }
    else{
        console.log("Yeah found the User Entry");
        console.log(foundList.ConcurrentMedicalConditions.nameOfMedicalCondition[1].name);
    }
});

console.log("Done");
