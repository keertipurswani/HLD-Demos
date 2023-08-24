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
  
  
  // Getting data from Redis cache
  client.get('hld-demo-key', (err, data) => {
    if (err) {
      console.error('Error getting data from Redis:', err);
    } else {
      if (data) {
        const user = JSON.parse(data);
        console.log('User data from Redis:', user);
      } else {
        console.log('Data not found in Redis');
      }
    }
  });

  client.get("hld-demo-key2", (err, data) => {
    if(data){
        console.log('data for key is : ' + data)
    }
  })