import { app, ipcMain } from 'electron'
import dll from './dll/index'
import { getDeviceConfig } from './utils/index.js'
import { publishGameClose } from './matt.js'
import { getConfig } from './utils'

const isDev = process.env.NODE_ENV === 'development'
const initIpc = () => {
  ipcMain.on('dll', (event, val) => {
    // val 格式 {name: 'sixAxisDll', function: 'Connect', data: ['192.168.1.100', 8080, '192.168.1.88', 8080]}
    try {
      val.res = dll[val.name].fun[val.function](...val.data)
      // console.info(`dll-${val.name}-val`, val)
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
  ipcMain.handle('get-config', () => {
    try {
      return getConfig()
    } catch (err) {
      return { success: false, error: err.message }
    }
  })
  ipcMain.handle('get-options', () => {
    try {
      return global.sharedOptions
    } catch (err) {
      return { success: false, error: err.message }
    }
  })
  ipcMain.handle('app-quit-self', () => {
    if (isDev) {
      console.log('假装退出了')
    } else {
      publishGameClose()
      app.quit()
    }
  })
}

export default initIpc
