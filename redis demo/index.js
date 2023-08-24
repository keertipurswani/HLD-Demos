const redis = require('redis');

const client = redis.createClient({
  url: 'redis://<username>:<pwd>@<server_url>>:<server_port>'
});

  client.on('connect', () => {
    console.log('Connected to Redis');
  });
  
  client.on('error', (err) => {
    console.error('Redis Error:', err);
  });

  // Setting data in Redis cache
client.set('hld-demo-key', JSON.stringify({ id: 999, name: 'Keerti Purswani', email: 'xyz@gmail.com' }), (err, reply) => {
    if (err) {
      console.error('Error setting data in Redis:', err);
    } else {
      console.log('Data set in Redis:', reply);
    }
  });

client.set("hld-demo-key2","demo-value1")