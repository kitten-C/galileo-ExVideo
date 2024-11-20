import Dll from './dll'

const filename = 'treadmill/SixaxisDll.dll'

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
      'float', // rotationX
      'float', // rotationY
      'float', // rotationZ
      'float', // accelerationX
      'float', // accelerationY
      'float', // accelerationZ
      'int', // platformControl
      'float' // accScale
    ]
  ]
}

const sixAxisDll = new Dll({ filename, config })

export default sixAxisDll
