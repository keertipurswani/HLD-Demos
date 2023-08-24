const neo4j = require('neo4j-driver');

// Replace these with your actual connection details
const uri = 'neo4j+s://<server_uri>:<port>';
const username = '<username>';
const password = '<pwd>';

// Create a Neo4j driver to connect to the Aura database
const driver = neo4j.driver(uri, neo4j.auth.basic(username, password));


async function runQuery(session) {
    const result = await session.run(`
      MATCH (movie:Movie)-[:ACTED_IN]->(actor:Actor)
      RETURN movie.title AS movie, collect(actor.name) AS actors
    `);
  
    console.log('Movies and their actors:');
    result.records.forEach(record => {
      const movie = record.get('movie');
      const actors = record.get('actors');
      console.log(`${movie}: ${actors.join(', ')}`);
    });
  }
  
  (async () => {
    const session = driver.session();
    try {
      await runQuery(session);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      session.close();
      driver.close();
    }
  })();