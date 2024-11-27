import mqtt from 'mqtt'
import config from './config'
import { BrowserWindow } from 'electron'

const client = mqtt.connect(`mqtt://127.0.0.1:${config.mqtt.port}`, config.mqtt)

client.on('connect', () => {})
client.subscribe('unity/continue', (err) => {
  if (!err) {
    console.log('unity/continue')
  }
})
client.subscribe('unity/pause', (err) => {
  if (!err) {
    console.log('unity/pause')
  }
})

client.subscribe('unity/close', (err) => {
  if (!err) {
    console.log('unity/close')
  }
})

setInterval(() => {
  client.publish('game/ping', 'Hello mqtt')
}, 1000)

const obj = {
  'unity/close': 'on-mqtt-close',
  'unity/continue': 'on-mqtt-continue',
  'unity/pause': 'on-mqtt-pause'
}

client.on('message', (topic, message) => {
  BrowserWindow.getAllWindows()?.[0]?.webContents.send(obj[topic])
})
