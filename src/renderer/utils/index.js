export const config = await window.fileAPI.getConfig()

export const getLocalMedia = (fileName) => {
  const up = import.meta.env.MODE === 'development' ? '/@fs' : 'file://'
  return `${up}/${config.filePath}/${fileName}`
}
