import Dll from './dll'
import filePath from '../../../resources/dll/SixaxisDll.dll?asset&asarUnpack'

const config = {
  Connect: [
    'bool',
    [
      'string', // remoteIp
      'int', // remotePort
      'float', // rotationLimit
      'float' // accelerationLimit
    ]
  ],
  SendMessageWash64Time: [
    'void',
    [
      'int', // timestamp
      'float', // rotationX X轴侧倾角度
      'float', // rotationY Y轴侧倾角度
      'float', // rotationZ
      'float', // accelerationX 左右平移
      'float', // accelerationY 上下移动
      'float', // accelerationZ 前后平移
      'int', // platformControl
      'float' // accScale
    ]
  ]
}

const sixAxisDll = new Dll({ config, filePath })

export default sixAxisDll
