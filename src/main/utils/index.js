import fs from 'fs'
import path from 'path'

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
  const id = 211012
  const deviceConfigNames = [
    { name: 'base', fileName: `video_${id}.json` },
    { name: 'sixAxis', fileName: `video_${id}_six_axis_cmd_2.txt` },
    { name: 'treadmill', fileName: `video_${id}_treadmill_cmd.txt` }
  ]
  const res = await Promise.all(
    deviceConfigNames.map(async ({ name, fileName }) => {
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
    })
  )
  return res
}
