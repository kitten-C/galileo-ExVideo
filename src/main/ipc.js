import { ipcMain } from 'electron'
import dll from './dll/index'
import { getDeviceConfig } from './utils/index.js'

const initIpc = () => {
  ipcMain.on('dll', (event, val) => {
    // val 格式 {name: 'sixAxisDll', function: 'Connect', data: ['192.168.1.100', 8080, '192.168.1.88', 8080]}
    try {
      val.res = dll[val.name].fun[val.function](...val.data)
      console.info(`dll-${val.name}-val`, val)
    } catch (error) {
      console.error('dll err:', error)
    }
  })

  ipcMain.handle('get-decive-config', async () => {
    try {
      return await getDeviceConfig()
    } catch (err) {
      return { success: false, error: err.message }
    }
  })
}

export default initIpc
