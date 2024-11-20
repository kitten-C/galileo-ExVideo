import TimeComparator from './timeComparator'
import config from '../../main/config'

export class TreadmillDLLControl extends TimeComparator {
  constructor(config) {
    super(config)
    this.init()
  }

  init() {
    window.dll({ name: 'treadmillDll', function: 'InitTreadmill', data: [] })
  }

  start() {
    window.dll({ name: 'treadmillDll', function: 'StartTreadmill', data: [1, 3] })
  }

  stop() {
    window.dll({ name: 'treadmillDll', function: 'StopTreadmill', data: [3] })
  }

  addVal() {
    window.dll({ name: 'treadmillDll', function: 'AddVel', data: [100, 3] })
  }

  delVel() {
    window.dll({ name: 'treadmillDll', function: 'DelVel', data: [100, 3] })
  }

  handleCompare(time) {
    const res = this.compare(time)
    if (res.success) {
      const { data } = res
      window.dll({ name: 'treadmillDll', function: 'AddVel', data: [data.speedup, 3] })
    }
    return res
  }
}

export class SixAxisDLLControl extends TimeComparator {
  constructor(config) {
    super(config)
    this.init()
  }

  init() {
    window.dll({
      name: 'sixAxisDll',
      function: 'Connect',
      data: [
        config.sixAxis.host,
        +config.sixAxis.port,
        +config.sixAxis.rotationLimit,
        +config.sixAxis.accelerationLimit
      ]
    })
  }

  restore() {
    window.dll({
      name: 'sixAxisDll',
      function: 'SendMessageWash64Time',
      data: [0, 0, 0, 0, 0, 0, 0, 33, 1]
    })
  }

  handleCompare(time) {
    const res = this.compare(time)
    if (res.success) {
      const { data } = res
      window.dll({
        name: 'sixAxisDll',
        function: 'SendMessageWash64Time',
        data: [
          0,
          data.angle[0],
          data.angle[1],
          data.angle[2],
          data.acc[0],
          data.acc[1],
          data.acc[2],
          33,
          data.six_axis_acc
        ]
      })
    }
    return res
  }
}
