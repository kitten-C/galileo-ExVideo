import Dll from './dll'
const dllPath = '../../resources/dll/treadmill/ComAPI_TCP.dll'

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

const treadmillDll = new Dll({ path: dllPath, config })

export default treadmillDll
