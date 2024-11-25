import mqtt from 'mqtt'
import config from './config'

const client = mqtt.connect(`mqtt://127.0.0.1:${config.mqtt.port}`, config.mqtt.port)

client.on('connect', () => {
  client.subscribe('start', (err) => {
    if (!err) {
      console.log('mqtt start')
    }
  })
})
