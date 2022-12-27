const { MongoClient } = require("mongodb");

async function main() {
  const url =
    "mongodb+srv://tweetBot:tweetBot@cluster0.kuyrg.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(url);
  try {
    await client.connect();
    //await listDatabases(client);
    const db=client.db("UserInfo");
    let newListing = {
      pid: 1234,
      name: "vivek",
      age: 23,
      gender: "Male",
      weight: 65,
      riskFactors: {
        isPregnent: "No",
        pregnencyCondition: "No",
        isSmoking: "Yes",
        isAlcohol: "Yes",
        frequency: "Daily",
        isDrugAllergic: "Yes",
        names: ["Paracetamol", "Aspirin", "Ibuprofen"],
      },
      concurrentMedicalConditions: {
        nameOfMedicalCondition: [
          {
            name: "Diabetes",
            diagnosisDate: "12/12/2012",
            treatmentMedications: ["Metformin", "Insulin"],
          },
        ],
      },
    };
    //await createListing(client, newListing);
    //@Validator schema
    // db.createCollection( "Patient", {
    //   validator: {
    //     $jsonSchema: {
    //       bsonType: "object",
    //       title: "Patient",
    //       required: [
    //         "pid",
    //         "name",
    //         "age",
    //         "gender",
    //         "weight",
    //         "riskFactors",
    //         "concurrentMedicalConditions",
    //       ],
    //       properties: {
    //         pid: {
    //           bsonType: "int",
    //           description: "must be an integer and is required",
    //         },
    //         name: {
    //           bsonType: "string",
    //           description: "must be a string and is required",
    //         },
    //         age: {
    //           bsonType: "int",
    //           description: "must be an integer and is required",
    //         },
    //         gender: {
    //           bsonType: "string",
    //           description: "must be a string and is required",
    //         },
    //         weight: {
    //           bsonType: "int",
    //           description: "must be an integer and is required",
    //         },
    //         riskFactors: {
    //           bsonType: "object",
    //           required: [
    //             "isPregnent",
    //             "pregnencyCondition",
    //             "isSmoking",
    //             "isAlcohol",
    //             "frequency",
    //             "isDrugAllergic",
    //             "names",
    //           ],
    //           properties: {
    //             isPregnent: {
    //               bsonType: "boolean",
    //               description: "must be a boolean and is required",
    //             },
    //             pregnencyCondition: {
    //               bsonType: "string",
    //               description: "must be a string and is required",
    //             },
    //             isSmoking: {
    //               bsonType: "boolean",
    //               description: "must be a boolean and is required",
    //             },
    //             isAlcohol: {
    //               bsonType: "boolean",
    //               description: "must be a boolean and is required",
    //             },
    //             frequency: {
    //               bsonType: "string",
    //               description: "must be a string and is required",
    //             },
    //             isDrugAllergic: {
    //               bsonType: "boolean",
    //               description: "must be a boolean and is required",
    //             },
    //             names: {
    //               bsonType: "array",
    //               description: "must be an array and is required",
    //               items: {
    //                 bsonType: "string",
    //               },
    //             },
    //           },
    //         },
    //         concurrentMedicalConditions: {
    //           bsonType: "object",
    //           required: ["nameOfMedicalCondition"],
    //           properties: {
    //             nameOfMedicalCondition: {
    //               bsonType: "array",
    //               description: "must be an array and is required",
    //               items: {
    //                 bsonType: "object",
    //                 required: ["name", "diagnosisDate", "treatmentMedications"],
    //                 properties: {
    //                   name: {
    //                     bsonType: "string",
    //                     description: "must be a string and is required",
    //                   },
    //                   diagnosisDate: {
    //                     bsonType: "string", 
    //                     description: "must be a string and is required",
    //                   },
    //                   treatmentMedications: {
    //                     bsonType: "array",
    //                     description: "must be an array and is required",
    //                     items: {
    //                       bsonType: "string",
    //                     },
    //                   },
    //                 },
    //               },
    //             },
    //           },
    //         },
    //       },
    //     },
    //   },
    // });
    // db.collection("info").Patient.insertOne({
    //   pid: 1234,
    //   name: "vivek",
    //   age: 23,
    //   gender:'Male',
    //   weight: 65,
    //   riskFactors: {
    //     isPregnent: false,
    //     pregnencyCondition: "No",
    //     isSmoking: true,
    //     isAlcohol: true,
    //     frequency: "Daily",
    //     isDrugAllergic: true,
    //     names: ["Paracetamol", "Aspirin", "Ibuprofen"],
    //   },
    //   concurrentMedicalConditions: {
    //     nameOfMedicalCondition: [
    //       {
    //         name: "Diabetes",
    //         diagnosisDate: "12/12/2012",
    //         treatmentMedications: ["Metformin", "Insulin"],
    //       },],
    //   }


    // })
    //await findOneListingByName(client, "Raj");
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}
main().catch(console.error);
async function findOneListingByName(client, nameOfListing) {
  const result = await client
    .db("UserInfo")
    .collection("info")
    .findOne({ Name: nameOfListing });
  if (result) {
    console.log(
      `Found a listing in the collection with the name '${nameOfListing}':`
    );
    console.log(result);
  } else {
    console.log(`No listings found with the name '${nameOfListing}'`);
  }
}
async function listDatabases(client) {
  const databaseList = await client.db().admin().listDatabases();
  console.log("Databases:");
  databaseList.databases.forEach((db) => {
    console.log(` - ${db.name}`);
  });
}
async function createListing(client, newListing) {
  const result = await client
    .db("UserInfo")
    .collection("info")
    .insertOne(newListing);
  console.log(
    `New listing created with the following id: ${result.insertedId}`
  );
}
