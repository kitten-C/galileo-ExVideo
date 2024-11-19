import { ipcMain } from 'electron'
import dll from './dll/index'

const initIpc = () => {
  ipcMain.on('dll', (event, val) => {
    // val 格式 {name: 'sixaxisDll', function: 'Connect', data: ['192.168.1.100', 8080, '192.168.1.88', 8080]}
    try {
      val.res = dll[val.name].fun[val.function](...val.data)
      console.info(`dll-${val.name}-val`, val)
    } catch (error) {
      console.error('dll err:', error)
    }
  })
}

export default initIpc
