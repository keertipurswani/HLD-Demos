const { Client } = require("cassandra-driver");
const cassandra = require('cassandra-driver');

async function run() {
    const client = new Client({
        cloud: {
            secureConnectBundle: "secure-connect-hld-demo.zip",
        },
        credentials: {
            username: "<username>",
            password: "<pwd>",
        },
    });

    const keyspace = 'demo';
    const table = 'users';

    // Connect to the Cassandra cluster
    client.connect((err) => {
        if (err) {
            console.error('Error connecting to the Cassandra cluster:', err);
            process.exit(1);
        }
        console.log('Connected to Cassandra');
    })



    // Create the 'users' table if it doesn't exist
    const createTableQuery = `CREATE TABLE IF NOT EXISTS ${keyspace}.${table} (
        id UUID PRIMARY KEY,
        name TEXT,
        email TEXT
      )`;
    client.execute(createTableQuery, (err) => {
        if (err) {
            console.error('Error creating table:', err);
            process.exit(1);
        }
        console.log(`Table '${table}' created (if not exists)`);
    })

    const insertQuery = `INSERT INTO ${keyspace}.${table} (id, name, email) VALUES (?, ?, ?)`;
    const params = [cassandra.types.uuid(), 'HLD Students', 'abc@gmail.com'];
    client.execute(insertQuery, params, { prepare: true }, (err) => {
        if (err) {
            console.error('Error inserting data:', err);
        } else {
            console.log('Data inserted successfully');
        }
    })


    // READ
    const selectQuery = `SELECT * FROM ${keyspace}.${table}`;
    client.execute(selectQuery,  (err, result) => {
      if (err) {
        console.error('Error reading data:', err);
      } else {
        console.log('Data retrieved successfully:');
        result.rows.forEach((row) => {
          console.log(row);
        });
      }
    })

    }

// Run the async function
run();