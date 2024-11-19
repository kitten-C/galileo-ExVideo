import Dll from './dll'

const filename = 'treadmill/ComAPI_TCP.dll'

const config = {
  InitTreadmill: ['int', []],
  Stop: ['int', []],
  StartTreadmill: ['int', ['int', 'int']],
  StopTreadmill: ['int', ['int']],
  AddVel: ['int', ['int', 'int']],
  DelVel: ['int', ['int', 'int']],
  WarnStop: ['int', []],
  setStartMark: ['int', []],
  getDistance: ['int', ['double', 'double']],
  setWeight: ['int', ['double']]
}

const treadmillDll = new Dll({ filename, config })

export default treadmillDll
