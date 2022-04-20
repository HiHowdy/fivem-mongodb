
console.log('here');
const { MongoClient } = require('mongodb');

const url = GetConvar('mongo_url', 'unset');
const dbName = GetConvar('mongo_database', 'unset');
let db = false;

/**
 * `init()` connects to the MongoDB database.
 * @returns A promise that resolves to a string.
 */
async function init() {
    console.log('init');

    if (url === 'unset' || dbName === 'unset')
        return '[MongoDB]: Unable to establish connection. (Missing database URL or database name)';

    const client = new MongoClient(url);
    await client.connect();
    db = client.db(dbName);
    return `[MongoDB]: Connection established (${dbName})`;
}

init().then(console.log).catch(console.error);

/**
 * If the database is ready, return true, otherwise return false.
 */
const checkDatabaseReady = () => (db ? true : false);
exports('checkDatabaseReady', checkDatabaseReady);

/**
 * It counts the number of documents in a collection that match the given parameters
 * @param collection - The name of the collection you want to query.
 * @param params - An object that specifies the query criteria.
 * @returns The number of documents in the collection that match the query.
 * @example countDocuments('people', [{name: 'john'}])
 */
const countDocuments = async (collection, params) => {
    if (!hasConnection) return false;

    const dbCollection = db.collection(collection);
    return await dbCollection.count(...params);
};
exports('countDocuments', countDocuments);

/**
 * Delete one document from the database
 * @param collection - The name of the collection you want to delete from.
 * @param params - The parameters to use to find the document to delete.
 * @returns {acknowledged, deletedCount}
 * @example deleteOne('people', {name: 'john'})
 */
const deleteOne = async (collection, params) => {
    if (!hasConnection) return false;

    if (!params) {
        console.error(
            `Invalid or no params used on deleteOne. Collection: ${collection}.`
        );
        return false;
    }

    const dbCollection = db.collection(collection);
    return await dbCollection.deleteOne(params);
};
exports('deleteOne', deleteOne);

/**
 * Delete many documents from a collection
 * @param collection - The name of the collection you want to delete from.
 * @param params - The parameters to use to find the documents to delete.
 * @returns {acknowledged, deletedCount}
 * @example deleteMany('people', {name: 'john'})
 */
const deleteMany = async (collection, params) => {
    if (!hasConnection) return false;

    if (!params) {
        console.error(
            `Invalid or no params used on deleteMany. Collection: ${collection}.`
        );
        return false;
    }

    const dbCollection = db.collection(collection);
    return await dbCollection.deleteMany(params);
};
exports('deleteMany', deleteMany);

/**
 * Inserts one document into a collection
 * @param collection - The name of the collection you want to insert into.
 * @param params - The parameters to be used in the query.
 * @returns {acknowledged, insertedId}
 * @example insertOne('people', {name: 'john', birthyear: 2003})
 */
const insertOne = async (collection, params) => {
    if (!hasConnection) return false;

    if (!params) {
        console.error(
            `Invalid or no params used on insertOne. Collection: ${collection}. Example: findOne('collection', {_id: 1})`
        );
        return false;
    }

    const dbCollection = db.collection(collection);
    return await dbCollection.insertOne(params);
};
exports('insertOne', insertOne);

/**
 * Inserts many documents into a collection
 * @param collection - The name of the collection you want to insert into.
 * @param params - An array of objects to insert into the collection.
 * @returns An array of the inserted documents.
 * @example insertMany('people', [{name: 'john', birthyear: 2003}, {name: 'doe', birthyear: 2003}])
 */
const insertMany = async (collection, params) => {
    if (!hasConnection) return false;

    if (!params) {
        console.error(
            `Invalid or no params used on insertMany. Collection: ${collection}.`
        );
        return false;
    }

    const dbCollection = db.collection(collection);
    return await dbCollection.insertMany(params);
};
exports('insertMany', insertMany);

/**
 * Finds documents in a collection based on the parameters passed in
 * @param collection - The name of the collection you want to find documents from.
 * @param params - An array of parameters to pass to the find method.
 * @returns An array of documents that match the params
 * @example find('people', [{name: 'john', birthyear: {$gt: 1980}}])
 */
const find = async (collection, params) => {
    if (!hasConnection) return false;

    if (!params) {
        console.error(
            `Invalid or no params used on find. Collection: ${collection}. If you want to find all documents use findAll()`
        );
        return false;
    }

    const dbCollection = db.collection(collection);
    return await dbCollection
        .find(...params)
        .toArray()
        .catch((err) => console.error(err.message));
};
exports('find', find);

/**
 * It returns a promise that resolves to an array of all the documents in the collection
 * @param collection - The name of the collection you want to query.
 * @returns An array of all the documents in the collection.
 * @example findAll('people')
 */
const findAll = async (collection) => {
    if (!hasConnection) return false;

    const dbCollection = db.collection(collection);
    return await dbCollection
        .find({})
        .toArray()
        .catch((err) => console.error(err.message));
};
exports('findAll', findAll);

/**
 * It takes a collection name and an array of parameters, and returns the result
 * updateOne method on the collection with the parameters.
 * @param collection - The name of the collection you want to update.
 * @param params - paramaters to pass
 * @returns The result of the updateOne function.
 * @example updateOne('people', [{index: '2004'}, {"$set": {index: '2005'}}])
 */
const updateOne = async (collection, params) => {
    if (!hasConnection) return false;

    if (!params) {
        console.error(`Invalid or no params used on updateOne`);
        return false;
    }

    const dbCollection = db.collection(collection);
    return await dbCollection.updateOne(...params);
};
exports('updateOne', updateOne);

module.exports = db;