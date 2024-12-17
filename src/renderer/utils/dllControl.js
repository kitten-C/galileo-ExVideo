import TimeComparator from './timeComparator'
// import config from '../../main/config'
import { config } from '.'
// const config = getConfig
console.log('config', config)

export class TreadmillDLLControl extends TimeComparator {
  constructor(config) {
    super(config)
    // this.init()
    this.currentSpeed = 0
  }

  init() {
    window.dll({ name: 'treadmillDll', function: 'InitTreadmill', data: [] })
  }

  start() {
    window.dll({ name: 'treadmillDll', function: 'StartTreadmill', data: [0, 3] })
    this.addVal(this.currentSpeed)
  }

  stop() {
    this.pause()
    this.currentSpeed = 0
    console.log('this.currentSpeed', this.currentSpeed)
  }

  pause() {
    window.dll({ name: 'treadmillDll', function: 'StopTreadmill', data: [3] })
  }

  addVal(num = 100) {
    if (num === 0) return
    window.dll({ name: 'treadmillDll', function: 'AddVel', data: [num, 3] })
    this.currentSpeed += num
  }

  delVel(num = 100) {
    if (num === 0) return
    window.dll({ name: 'treadmillDll', function: 'DelVel', data: [num, 3] })
  }

  handleCompare(time) {
    const res = this.compare(time)
    if (res.success) {
      const {
        data: { speedup, forward }
      } = res
      if (forward === 1) {
        this.addVal(speedup)
      }
      if (forward === 0) {
        this.stop()
      }
    }
    return res
  }

  reset() {
    this.index = 0
    this.currentSpeed = 0
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
