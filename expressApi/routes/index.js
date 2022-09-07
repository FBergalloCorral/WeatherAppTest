const { json } = require('express');
var express = require('express');
var router = express.Router();
//Firestore
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
//FS Credentials
const serviceAccount = require('../wouldBeSecret/weatherapptest-e6318-4ff47f4750f7.json');
initializeApp({
  credential: cert(serviceAccount)
});
//FS startup
const db = getFirestore();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

//REST API calls
router.get('/allWeatherData', async (req, res) => {
  var jsonResponse = await getAllWeather(db)
  res.send(jsonResponse);
})

router.get('/getDay/:city/:day', async (req, res) => { // get all info in a given city on a given day
  var jsonResponse = await getDaysInfo(db, req.params.city, req.params.day)
  res.json(jsonResponse);
})

router.get('/erase/:city/:day', async (req, res) => { // delete all info in a given city on a given day
  var jsonResponse = await db.doc("/Weather/" + req.params.city + "/weatherReports/" + req.params.day).delete();
  res.json(jsonResponse);
})
router.get('/eraseEverything/:city', async (req, res) => { // delete all info in a given city on a given day
  var jsonResponse = await deleteCollection(db, "/Weather/" + req.params.city + "/weatherReports/", 10);
  res.json(jsonResponse)
})
//get Day data async function
async function getDaysInfo(db, city, day) {
  var doc = await db.doc("/Weather/" + city + "/weatherReports/" + day).get();
  return doc.data();
}
//Collection getting async function
async function getAllWeather(db) {
  var weather = db.collection("Weather");
  var snapshot = await weather.get();
  var massiveObject = [];
  for (const doc of snapshot.docs) {
    var sub = await getSubcollections(doc);
    massiveObject.push(sub)
  };
  return massiveObject;
}
async function getSubcollections(doc) {
  var cityRef = doc.ref;
  var subcollections = await cityRef.listCollections();// I mistook the firebase-client for the firebase-admin here, so I was referencing the wrong library.
  var document = await cityRef.get();
  var dataOnLevel = document.data();
  var docId = doc.id;
  var objectToReturn = {};
  if (subcollections.length <= 0) { // return document data if there are no subcollections
    objectToReturn[docId] = dataOnLevel
    return objectToReturn;
  };
  var docCollectionArray = [];
  for (const collection of subcollections) {
    var subDocs = await getSubdocuments(collection)
    docCollectionArray.push(subDocs);
  };
  dataOnLevel["weatherReports"] = docCollectionArray;
  objectToReturn[docId] = dataOnLevel
  return objectToReturn
}
async function getSubdocuments(collection) {
  const documents = await collection.get();
  if (documents.size <= 0) return;//return empty if empty
  var documentArray = [];
  for (const doc of documents.docs) {
    var subCol = await getSubcollections(doc);
    documentArray.push(subCol);
  };
  return documentArray;
}
//Collection Deletion Template
async function deleteCollection(db, collectionPath, batchSize) {
  const collectionRef = db.collection(collectionPath);
  if (collectionRef.docs.length <= 0) {
    return { message: "collection is empty or does not exist" };
  }
  const query = collectionRef.orderBy('__name__').limit(batchSize);
  return new Promise((resolve, reject) => {
    deleteQueryBatch(db, query, resolve).catch(reject);
  });
}

async function deleteQueryBatch(db, query, resolve) {
  const snapshot = await query.get();

  const batchSize = snapshot.size;
  if (batchSize === 0) {
    // When there are no documents left, we are done
    resolve();
    return;
  }

  // Delete documents in a batch
  const batch = db.batch();
  snapshot.docs.forEach((doc) => {
    batch.delete(doc.ref);
  });
  await batch.commit();

  // Recurse on the next process tick, to avoid
  // exploding the stack.
  process.nextTick(() => {
    deleteQueryBatch(db, query, resolve);
  });
}
module.exports = router;
