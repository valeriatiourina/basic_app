exports = async function (arg) {
  // This default function will get a value and find a document in MongoDB
  // To see plenty more examples of what you can do with functions see:
  // https://www.mongodb.com/docs/atlas/app-services/functions/

  // Find the name of the MongoDB service you want to use (see "Linked Data Sources" tab)

  // Defining Lodash variable
  const _ = require("lodash");

  let val = [1, 2, 3];

  return { result: `Hi + ${_.isArray(val)}` };
};
