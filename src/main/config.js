const config = {
  // 动捕类型 noitom/chingmu
  MocapType: 'chingmu',
  EmgWebsocket: 'ws://127.0.0.1:12900',
  BluetoothWebsocket: 'ws://127.0.0.1:12903',
  ForcePlatformWebsocket: 'ws://127.0.0.1:12904',
  IntelligentWebsocket: 'ws://127.0.0.1:12905',
  // 静态资源服务器
  host: '127.0.0.1',
  httpPort: 12888,
  url: 'http://127.0.0.1:12888',
  EEG: {
    host: '192.168.11.24',
    port: 8712
  },
  Physiolab: {
    host: '127.0.0.1',
    port: 9002
  },
  // 青瞳OSC服务交互
  chingmu: {
    port: 12001,
    oscHost: '127.0.0.1',
    oscPort: 12000,
    websocket: 'ws://127.0.0.1:12902'
  },
  // 海康威视摄像头连接
  hikvision: {
    host: '192.168.1.115',
    port: 80,
    username: 'admin',
    password: 'fftai2015'
  },
  // 摄像头视频保存位置及回放地址
  recordPath: 'D:\\record',
  recordUrl: 'http://127.0.0.1',
  // 用于electron的webview进程之间帧同步
  frameSyncPort: 12890,
  // electron桥接通信topic
  Channels: {
    recordData: 'recordData' // 数据回放时，通知视频播放状态，及同步视频播放时间
  },
  NoitomWebsocket: 'ws://127.0.0.1:12901',
  mqtt: {
    port: 12997,
    username: 'galileo',
    password: 'fftai2015',
    resetOnLastDisconnect: true,
    resetOnEveryDisconnect: true
  },
  ffi: 'koffi',
  game: {
    basePath: 'D:\\games\\'
  },
  lang: 'cn',
  machineinfo: {
    name: 'Galileo ExOps',
    version: 'V1'
  },
  exec: {
    start: '',
    frontEndLoaded: '',
    quit: ''
  },
  sixAxis: {
    host: '192.168.1.88',
    port: 8080,
    poisition: 80,
    rotationLimit: 8,
    accelerationLimit: 200
  },
  gate: {
    host: '192.168.1.98',
    port: 8090
  },
  safeService: {
    host: '127.0.0.1',
    port: 9090,
    path: 'D:\\Galileo-Safety\\Galileo-Safety.exe'
  }
}

export default config
