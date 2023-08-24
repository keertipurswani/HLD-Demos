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

const consumer = kafka.consumer("group id")
const topic = 'hld-demo'
const run = async () => {
    await consumer.connect()
    await consumer.subscribe({ topic, fromBeginning: true })
    await consumer.run({
      // eachBatch: async ({ batch }) => {
      //   console.log(batch)
      // },
      eachMessage: async ({ topic, partition, message }) => {
        const prefix = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`
        console.log(`- ${prefix} ${message.key}#${message.value}`)
      },
    })
  }

run().catch(e => console.error(`[error **********     example/consumer] ${e.message}`, e))