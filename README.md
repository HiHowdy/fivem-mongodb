# Fivem-MongoDB
FiveM-MongoDB is a MongoDB wrapper for use within FiveM. For full documentation of MongoDB see [here](https://www.mongodb.com/docs/drivers/node/current/). All compatible operations are listed below. All functions are designed to be used for JavaScript however a patch will be coming shortly for LUA. 

This will be updated to include more operations in future.

## Requirements

 - Yarn
 - Database [(see here)](https://www.mongodb.com/basics/create-database)

## Installation

 1. Clone repository into a resource named `mongodb`
 2. Copy `mongodb.cfg` into your servers root directory and execute it from `server.cfg` with exec `mongodb.cfg`. **Alternatively** copy the contents and place them into your `server.cfg`
 3. Update `mongo_url` and `mongo_database` in your cfg to match your database accordingly
 4. Ensure or start the resource by adding `ensure mongodb` into your server.cfg
 5. In the mongodb resource directory run `npm i` or `yarn` to install the packages

## Usage
| export | params | returns | use |
|--|--|--|--|
| checkDatabaseReady | N/A | Boolean | Checks to see if connection has been established |
| countDocuments | collection: String, params: Array | Integer | Returns the number of documents in the collection that match the speficied query
| deleteOne | collection: String, params: Object | {acknowledged, deletedCount} |  Deletes a single document in a collection that matches the specified query
| deleteMany | collection: String, params: Object | {acknowledged, deletedCount} | Deletes multiple or all documents that match the specific query.
| insertOne | collection: String, params: Object | {acknowledged, insertedId} | Inserts a documents into a collection with given values
| insertMany | collection: String, params: Array | Array of inserted documents | Inserts multiple documents into a collection with given values
| find | collection: String, params: Array | Array of found documents | Finds documents in a collection that match the specific query
| findAll | collection: String | Array of found documents | Finds all documents on a specified collection
| updateOne | collection: String, params: Array | Result of updated document | Updates a single document matching a specific query
