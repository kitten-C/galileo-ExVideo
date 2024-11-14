import koffi from 'koffi'

class Dll {
  constructor(parameters) {
    this.lib = koffi.load(parameters.path)
    this.fun = {}
    this.init(parameters.config)
    console.log('Dll initscess')
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
