import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('dll', (value) => ipcRenderer.send('dll', value))
contextBridge.exposeInMainWorld('aaaaaaa', () => ipcRenderer.send('ping'))

contextBridge.exposeInMainWorld('electron', {
  // 提供一个函数，监听主进程发送的命令行参数
  quit: () => ipcRenderer.invoke('app-quit-self')
})

contextBridge.exposeInMainWorld('fileAPI', {
  getDeviceConfig: async () => {
    try {
      const result = await ipcRenderer.invoke('get-decive-config')
      return result
    } catch (error) {
      console.error('读取文件出错:', error.message)
      throw error
    }
  },
  getConfig: () => ipcRenderer.invoke('get-config'),
  getOptions: () => ipcRenderer.invoke('get-options'),
  updateDeviceSpeed: (callback) =>
    ipcRenderer.on('update-device-speed', (_event, value) => callback(value)),
  updateDeviceDistance: (callback) =>
    ipcRenderer.on('update-device-distance', (_event, value) => callback(value)),
  updateDeviceWarn: (callback) =>
    ipcRenderer.on('update-device-warn', (_event, value) => callback(value))
})

contextBridge.exposeInMainWorld('mqtt', {
  continue: (callback) => ipcRenderer.on('on-mqtt-continue', (_event, value) => callback(value)),
  pause: (callback) => ipcRenderer.on('on-mqtt-pause', (_event, value) => callback(value)),
  close: (callback) => ipcRenderer.on('on-mqtt-close', (_event, value) => callback(value))
})
