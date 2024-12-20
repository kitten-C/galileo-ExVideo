import mqtt from 'mqtt'
import { BrowserWindow } from 'electron'
import { getConfig } from './utils'
const config = getConfig()
console.log('config', config)

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

client.subscribe('game/command/close', (err) => {
  if (!err) {
    console.log('game/command/close')
  }
})
client.subscribe('unity/start', (err) => {
  if (!err) {
    console.log('unity/start')
  }
})

setInterval(() => {
  client.publish('game/ping', 'Hello mqtt')
}, 1000)

const obj = {
  'game/command/close': 'on-mqtt-close',
  'unity/continue': 'on-mqtt-continue',
  'unity/pause': 'on-mqtt-pause',
  'unity/start': 'on-mqtt-start'
}

client.on('message', (topic, message) => {
  BrowserWindow.getAllWindows()?.[0]?.webContents.send(obj[topic])
})

export const publishGameClose = () => {
  client.publish('game/prepareClose')
}
