import Connection from "../models/Connection.js";
import { MongoClient } from "mongodb";

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

export const loginserverurisimple = async (req, res) => {
  const { server, port } = req.body;
  const uri = `mongodb://${server}:${port}`;
  console.log(uri);
  let URI = "";
  URI = uri;
  try {
    const client = new MongoClient(uri, options);
    await client.connect();
    console.log("Successfully connected to Server");
    client.close();

    try {
      const oldServer = await Connection.findOne({ server });

      if (!oldServer) {
        await Connection.create({
          server,
          port,
          URI,
        });

        res.send({ message: "Server Created Successfully" });
      } else {
        console.log("Server already exists");
        res.send({ message: "Server Connected Successfully", URI: uri });
      }
    } catch (error) {
      res
        .status(500)
        .send({ error: `Failed to create Server: ${error.message}` });
    }
  } catch (err) {
    console.error(
      "An error occurred the server couldnt connect: ",
      err.message
    );
    res.status(500).json({ message: "Failed to connect to Server" });
  }
};

export const loguri = async (req, res) => {
  const { uri } = req.query;
  const decodedURI = decodeURIComponent(uri);
    
  console.log(decodedURI);

  try {
    const client = new MongoClient(decodedURI, options);
    await client.connect();
    client.close();

    res.send({ message: "Server connected Successfully", URI: uri  });
  } catch (error) {
    res
      .status(500)
      .send({ error: `Failed to connect to Server: ${error.message}` });
  }
};

export const loginserver = async (req, res) => {
  const { server, port, username, password, authDatabase, authMechanism } =
    req.body;

  const connection = new Connection(req.body);
  const uri =
    connection.authMechanism === "SCRAM-SHA-256"
      ? `mongodb://${connection.username}:${connection.password}@${connection.server}:${connection.port}/?authSource=${connection.authDatabase}&authMechanism=SCRAM-SHA-256`
      : `mongodb://${connection.username}:${connection.password}@${connection.server}:${connection.port}/${connection.authDatabase}`;

  console.log(uri);
  let URI = "";
  URI = uri;
  try {
    const client = new MongoClient(uri, options);
    await client.connect();
    console.log("Successfully connected to Server");
    client.close();

    try {
      const oldServer = await Connection.findOne({ server });

      if (!oldServer) {
        await Connection.create({
          server,
          port,
          username,
          password,
          authDatabase,
          authMechanism,
          URI,
        });

        res.send({ message: "Server Created Successfully" });
      } else {
        console.log("Server already exists");
        res.send({ message: "Server Connected Successfully", URI: uri });
      }
    } catch (error) {
      res
        .status(500)
        .send({ error: `Failed to create Server: ${error.message}` });
    }
  } catch (err) {
    console.error(
      "An error occurred the server couldnt connect: ",
      err.message
    );
    res.status(500).json({ message: "Failed to connect to Server" });
  }
};

export const getallConnection = async (req, res, next) => {
  try {
    const connections = await Connection.find();
    res.status(200).json(connections);
  } catch (err) {
    next(err);
  }
};

/*export const getdatabases = async (req, res, next)  => {
        try {

          const { uri } = req.query;
          console.log(uri);
          const decodedURI = decodeURIComponent(uri);
          console.log(decodedURI);
          const client = new MongoClient(decodedURI, options);

          await client.connect();
          console.log(`Successfully connected to server `);
       const connections = await Connection.find();
       let  data = [];
       console.log('connections', connections)
 
       for (let i = 0; i < connections.length; i++) {
        const connection = connections[i];
      
        if (connection.URI === decodedURI) {
          const databases = await client.db().admin().listDatabases();
          const databaseNames = [];
         
          for (let j = 0; j < databases.databases.length; j++) {
            const dbName = databases.databases[j].name;
            const db = client.db(dbName);
            const collections = await db.listCollections().toArray();
            const collectionNames = collections.map((collection) => collection.name);
            databaseNames.push({
              name: dbName,
              collections: collectionNames,
            });
          }
      
          data.push({
            id: connection._id,
            server: connection.server,
            port: connection.port,
            databases: databaseNames,
          });
        }
      }
      

    client.close();

    res.send(data);
    } catch (err) {
    console.error(`Failed to get connections: ${err.message}`);
    res.send([]);
  }
};*/

export const getdatabases = async (req, res, next) => {
  try {
    const { uri } = req.query; 
    const decodedURI = decodeURIComponent(uri);
    const client = new MongoClient(decodedURI, options);
    await client.connect();
    const connection = await Connection.findOne({ URI: decodedURI });
    const databases = await client.db().admin().listDatabases();
    client.close();
    res.send({
      id: connection._id,
      server: connection.server,
      port: connection.port,
      databases: databases?.databases?.map((e) => e.name),
    });
  } catch (err) {
    console.error(`Failed to get connections: ${err.message}`);
    res.end();
  }
};


export const getCollections = async (req, res) => {
  try {
    const { uri , databaseName } = req.query; 
    const decodedURI = decodeURIComponent(uri);
    const connection = await Connection.findOne({ URI: decodedURI });
    const client = new MongoClient(connection.URI, options);
    await client.connect();
    const db = client.db(databaseName);
    const collections = await db.listCollections().toArray();
    console.log('collections', collections)
    client.close();
    res.send({
      collections: collections?.map(({name,_id}) =>({name,_id})),
    });
  } catch (err) {
    console.error(`Failed to get connections: ${err.message}`);
    res.end();
  }
};

export const getCollectiondata = async (req, res) => {
  try {
    const { uri , databaseName, collectionName } = req.query; 
    const decodedURI = decodeURIComponent(uri);
    const connection = await Connection.findOne({ URI: decodedURI });
    const client = new MongoClient(connection.URI, options);
    await client.connect();
    const db = client.db(databaseName);
    const keys = await db.collection(collectionName).find().map((doc) => Object.keys(doc)).toArray();
    const distinctKeys = [...new Set(keys.flat())];
    const mappedKeys = distinctKeys?.map((keyName) => ({ name: keyName }));
    console.log('keys', mappedKeys);
    client.close();
    res.send({

      keys: mappedKeys,
       
    });
  } catch (err) {
    console.error(`Failed to get keys: ${err.message}`);
    res.end();
  }
};

const Controller={
  getCollections,
  getallConnection,
  getdatabases,
  loginserverurisimple,
  loginserver,
  getallConnection,
  loguri,
  getCollectiondata
}

export default Controller