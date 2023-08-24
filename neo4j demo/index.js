const neo4j = require('neo4j-driver');

// Replace these with your actual connection details
const uri = 'neo4j+s://<server_uri>:<port>';
const username = '<username>';
const password = '<pwd>';

// Create a Neo4j driver to connect to the Aura database
const driver = neo4j.driver(uri, neo4j.auth.basic(username, password));

async function createComplexData(session) {
  // Create movie nodes with genres and directors
  await session.run(`
    CREATE (m1:Movie {title: 'Inception', year: 2010})
    SET m1.genres = ['Action', 'Sci-Fi', 'Thriller']
    CREATE (m2:Movie {title: 'Interstellar', year: 2014})
    SET m2.genres = ['Adventure', 'Drama', 'Sci-Fi']
    CREATE (m3:Movie {title: 'The Dark Knight', year: 2008})
    SET m3.genres = ['Action', 'Crime', 'Drama']
    CREATE (m4:Movie {title: 'Blade Runner 2049', year: 2017})
    SET m4.genres = ['Drama', 'Mystery', 'Sci-Fi']
  `);

  // Create actor nodes
  await session.run("CREATE (:Actor {name: 'Leonardo DiCaprio'})");
  await session.run("CREATE (:Actor {name: 'Ellen Page'})");
  await session.run("CREATE (:Actor {name: 'Matthew McConaughey'})");
  await session.run("CREATE (:Actor {name: 'Anne Hathaway'})");
  await session.run("CREATE (:Actor {name: 'Christian Bale'})");
  await session.run("CREATE (:Actor {name: 'Heath Ledger'})");
  await session.run("CREATE (:Actor {name: 'Ryan Gosling'})");
  await session.run("CREATE (:Actor {name: 'Harrison Ford'})");

  // Create director nodes
  await session.run("CREATE (:Director {name: 'Christopher Nolan'})");
  await session.run("CREATE (:Director {name: 'Denis Villeneuve'})");

  // Create relationships between actors and movies
  await session.run("MATCH (m:Movie {title: 'Inception'}), (a:Actor {name: 'Leonardo DiCaprio'}) CREATE (a)-[:ACTED_IN]->(m)");
  await session.run("MATCH (m:Movie {title: 'Inception'}), (a:Actor {name: 'Ellen Page'}) CREATE (a)-[:ACTED_IN]->(m)");
  await session.run("MATCH (m:Movie {title: 'Interstellar'}), (a:Actor {name: 'Matthew McConaughey'}) CREATE (a)-[:ACTED_IN]->(m)");
  await session.run("MATCH (m:Movie {title: 'Interstellar'}), (a:Actor {name: 'Anne Hathaway'}) CREATE (a)-[:ACTED_IN]->(m)");
  await session.run("MATCH (m:Movie {title: 'The Dark Knight'}), (a:Actor {name: 'Christian Bale'}) CREATE (a)-[:ACTED_IN]->(m)");
  await session.run("MATCH (m:Movie {title: 'The Dark Knight'}), (a:Actor {name: 'Heath Ledger'}) CREATE (a)-[:ACTED_IN]->(m)");
  await session.run("MATCH (m:Movie {title: 'Blade Runner 2049'}), (a:Actor {name: 'Ryan Gosling'}) CREATE (a)-[:ACTED_IN]->(m)");
  await session.run("MATCH (m:Movie {title: 'Blade Runner 2049'}), (a:Actor {name: 'Harrison Ford'}) CREATE (a)-[:ACTED_IN]->(m)");

  // Create relationships between directors and movies
  await session.run("MATCH (m:Movie {title: 'Inception'}), (d:Director {name: 'Christopher Nolan'}) CREATE (d)-[:DIRECTED]->(m)");
  await session.run("MATCH (m:Movie {title: 'Interstellar'}), (d:Director {name: 'Christopher Nolan'}) CREATE (d)-[:DIRECTED]->(m)");
  await session.run("MATCH (m:Movie {title: 'The Dark Knight'}), (d:Director {name: 'Christopher Nolan'}) CREATE (d)-[:DIRECTED]->(m)");
  await session.run("MATCH (m:Movie {title: 'Blade Runner 2049'}), (d:Director {name: 'Denis Villeneuve'}) CREATE (d)-[:DIRECTED]->(m)");
}

(async () => {
  const session = driver.session();
  try {
    await createComplexData(session);
    console.log('Complex data created successfully.');
  } catch (error) {
    console.error('Error creating complex data:', error);
  } finally {
    session.close();
  }
})();

process.on('beforeExit', () => driver.close());
