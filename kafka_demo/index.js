const { Kafka } = require('kafkajs')

// This creates a client instance that is configured to connect to the Kafka broker provided by
// the environment variable KAFKA_BOOTSTRAP_SERVER
const kafka = new Kafka({
  clientId: '',
  brokers: ["$broker"],
  ssl: true,
  logLevel: 2,
  sasl: {
    mechanism: 'SCRAM-SHA-256',
    username: '$username',
    password: '$pwd'
  }
})


const producer = kafka.producer()
producer.on('producer.connect', () => {
  console.log(`KafkaProvider: connected`);
});
producer.on('producer.disconnect', () => {
  console.log(`KafkaProvider: could not connect`);
});
producer.on('producer.network.request_timeout', (payload) => {
  console.log(`KafkaProvider: request timeout ${payload.clientId}`);
});
const run = async () => {
  // Producing
  await producer.connect()
  await producer.send({
    topic: 'hld-demo',
    messages: [
        {value: 'Hey smart people'},
        {value: 'You just learnt Kafka!'},
        {value: 'Congratulations!!'},
        {value: 'Please try it yourself as well!'}
    ],
  })
}

run().catch(console.error)