import koffi from 'koffi'
import path from 'path'
import { app } from 'electron'
const isDev = process.env.NODE_ENV === 'development'
const getDllPath = (filename) => {
  return isDev
    ? path.resolve(__dirname, '../../resources/dll', filename)
    : path.resolve(path.dirname(app.getAppPath()), 'app.asar.unpacked/resources/dll', filename)
}
class Dll {
  constructor(parameters) {
    const dllPath = getDllPath(parameters.filename)
    this.lib = koffi.load(dllPath)
    this.fun = {}
    this.init(parameters.config)
  }

  init(config) {
    Object.keys(config).forEach((k) => {
      const v = config[k]
      const ret = v[0]
      const params = v[1]
      this.fun[k] = this.lib.func(k, ret, params)
    })
  }
}

export default Dll
