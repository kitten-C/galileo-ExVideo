import Dll from './dll'
import koffi from 'koffi'
import { BrowserWindow } from 'electron'
import filePath from '../../../resources/dll/ComAPI_TCP.dll?asset&asarUnpack'

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

const treadmillDll = new Dll({ config, filePath })

const callback = (
  nodeNum,
  left_control,
  right_control,
  left_ratio,
  right_ratio,
  obs,
  left_warn,
  right_warn,
  left_speed,
  right_speed
) => {
  // console.log('nodeNum:', nodeNum)
  // console.log('left_control:', left_control)
  // console.log('right_control:', right_control)
  // console.log('left_ratio:', left_ratio)
  // console.log('right_ratio:', right_ratio)
  // console.log('obs:', obs)
  // console.log('left_warn:', left_warn)
  // console.log('right_warn:', right_warn)
  // console.log('left_speed:', left_speed)
  // console.log('right_speed:', right_speed)
  BrowserWindow.getAllWindows()[0].webContents.send('update-device-speed', right_speed)
  if (left_warn || right_warn || obs) {
    BrowserWindow.getAllWindows()[0].webContents.send('update-device-warn')
  }
}
const TreadmillV2DataCallback = koffi.proto(
  'void TreadmillV2DataCallback(int nodeNum, float left_control, float right_control, float left_ratio, float right_ratio, int obs, int left_wran, int right_warn, float left_speed, float right_speed)'
)
const InitTreadmill = treadmillDll.lib.func('void InitTreadmill(TreadmillV2DataCallback *cb1)')
treadmillDll.fun.setStartMark()

let cb1 = koffi.register(callback, koffi.pointer(TreadmillV2DataCallback))
const res = InitTreadmill(cb1)

const left = Buffer.allocUnsafe(8) // double 占 8 字节
const right = Buffer.allocUnsafe(8)

// 写入初始值到 Buffer
left.writeDoubleLE(0) // 初始化 left 为 5.0
right.writeDoubleLE(0) // 初始化 right 为 15.0
const getDistance = treadmillDll.lib.func('int getDistance(double *cb11, double *cb12)')
// 调用 getDistance 函数
setInterval(() => {
  const result = getDistance(left, right)

  // // 从 Buffer 中读取更新后的值
  const updatedLeft = left.readDoubleLE(0) // 获取 left 的新值
  const updatedRight = right.readDoubleLE(0) // 获取 right 的新值

  // // 打印结果
  // console.log(`Result: ${result}`)
  // console.log(`Updated Left: ${updatedLeft}`)
  // console.log(`Updated Right: ${updatedRight}`)
  BrowserWindow.getAllWindows()[0].webContents.send('update-device-distance', updatedLeft)
}, 1000)
export default treadmillDll
