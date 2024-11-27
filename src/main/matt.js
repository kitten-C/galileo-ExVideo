import mqtt from 'mqtt'
import config from './config'

const client = mqtt.connect(`mqtt://127.0.0.1:${config.mqtt.port}`, config.mqtt)

client.on('connect', () => {
  client.subscribe('unity/continue', (err) => {
    console.log('unity/continue')
    process.stdout.write('nity/continuenity/continuenity/continuenity/continue')
    if (!err) {
      console.log('mqtt start')
    }
  })

  setInterval(() => {
    client.publish('game/ping', 'Hello mqtt')
  }, 1000)
})
