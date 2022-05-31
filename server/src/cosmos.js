const dbClient = require('@azure/cosmos').CosmosClient;

// Using the CosmosDB emulator, so connects to local host port 8081 by default,
// Key is uniform across all installs of CosmostDB Emulator
// This would be fixed with environment variables otherwise
const endpoint = "https://localhost:8081";
const key = "C2y6yDjf5/R+ob0N8A7Cgv30VRDJIWEHLM+4QDU5DE2nQ9nDuVTqobD4b8mGGyPMbIZnqyMsEcaGQy67XIw/Jw=="
const partitionKey = undefined;
const client = new dbClient({ endpoint, key });
const database = client.database("tasks");
const container = database.container("tasklist");

async function connect() {
    await client.databases.createIfNotExists({ id: 'tasks' });
    await database.containers.createIfNotExists({ id: 'tasklist' });
}

async function getTasks(req, res) {
    let { resources } = await database.container('tasklist').items.readAll();
    res.json(resources);
}

async function postTask(req, res) {
    const newTask = { id: req.body.uid, name: req.body.name, description: req.body.description };
    const { resource: doc } = await container.items.create(newTask);
    res.json(doc);
}

async function putTask(req, res) {
    const updateTask = { id: req.params.uid, name: req.body.name, description: req.body.description };
    const { resource: doc } = await container.item.upsert(updateTask);
    res.json(doc);
}

async function deleteTask(req, res) {
    const deleteTask = { id: req.params.uid };
    const { resource: doc } = await container.item(req.params.uid).delete();
    res.json(doc);
}

module.exports = {
    connect,
    getTasks,
    postTask
}