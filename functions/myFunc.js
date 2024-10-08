exports = async function() {
  // A Scheduled Trigger will always call a function without arguments.
  // Documentation on Triggers: https://www.mongodb.com/docs/atlas/app-services/triggers/

  // Functions run by Triggers are run as System users and have full access to Services, Functions, and MongoDB Data.

  // Get the MongoDB service you want to use (see "Linked Data Sources" tab)
  const serviceName = "mongodb-atlas";
  const databaseName = "db";
  const collectionName = "col";
  const collection = context.services.get(serviceName).db(databaseName).collection(collectionName);

  try {
    const doc = await collection.insertOne({ name: "hi" });
  } catch (err) {
    console.log("error performing mongodb insertOne: ", err.message);
  }
};
