import fs from 'fs'
import path from 'path'
import { Command } from 'commander'
import configPath from '../../../resources/config.json?commonjs-external&asset'

const assetsPath = 'D:\\Media'

function parseString(input) {
  const result = {}
  const pairs = input.match(/[\w.]+:\([^)]*\)|[\w.]+:[^ ]+/g) // 匹配 "key:value" 或 "key:(value,value)" 格式

  if (!pairs) return result

  pairs.forEach((pair) => {
    const [key, value] = pair.split(':')
    if (value.startsWith('(') && value.endsWith(')')) {
      // 解析数组
      result[key] = value.slice(1, -1).split(',').map(Number) // 去掉括号并转换为数字数组
    } else {
      // 直接解析为值
      result[key] = parseFloat(value) // 转换为数字
    }
  })

  return result
}

export const getDeviceConfig = async () => {
  const id = global.sharedOptions.id
  const deviceConfigNames = [
    { name: 'base', fileName: `video_${id}.json` },
    { name: 'sixAxis', fileName: `video_${id}_six_axis_cmd_2.txt` },
    { name: 'treadmill', fileName: `video_${id}_treadmill_cmd.txt` }
  ]
  const res = await Promise.all(
    deviceConfigNames.map(async ({ name, fileName }) => {
      try {
        const filePath = path.join(assetsPath, fileName)
        const fileBuffer = await fs.promises.readFile(filePath)
        const fileString = fileBuffer.toString('utf-8')
        let fileData
        if (name === 'base') {
          fileData = JSON.parse(fileString)
        } else {
          const lines = fileString.split('\n')
          const zeroIndex = lines.findIndex((line) => line.trim() === '0')
          if (zeroIndex === -1) {
            throw new Error("文件中未找到标记 '0'")
          }
          // 提取 "0" 以下的数据
          const fileArr = lines
            .slice(zeroIndex + 1) // 从 "0" 下一行开始
            .map((line) => line.trim()) // 去掉多余空白
            .filter((line) => line !== '') // 过滤空行
          fileData = fileArr.map(parseString)

          if (name === 'sixAxis') {
            let six_axis_accPre
            let angle_scalePre
            let acc_scalePre

            fileData = fileData.map((v) => {
              if (v.six_axis_acc) six_axis_accPre = v.six_axis_acc
              if (v.angle_scale) angle_scalePre = v.angle_scale
              if (v.acc_scale) acc_scalePre = v.acc_scale
              const angle = v.angle.map((vv, ii) => {
                return vv * angle_scalePre[ii]
              })
              const acc = v.acc.map((vv, ii) => {
                if (ii === 1) {
                  vv -= 200
                }
                return vv * acc_scalePre[ii]
              })
              return {
                time: v.time,
                six_axis_acc: six_axis_accPre,
                angle,
                acc
              }
            })
          }
        }
        return {
          name,
          fileName,
          fileData
        }
      } catch (error) {
        console.log('resgetDeviceConfigerror', error)
        return {
          name
        }
      }
    })
  )

  return res
}

export const getOptions = () => {
  const program = new Command()
  program
    .option('--Language <String>', 'Language', String)
    .option('--ProjectIndex <Number>', '医院', Number)
    .option('--Difficulty <Number>', '困难程度', Number)
    .option('--id <Number>', '素材id', Number)
    .option('--GameId <Number>', '素材id (alias for --id)', Number)
    .option('--time <Number>', '训练时长', Number)
    .option('--Time <Number>', '训练时长', Number)
  program.parse()
  const options = program.opts()
  if (options.GameId) options.id = options.GameId
  if (options.Time) options.time = options.Time * 60 * 1000

  global.sharedOptions = options
  console.log('options', options)
  return options
}

let config
export const getConfig = () => {
  if (config) {
    return config
  }
  
  config = JSON.parse(fs.readFileSync(configPath, 'utf-8'))
  return getConfig()
}
