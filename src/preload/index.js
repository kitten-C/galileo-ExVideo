import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('dll', (value) => ipcRenderer.send('dll', value))
contextBridge.exposeInMainWorld('aaaaaaa', () => ipcRenderer.send('ping'))

contextBridge.exposeInMainWorld('electron', {
  // 提供一个函数，监听主进程发送的命令行参数
  onSetFolderPath: (callback) => ipcRenderer.on('set-folder-path', (event, args) => callback(args))
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
  getOptions: () => ipcRenderer.invoke('get-options')
})
